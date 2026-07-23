'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Leaf, Sparkles, Star } from 'lucide-react';

export function HomePageClient() {
  const [variant, setVariant] = useState<'A' | 'B' | null>(null);

  useEffect(() => {
    // 1. Check URL query param (?variant=A or ?variant=B)
    const urlParams = new URLSearchParams(window.location.search);
    const urlVariant = urlParams.get('variant')?.toUpperCase();

    let assignedVariant: 'A' | 'B' = 'A';

    if (urlVariant === 'A' || urlVariant === 'B') {
      assignedVariant = urlVariant;
    } else {
      // 2. Check Cookie
      const cookieMatch = document.cookie.match(/(?:^|; )ab_variant=([^;]*)/);
      const cookieVariant = cookieMatch ? cookieMatch[1] : null;

      if (cookieVariant === 'A' || cookieVariant === 'B') {
        assignedVariant = cookieVariant;
      } else {
        // 3. Check LocalStorage
        const localVariant = localStorage.getItem('ab_variant');
        if (localVariant === 'A' || localVariant === 'B') {
          assignedVariant = localVariant;
        } else {
          // 4. Random 50:50 Assignment
          assignedVariant = Math.random() < 0.5 ? 'A' : 'B';
        }
      }
    }

    // Persist assigned variant
    saveVariant(assignedVariant);
    setVariant(assignedVariant);
  }, []);

  const saveVariant = (v: 'A' | 'B') => {
    document.cookie = `ab_variant=${v}; path=/; max-age=2592000; SameSite=Lax`;
    localStorage.setItem('ab_variant', v);
  };

  const switchVariant = (newVariant: 'A' | 'B') => {
    saveVariant(newVariant);
    setVariant(newVariant);
  };

  if (!variant) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-xl text-center shadow-lg p-12">
          <p className="text-muted-foreground animate-pulse">페이지 로딩 중...</p>
        </Card>
      </main>
    );
  }

  return (
    <>
      {variant === 'A' ? (
        /* Variant A: Untouched Exact Original Landing Page 🌿 */
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4 relative">
          <Card className="w-full max-w-xl animate-fade-in text-center shadow-lg">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Leaf className="h-10 w-10" />
              </div>
              <CardTitle className="font-headline text-5xl tracking-tight">
                Find your Oils
              </CardTitle>
              <CardDescription className="pt-2 text-xl my-12 text-muted-foreground">
                당신의 오늘 분위기에 맞는 오일을 추천해드려요!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" className="w-full max-w-xs py-7 text-xl font-bold">
                <Link href="/quiz?variant=A">시작하기</Link>
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
              <p className="text-sm font-medium text-red-500">
                * 5개월 미만의 임산부에게는 아로마 오일 사용을 매우 권장하지 않습니다.
              </p>
            </CardFooter>
          </Card>
        </main>
      ) : (
        /* Variant B: Brand-New Clean Experiment Landing Page ✨ */
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-secondary/20 via-background to-primary/10 p-4 relative">
          <Card className="w-full max-w-xl animate-fade-in text-center shadow-2xl border-primary/20 bg-white/95 backdrop-blur-md rounded-3xl p-2 sm:p-6">
            <CardHeader className="space-y-6 pt-6 pb-2">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-sm">
                <Sparkles className="h-8 w-8" />
              </div>
              
              <div className="space-y-3">
                <h1 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  30초 만에 찾는<br />
                  <span className="text-primary font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-rose-400 to-pink-500">
                    오늘 내 마음을 위한 오일
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground font-body">
                  당신의 오늘 기분과 고민에 맞는 맞춤 아로마테라피 솔루션
                </p>
              </div>
            </CardHeader>
            
            <CardContent className="py-8">
              <Button asChild size="lg" className="w-full max-w-sm py-7 text-lg sm:text-xl font-bold shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl bg-gradient-to-r from-primary via-rose-400 to-primary text-primary-foreground">
                <Link href="/quiz?variant=B">나만의 맞춤 향기 찾아보기 ✨</Link>
              </Button>
            </CardContent>

            <CardFooter className="flex justify-center pb-6 pt-2">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-50/90 border border-amber-200/80 rounded-full text-amber-900 text-sm font-semibold shadow-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                <span>98%의 사용자가 추천받은 향기에 만족했어요</span>
              </div>
            </CardFooter>
          </Card>
        </main>
      )}

      {/* Floating A/B Test Variant Selector Badge */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-slate-900/90 text-white px-3.5 py-2.5 rounded-full shadow-2xl text-xs font-sans border border-slate-700 backdrop-blur-md">
        <span className="font-bold text-amber-400 flex items-center gap-1">⚡ A/B Test:</span>
        <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-emerald-300 font-extrabold">
          {variant === 'A' ? 'A안 (기존 원본)' : 'B안 (신규 실험)'}
        </span>
        <button
          onClick={() => switchVariant(variant === 'A' ? 'B' : 'A')}
          className="ml-1 bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold hover:bg-primary/90 transition-all text-xs active:scale-95 shadow-sm"
        >
          {variant === 'A' ? 'B안으로 보기 ➔' : 'A안으로 보기 ➔'}
        </button>
      </div>
    </>
  );
}
