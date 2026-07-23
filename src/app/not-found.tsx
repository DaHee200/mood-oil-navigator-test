import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileQuestion, Home } from 'lucide-react';
import { generateTraceId, logHttp, runWithMDC } from '@/lib/logger';

export default function NotFound() {
  const traceId = generateTraceId();

  runWithMDC({ traceId, path: '/not-found' }, () => {
    logHttp(404, '404 Not Found page rendered for invalid URL path');
  });

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader className="space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
            <FileQuestion className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl font-bold">404 Not Found</CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            찾으시는 페이지가 존재하지 않거나 이동되었습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          입력하신 주소가 올바른지 다시 한번 확인해 주세요.
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild size="lg" className="w-full">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" /> 메인으로 돌아가기
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
