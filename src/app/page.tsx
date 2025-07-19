import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      <Card className="relative z-10 w-full max-w-xl animate-fade-in overflow-hidden text-center shadow-xl">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Leaf className="h-10 w-10" />
          </div>
          <CardTitle className="font-headline text-5xl tracking-tight">
            Find your Oils
          </CardTitle>
          <CardDescription className="pt-2 text-xl mt-4 mb-6">
            당신의 오늘 분위기에 맞는 오일을 추천해드려요!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Button asChild size="lg" className="w-full py-7 text-xl font-bold">
            <Link href="/quiz">시작하기</Link>
          </Button>
        </CardContent>
      </Card>
      
    </main>
  );
}
