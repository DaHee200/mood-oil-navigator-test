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
            <div className="relative h-56 md:h-full w-full p-6">
              <Image
                src={oil.image}
                alt={`${oil.name} 에센셜 오일 병`}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="font-headline tracking-tight text-primary flex items-baseline gap-2">
                  <span className="text-4xl">{oil.name}</span>
                  <span className="text-2xl font-body text-muted-foreground capitalize">({oil.id.replace('-', ' ')})</span>
                </CardTitle>
                <CardDescription className="text-xl">당신을 위한 맞춤 웰니스 솔루션</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-grow flex-col justify-between space-y-6 py-6 px-8 pt-0">
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
                  <ul className="list-disc space-y-2 pl-5 overflow-x-auto">
                    <li className="whitespace-nowrap">디퓨저에 몇 방울 떨어뜨려 공간을 향기롭게 만드세요.</li>
                    <li className="whitespace-nowrap">캐리어 오일과 섞어 편안한 마사지를 즐기세요.</li>
                    <li className="whitespace-nowrap">따뜻한 목욕물에 넣어 근육과 마음을 진정시키세요.</li>
                    <li className="whitespace-nowrap">병에서 코로 향기를 맡아 즉각적인 기분 전환을 경험하세요.</li>
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
