import crypto from 'crypto';
import { Storage } from './storage';
import { USAGE_CONFIG } from './config';

/**
 * Returns today's UTC date as YYYY-MM-DD string for uniform daily windowing
 */
export function getTodayKey(): string {
  const d = new Date();
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generate a privacy-preserving unique hash from visitor cookie and IP
 */
export function getVisitorFingerprint(cookieId: string, ip: string): string {
  const normalizedIp = ip.split(',')[0].trim();
  return crypto
    .createHash('sha256')
    .update(`${cookieId}:${normalizedIp}`)
    .digest('hex')
    .slice(0, 16);
}

export const UsageService = {
  /**
   * Check per-IP short burst limit (max 5 requests per 60 seconds)
   */
  async checkBurstLimit(ip: string): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
    const cleanIp = ip.split(',')[0].trim() || 'unknown';
    const minuteBucket = Math.floor(Date.now() / 60000);
    const key = `listora:burst:${cleanIp}:${minuteBucket}`;

    const count = await Storage.incr(key, 70); // TTL 70s
    if (count > USAGE_CONFIG.burstLimitPerMinute) {
      return { allowed: false, retryAfterSeconds: 60 };
    }
    return { allowed: true, retryAfterSeconds: 0 };
  },

  /**
   * Check global daily ceiling across all users
   */
  async checkGlobalDailyCap(): Promise<{ allowed: boolean; current: number; max: number }> {
    const today = getTodayKey();
    const key = `listora:global:${today}`;
    const current = await Storage.get(key);

    const max = USAGE_CONFIG.globalDailyCap;
    if (current >= max) {
      return { allowed: false, current, max };
    }
    return { allowed: true, current, max };
  },

  /**
   * Check per-visitor daily generation limit (e.g. 15 per day)
   */
  async getVisitorUsage(
    visitorId: string
  ): Promise<{ allowed: boolean; remaining: number; current: number; max: number }> {
    const today = getTodayKey();
    const key = `listora:visitor:${today}:${visitorId}`;
    const current = await Storage.get(key);
    const max = USAGE_CONFIG.dailyLimitPerVisitor;

    const remaining = Math.max(0, max - current);
    const allowed = current < max;

    return { allowed, remaining, current, max };
  },

  /**
   * Atomically increment usage counters upon successful generation
   */
  async recordSuccessfulGeneration(
    visitorId: string,
    platform: string,
    tone: string,
    language: string
  ): Promise<{ visitorCurrent: number; visitorRemaining: number }> {
    const today = getTodayKey();
    const oneDaySeconds = 60 * 60 * 26; // 26 hours TTL to ensure day boundary safety

    // 1. Increment visitor counter
    const visitorKey = `listora:visitor:${today}:${visitorId}`;
    const visitorCurrent = await Storage.incr(visitorKey, oneDaySeconds);
    const max = USAGE_CONFIG.dailyLimitPerVisitor;
    const visitorRemaining = Math.max(0, max - visitorCurrent);

    // 2. Increment global daily counter
    const globalKey = `listora:global:${today}`;
    await Storage.incr(globalKey, oneDaySeconds);

    // 3. Increment lifetime counter
    await Storage.incr('listora:stats:total_generations');

    // 4. Increment anonymous metrics (no personal data)
    await Storage.incr(`listora:stats:platform:${platform}`);
    await Storage.incr(`listora:stats:tone:${tone}`);
    await Storage.incr(`listora:stats:lang:${language}`);

    return { visitorCurrent, visitorRemaining };
  },

  /**
   * Fetch aggregate anonymous statistics for admin endpoint
   */
  async getAdminStats(): Promise<{
    today: string;
    todayGenerations: number;
    globalDailyCap: number;
    totalLifetimeGenerations: number;
    platforms: Record<string, number>;
    tones: Record<string, number>;
    languages: Record<string, number>;
    waitlistCount: number;
    storageType: 'upstash_redis' | 'in_memory';
  }> {
    const today = getTodayKey();
    const todayGenerations = await Storage.get(`listora:global:${today}`);
    const totalLifetimeGenerations = await Storage.get('listora:stats:total_generations');
    const waitlistCount = await Storage.getWaitlistCount();

    const statsRaw = await Storage.getKeysValues('listora:stats:');

    const platforms: Record<string, number> = {};
    const tones: Record<string, number> = {};
    const languages: Record<string, number> = {};

    for (const [key, value] of Object.entries(statsRaw)) {
      if (key.startsWith('listora:stats:platform:')) {
        platforms[key.replace('listora:stats:platform:', '')] = value;
      } else if (key.startsWith('listora:stats:tone:')) {
        tones[key.replace('listora:stats:tone:', '')] = value;
      } else if (key.startsWith('listora:stats:lang:')) {
        languages[key.replace('listora:stats:lang:', '')] = value;
      }
    }

    return {
      today,
      todayGenerations,
      globalDailyCap: USAGE_CONFIG.globalDailyCap,
      totalLifetimeGenerations,
      platforms,
      tones,
      languages,
      waitlistCount,
      storageType: Storage.isPersistent ? 'upstash_redis' : 'in_memory',
    };
  },
};
