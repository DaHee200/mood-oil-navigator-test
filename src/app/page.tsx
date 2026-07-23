import { Suspense } from 'react';
import { HomePageClient } from '@/components/HomePageClient';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-xl text-center shadow-lg p-12">
            <p className="text-muted-foreground animate-pulse">페이지 로딩 중...</p>
          </Card>
        </main>
      }
    >
      <HomePageClient />
    </Suspense>
  );
}
