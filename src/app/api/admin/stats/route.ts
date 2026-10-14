import { NextRequest, NextResponse } from 'next/server';
import { UsageService } from '@/lib/usage';

export async function GET(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    return NextResponse.json(
      { error: 'ADMIN_SECRET is not configured on the server' },
      { status: 500 }
    );
  }

  // Check Authorization header or query param
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : req.headers.get('x-admin-secret') || req.nextUrl.searchParams.get('secret');

  if (!token || token !== adminSecret) {
    return NextResponse.json(
      { error: 'Yetkisiz erişim (Unauthorized)' },
      { status: 401 }
    );
  }

  try {
    const stats = await UsageService.getAdminStats();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (err: unknown) {
    console.error('[Listora] Admin stats error:', err);
    return NextResponse.json(
      { error: 'İstatistikler alınırken hata oluştu' },
      { status: 500 }
    );
  }
}
