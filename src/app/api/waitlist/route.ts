import { NextRequest, NextResponse } from 'next/server';
import { WaitlistRequestSchema } from '@/lib/validations';
import { Storage } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Geçersiz JSON verisi', code: 'INVALID_JSON' },
        { status: 400 }
      );
    }

    const parseResult = WaitlistRequestSchema.safeParse(body);
    if (!parseResult.success) {
      const msg = parseResult.error.issues[0]?.message || 'Geçerli bir e-posta adresi giriniz';
      return NextResponse.json({ error: msg, code: 'VALIDATION_ERROR' }, { status: 400 });
    }

    const { email } = parseResult.data;

    if (!Storage.isPersistent) {
      // Degrade gracefully with clear log as specified
      console.warn(
        `[Listora] TODO: Waitlist email "${email}" received. Persistent store (UPSTASH_REDIS_REST_URL) ` +
          'is not configured. Stored in temporary in-memory list.'
      );
    }

    const result = await Storage.addWaitlistEmail(email);

    return NextResponse.json({
      success: true,
      isNew: result.isNew,
      message: result.isNew
        ? 'Harika! Listora Pro bekleme listesine başarıyla eklendiniz. Erken erişim açıldığında ilk sizin haberiniz olacak.'
        : 'E-posta adresiniz zaten bekleme listemizde kayıtlı.',
    });
  } catch (error: unknown) {
    console.error('[Listora] Waitlist error:', error);
    return NextResponse.json(
      { error: 'Bekleme listesine eklenirken bir sorun oluştu.', code: 'WAITLIST_FAILED' },
      { status: 500 }
    );
  }
}
