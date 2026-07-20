import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Droplet } from 'lucide-react';
import { getSimilarOils, type Oil } from '@/lib/oils';

interface SimilarOilsProps {
  currentOil: Oil;
}

export function SimilarOils({ currentOil }: SimilarOilsProps) {
  const similarOils = getSimilarOils(currentOil, 3);

  if (similarOils.length === 0) return null;

  return (
    <section className="w-full mt-8 pt-6 border-t border-border/50 text-left">
      <div className="mb-6 text-center">
        <h3 className="font-headline text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          유사한 효능의 오일 추천
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          <strong>{currentOil.name}</strong>와(과) 비슷한 효능 및 향기를 지닌 다른 오일들이에요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {similarOils.map((oil) => (
          <Card key={oil.id} className="flex flex-col justify-between hover:shadow-xl transition-all duration-300 border-primary/10 bg-white/90">
            <CardHeader className="p-4 pb-2 text-center">
              <div className="relative h-32 w-full mb-2 bg-secondary/10 rounded-xl p-2 flex items-center justify-center">
                <Image
                  src={oil.image}
                  alt={`${oil.name} oil`}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-lg p-1"
                />
              </div>
              <CardTitle className="font-headline text-xl flex items-center justify-center gap-1">
                <Droplet className="h-4 w-4 text-primary" />
                {oil.name}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground line-clamp-1">
                {oil.scent} • {oil.recommendations.slice(0, 3).join(', ')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-foreground/80 line-clamp-2">
              {oil.description}
            </CardContent>
            <div className="p-4 pt-0">
              <Button asChild variant="outline" size="sm" className="w-full text-xs font-semibold">
                <Link href={`/oils/${encodeURIComponent(oil.id)}`}>
                  상세 보기
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
