import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      <Card className="relative z-10 w-full max-w-md animate-fade-in overflow-hidden text-center shadow-xl">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Leaf className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-4xl tracking-tight">
            Mood Oil Navigator
          </CardTitle>
          <CardDescription className="pt-2 text-lg">
            Discover the perfect essential oil to balance your mind and body.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p className="mb-6 text-muted-foreground">
            Answer a few simple questions about your current mood, and we'll recommend an oil tailored just for you.
          </p>
          <Button asChild size="lg" className="w-full text-base font-bold">
            <Link href="/quiz">Find Your Oil</Link>
          </Button>
        </CardContent>
      </Card>
      <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        <p>Your journey to wellness starts here.</p>
      </footer>
    </main>
  );
}
