import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, Droplet, ShoppingBag, Sparkles } from 'lucide-react';
import { oilRecommendations, type Oil } from '@/lib/oils';
import { notFound } from 'next/navigation';

export default async function OilDetailsPage({
  params,
}: {
  params: { name: string };
}) {
  const oilId = decodeURIComponent(params.name);
  const oil = oilRecommendations.find(o => o.id === oilId);

  if (!oil) {
    notFound();
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background py-8 sm:py-12 md:py-16">
      <div className="container max-w-4xl">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/quiz">
            <ChevronLeft className="mr-2 h-4 w-4" />
            퀴즈로 돌아가기
          </Link>
        </Button>

        <Card className="w-full overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-full">
              <Image
                src={`https://placehold.co/600x600.png`}
                data-ai-hint={`${oil.name} oil nature`}
                alt={`${oil.name} 에센셜 오일 병`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="font-headline text-5xl tracking-tight text-primary">
                  {oil.name}
                </CardTitle>
                <CardDescription className="text-xl">당신을 위한 맞춤 웰니스 솔루션</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-grow flex-col justify-between space-y-6 p-6 pt-0">
                <div>
                  <h3 className="mb-3 flex items-center text-lg font-semibold">
                    <Sparkles className="mr-2 h-5 w-5 text-accent" />
                    오일 설명
                  </h3>
                   <p className="text-lg leading-relaxed">{oil.description}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="mb-3 flex items-center text-lg font-semibold">
                    <Droplet className="mr-2 h-5 w-5 text-accent" />
                    활용법
                  </h3>
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    <li>디퓨저에 몇 방울 떨어뜨려 공간을 향기롭게 만드세요.</li>
                    <li>캐리어 오일과 섞어 편안한 마사지를 즐기세요.</li>
                    <li>따뜻한 목욕물에 넣어 근육과 마음을 진정시키세요.</li>
                    <li>병에서 직접 흡입하여 즉각적인 기분 전환을 경험하세요.</li>
                  </ul>
                </div>
                
                <Button asChild size="lg" className="w-full text-base font-bold">
                  <a href={oil.purchaseLink} target="_blank" rel="noopener noreferrer">
                    <ShoppingBag className="mr-2 h-5 w-5" /> 지금 구매하기
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
