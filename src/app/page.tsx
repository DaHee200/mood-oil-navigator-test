import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 text-center">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      <div className="relative z-10 flex w-full max-w-xl animate-fade-in flex-col items-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Leaf className="h-10 w-10" />
        </div>
        <h1 className="font-headline text-5xl tracking-tight">
          Find your Oils
        </h1>
        <p className="pt-2 text-xl mt-4 mb-6 text-muted-foreground">
          당신의 오늘 분위기에 맞는 오일을 추천해드려요!
        </p>
        <Button asChild size="lg" className="w-full max-w-xs py-7 text-xl font-bold">
          <Link href="/quiz">시작하기</Link>
        </Button>
      </div>
    </main>
  );
}
