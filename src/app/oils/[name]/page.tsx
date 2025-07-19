import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { generateOilDescription } from '@/ai/flows/generate-oil-description';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, Droplet, ShoppingBag, Sparkles } from 'lucide-react';

async function OilDescription({ oilName, moodQuizAnswers }: { oilName: string; moodQuizAnswers: string }) {
  const { description } = await generateOilDescription({ oilName, moodQuizAnswers });
  return <p className="text-lg leading-relaxed">{description}</p>;
}

export default async function OilDetailsPage({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const oilName = decodeURIComponent(params.name);
  const moodQuizAnswers = (searchParams.answers as string) || 'No mood data provided.';
  const purchaseLink = (searchParams.purchaseLink as string) || '#';

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background py-8 sm:py-12 md:py-16">
      <div className="container max-w-4xl">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/quiz">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Quiz
          </Link>
        </Button>

        <Card className="w-full overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-full">
              <Image
                src={`https://placehold.co/600x600/E8F5E9/333333`}
                data-ai-hint={`${oilName} oil nature`}
                alt={`A bottle of ${oilName} essential oil`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="font-headline text-5xl tracking-tight text-primary">
                  {oilName}
                </CardTitle>
                <CardDescription className="text-xl">Your Personalized Wellness Ally</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-grow flex-col justify-between space-y-6 p-6 pt-0">
                <div>
                  <h3 className="mb-3 flex items-center text-lg font-semibold">
                    <Sparkles className="mr-2 h-5 w-5 text-accent" />
                    Tailored For You
                  </h3>
                  <Suspense fallback={<p>Loading personalized description...</p>}>
                    <OilDescription oilName={oilName} moodQuizAnswers={moodQuizAnswers} />
                  </Suspense>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="mb-3 flex items-center text-lg font-semibold">
                    <Droplet className="mr-2 h-5 w-5 text-accent" />
                    Potential Uses
                  </h3>
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    <li>Add a few drops to a diffuser to scent your space.</li>
                    <li>Mix with a carrier oil for a relaxing massage.</li>
                    <li>Add to a warm bath to soothe muscles and mind.</li>
                    <li>Inhale directly from the bottle for a quick boost.</li>
                  </ul>
                </div>
                
                <Button asChild size="lg" className="w-full text-base font-bold">
                  <a href={purchaseLink} target="_blank" rel="noopener noreferrer">
                    <ShoppingBag className="mr-2 h-5 w-5" /> Purchase Now
                  </a>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
