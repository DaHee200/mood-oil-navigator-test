import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateTraceId, logHttp, runWithMDC } from '@/lib/logger';

export function middleware(request: NextRequest) {
  const incomingTraceId = request.headers.get('x-trace-id');
  const traceId = incomingTraceId || generateTraceId();
  const path = request.nextUrl.pathname;
  const method = request.method;

  const response = NextResponse.next();
  response.headers.set('x-trace-id', traceId);

  // Exclude static assets from noisy request logging
  if (!path.startsWith('/_next') && !path.startsWith('/favicon.ico') && !path.match(/\.(png|jpg|jpeg|svg|css|js)$/)) {
    runWithMDC({ traceId, path, method }, () => {
      logHttp(200, `HTTP Request: ${method} ${path}`, {
        userAgent: request.headers.get('user-agent') || 'unknown',
      });
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
