import { Suspense } from 'react';
import { HomePageClient } from '@/components/HomePageClient';

export default function Home() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-muted-foreground animate-pulse">로딩 중...</div>
      </main>
    }>
      <HomePageClient />
    </Suspense>
  );
}
