import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { GenerateRequestSchema } from '@/lib/validations';
import { generateProductContent } from '@/lib/gemini';
import { UsageService, getVisitorFingerprint } from '@/lib/usage';
import { USAGE_CONFIG } from '@/lib/config';

export async function POST(req: NextRequest) {
  try {
    // 1. Bot & Abuse Protection: Reject oversized payloads
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > USAGE_CONFIG.maxPayloadSizeBytes) {
      return NextResponse.json(
        { error: 'İstek boyutu çok büyük (Maksimum 32KB)', code: 'PAYLOAD_TOO_LARGE' },
        { status: 413 }
      );
    }

    // 2. Client IP & Burst Rate Limiting
    const forwardedFor = req.headers.get('x-forwarded-for') || '';
    const realIp = req.headers.get('x-real-ip') || '';
    const clientIp = forwardedFor.split(',')[0].trim() || realIp || '127.0.0.1';

    const burstCheck = await UsageService.checkBurstLimit(clientIp);
    if (!burstCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.',
          code: 'BURST_RATE_LIMITED',
          retryAfter: burstCheck.retryAfterSeconds,
        },
        { status: 429 }
      );
    }

    // 3. Cookie & Visitor Identification
    let cookieId = req.cookies.get(USAGE_CONFIG.cookieName)?.value;
    let isNewCookie = false;
    if (!cookieId) {
      cookieId = crypto.randomUUID();
      isNewCookie = true;
    }
    const visitorFingerprint = getVisitorFingerprint(cookieId, clientIp);

    // 4. Global Daily Cap Protection (Stops API calls if daily ceiling reached)
    const globalCap = await UsageService.checkGlobalDailyCap();
    if (!globalCap.allowed) {
      return NextResponse.json(
        {
          error: 'Bugünlük kapasite doldu, yarın tekrar dene.',
          code: 'GLOBAL_CAP_REACHED',
        },
        { status: 429 }
      );
    }

    // 5. Per-Visitor Daily Free Limit Protection
    const visitorUsage = await UsageService.getVisitorUsage(visitorFingerprint);
    if (!visitorUsage.allowed) {
      return NextResponse.json(
        {
          error: 'Bugünlük ücretsiz kullanım sınırınıza ulaştınız.',
          code: 'VISITOR_LIMIT_REACHED',
          limit: visitorUsage.max,
          current: visitorUsage.current,
        },
        { status: 429 }
      );
    }

    // 6. Request Body Parsing & Zod Validation
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Geçersiz JSON verisi', code: 'INVALID_JSON' },
        { status: 400 }
      );
    }

    const parseResult = GenerateRequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const firstIssue = parseResult.error.issues[0]?.message || 'Geçersiz form verisi';
      return NextResponse.json(
        { error: firstIssue, details: parseResult.error.issues, code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    const inputData = parseResult.data;

    // 7. Call Gemini AI Engine
    const generated = await generateProductContent(inputData);

    // 8. Record Usage & Anonymous Metrics
    const { visitorRemaining, visitorCurrent } = await UsageService.recordSuccessfulGeneration(
      visitorFingerprint,
      inputData.platform,
      inputData.tone,
      inputData.language
    );

    // 9. Prepare Response with Cookie Header
    const response = NextResponse.json({
      success: true,
      data: generated,
      usage: {
        remaining: visitorRemaining,
        current: visitorCurrent,
        max: USAGE_CONFIG.dailyLimitPerVisitor,
      },
    });

    if (isNewCookie) {
      response.cookies.set({
        name: USAGE_CONFIG.cookieName,
        value: cookieId,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: USAGE_CONFIG.cookieMaxAgeSeconds,
        path: '/',
      });
    }

    return response;
  } catch (error: unknown) {
    console.error('[Listora] Generate API error:', error);
    const message = error instanceof Error ? error.message : 'Bir hata oluştu';
    return NextResponse.json(
      { error: `İçerik üretilirken hata oluştu: ${message}`, code: 'GENERATION_FAILED' },
      { status: 500 }
    );
  }
}
