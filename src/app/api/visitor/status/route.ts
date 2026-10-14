import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { UsageService, getVisitorFingerprint } from '@/lib/usage';
import { USAGE_CONFIG } from '@/lib/config';

export async function GET(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get('x-forwarded-for') || '';
    const realIp = req.headers.get('x-real-ip') || '';
    const clientIp = forwardedFor.split(',')[0].trim() || realIp || '127.0.0.1';

    let cookieId = req.cookies.get(USAGE_CONFIG.cookieName)?.value;
    let isNewCookie = false;
    if (!cookieId) {
      cookieId = crypto.randomUUID();
      isNewCookie = true;
    }
    const visitorFingerprint = getVisitorFingerprint(cookieId, clientIp);

    const [visitorUsage, globalCap] = await Promise.all([
      UsageService.getVisitorUsage(visitorFingerprint),
      UsageService.checkGlobalDailyCap(),
    ]);

    const res = NextResponse.json({
      success: true,
      visitor: {
        remaining: visitorUsage.remaining,
        current: visitorUsage.current,
        max: visitorUsage.max,
        allowed: visitorUsage.allowed,
      },
      global: {
        capReached: !globalCap.allowed,
      },
    });

    if (isNewCookie) {
      res.cookies.set({
        name: USAGE_CONFIG.cookieName,
        value: cookieId,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: USAGE_CONFIG.cookieMaxAgeSeconds,
        path: '/',
      });
    }

    return res;
  } catch (err: unknown) {
    console.error('[Listora] Status API error:', err);
    return NextResponse.json(
      {
        success: false,
        visitor: {
          remaining: USAGE_CONFIG.dailyLimitPerVisitor,
          current: 0,
          max: USAGE_CONFIG.dailyLimitPerVisitor,
          allowed: true,
        },
      },
      { status: 200 }
    );
  }
}
