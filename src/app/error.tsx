'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { generateTraceId, logHttp, runWithMDC } from '@/lib/logger';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const traceId = generateTraceId();
    runWithMDC({ traceId, path: typeof window !== 'undefined' ? window.location.pathname : '/unknown' }, () => {
      logHttp(500, `Unhandled App Router 500 Error: ${error.message}`, {
        digest: error.digest,
      }, error);
    });
  }, [error]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-xl border-destructive/20">
        <CardHeader className="space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-2xl font-bold">오류가 발생했습니다</CardTitle>
          <CardDescription className="text-muted-foreground">
            서비스 이용 중 일시적인 시스템 오류가 발생했습니다 (500 Server Error).
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {error.digest && <p className="font-mono text-xs bg-muted p-2 rounded">오류 코드: {error.digest}</p>}
        </CardContent>
        <CardFooter className="flex justify-center gap-3">
          <Button onClick={() => reset()} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> 다시 시도
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
