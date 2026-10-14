/**
 * Persistent Storage Layer with Upstash Redis REST API & In-Memory Fallback
 * Works reliably on Vercel Edge/Serverless environments.
 */

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const isUpstashConfigured = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

let warnedAboutInMemory = false;

function logFallbackWarning() {
  if (!warnedAboutInMemory && !isUpstashConfigured) {
    console.warn(
      '[Listora] WARNING: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set. ' +
        'Using best-effort in-memory counter. NOTE: In-memory counters reset across serverless instances.'
    );
    warnedAboutInMemory = true;
  }
}

// In-Memory store for development or fallback
interface MemoryItem {
  value: number | string;
  expiresAt?: number;
}

const memoryStore = new Map<string, MemoryItem>();
const waitlistMemoryStore = new Set<string>();

/**
 * Execute an Upstash Redis REST command
 */
async function upstashCommand<T = unknown>(command: (string | number)[]): Promise<T | null> {
  if (!isUpstashConfigured) return null;

  try {
    const res = await fetch(`${UPSTASH_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`[Listora] Upstash error: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = (await res.json()) as { result: T };
    return json.result;
  } catch (err) {
    console.error('[Listora] Upstash fetch exception:', err);
    return null;
  }
}

export const Storage = {
  isPersistent: isUpstashConfigured,

  /**
   * Increment a numeric counter and set optional expiration in seconds
   */
  async incr(key: string, ttlSeconds?: number): Promise<number> {
    if (isUpstashConfigured) {
      const val = await upstashCommand<number>(['INCR', key]);
      if (val !== null) {
        if (ttlSeconds && val === 1) {
          await upstashCommand(['EXPIRE', key, ttlSeconds]);
        }
        return val;
      }
    }

    // In-memory fallback
    logFallbackWarning();
    const now = Date.now();
    const existing = memoryStore.get(key);

    let current = 0;
    if (existing && (!existing.expiresAt || existing.expiresAt > now)) {
      current = typeof existing.value === 'number' ? existing.value : 0;
    }

    const newVal = current + 1;
    memoryStore.set(key, {
      value: newVal,
      expiresAt: ttlSeconds ? now + ttlSeconds * 1000 : undefined,
    });

    return newVal;
  },

  /**
   * Get numeric value of a key
   */
  async get(key: string): Promise<number> {
    if (isUpstashConfigured) {
      const val = await upstashCommand<string | number | null>(['GET', key]);
      if (val !== null && val !== undefined) {
        return parseInt(String(val), 10) || 0;
      }
    }

    // In-memory fallback
    logFallbackWarning();
    const now = Date.now();
    const existing = memoryStore.get(key);
    if (!existing || (existing.expiresAt && existing.expiresAt <= now)) {
      return 0;
    }
    return typeof existing.value === 'number' ? existing.value : 0;
  },

  /**
   * Add email to waitlist set
   */
  async addWaitlistEmail(email: string): Promise<{ isNew: boolean }> {
    const normalized = email.trim().toLowerCase();
    const key = 'listora:waitlist:emails';

    if (isUpstashConfigured) {
      // SADD returns 1 if added, 0 if already existed
      const res = await upstashCommand<number>(['SADD', key, normalized]);
      if (res !== null) {
        return { isNew: res === 1 };
      }
    }

    // In-memory fallback
    logFallbackWarning();
    const isNew = !waitlistMemoryStore.has(normalized);
    waitlistMemoryStore.add(normalized);
    return { isNew };
  },

  /**
   * Get all waitlist count
   */
  async getWaitlistCount(): Promise<number> {
    const key = 'listora:waitlist:emails';

    if (isUpstashConfigured) {
      const count = await upstashCommand<number>(['SCARD', key]);
      if (count !== null) return count;
    }

    return waitlistMemoryStore.size;
  },

  /**
   * Get all keys matching a prefix or read stored map
   */
  async getKeysValues(prefix: string): Promise<Record<string, number>> {
    const results: Record<string, number> = {};

    if (isUpstashConfigured) {
      const keys = await upstashCommand<string[]>(['KEYS', `${prefix}*`]);
      if (keys && Array.isArray(keys)) {
        for (const k of keys) {
          const val = await upstashCommand<string | number>(['GET', k]);
          if (val !== null) {
            results[k] = parseInt(String(val), 10) || 0;
          }
        }
        return results;
      }
    }

    // In-memory fallback
    const now = Date.now();
    for (const [k, v] of memoryStore.entries()) {
      if (k.startsWith(prefix)) {
        if (!v.expiresAt || v.expiresAt > now) {
          results[k] = typeof v.value === 'number' ? v.value : 0;
        }
      }
    }
    return results;
  },
};
