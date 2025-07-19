import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-xl animate-fade-in text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Leaf className="h-10 w-10" />
          </div>
          <CardTitle className="font-headline text-5xl tracking-tight">
            Find your Oils
          </CardTitle>
          <CardDescription className="pt-2 text-xl my-10 text-muted-foreground">
            당신의 오늘 분위기에 맞는 오일을 추천해드려요!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="lg" className="w-full max-w-xs py-7 text-xl font-bold">
            <Link href="/quiz">시작하기</Link>
          </Button>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </main>
  );
}
