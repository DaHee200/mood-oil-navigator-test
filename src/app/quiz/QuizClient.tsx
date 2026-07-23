'use client';

import { useState, useEffect, type FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  HeartPulse,
  Clock,
  Loader2,
  ChevronLeft,
  Sparkles,
  ShoppingBag,
  Wind,
  Brain,
  Star,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getOilRecommendation, type RecommendationData } from './actions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { SimilarOils } from '@/components/SimilarOils';

const quizQuestions = [
  {
    id: 'state',
    question: '나의 지금 상태는?',
    icon: HeartPulse,
    optionsA: [
      { text: '짜증', tags: ['짜증'] },
      { text: '슬픔', tags: ['슬픔'] },
      { text: '피곤', tags: ['피곤함'] },
      { text: '긴장', tags: ['긴장'] },
      { text: '분노', tags: ['분노'] },
      { text: '불면', tags: ['불면'] },
      { text: '두통', tags: ['두통'] },
      { text: '상관없음', tags: [] },
    ],
    optionsB: [
      { text: '짜증 😤', tags: ['짜증'], color: 'bg-rose-100/80 text-rose-900 border-rose-200 hover:bg-rose-200' },
      { text: '슬픔 💧', tags: ['슬픔'], color: 'bg-sky-100/80 text-sky-900 border-sky-200 hover:bg-sky-200' },
      { text: '피곤 🥱', tags: ['피곤함'], color: 'bg-amber-100/80 text-amber-900 border-amber-200 hover:bg-amber-200' },
      { text: '긴장 😬', tags: ['긴장'], color: 'bg-purple-100/80 text-purple-900 border-purple-200 hover:bg-purple-200' },
      { text: '분노 😡', tags: ['분노'], color: 'bg-red-100/80 text-red-900 border-red-200 hover:bg-red-200' },
      { text: '불면 🌙', tags: ['불면'], color: 'bg-indigo-100/80 text-indigo-900 border-indigo-200 hover:bg-indigo-200' },
      { text: '두통 🤯', tags: ['두통'], color: 'bg-orange-100/80 text-orange-900 border-orange-200 hover:bg-orange-200' },
      { text: '상관없음 🌿', tags: [], color: 'bg-emerald-100/80 text-emerald-900 border-emerald-200 hover:bg-emerald-200' },
    ],
  },
  {
    id: 'scent',
    question: '선호하는 향기는?',
    icon: Wind,
    optionsA: [
      { text: '과일향', tags: ['과일향'] },
      { text: '꽃향', tags: ['꽃향'] },
      { text: '나무향', tags: ['나무향'] },
      { text: '허브향', tags: ['허브향'] },
      { text: '시원함', tags: ['시원함'] },
      { text: '상큼한 향', tags: ['상큼한 향'] },
      { text: '달달한 향', tags: ['달달한 향'] },
      { text: '상관없음', tags: [] },
    ],
    optionsB: [
      { text: '과일향 🍊', tags: ['과일향'], color: 'bg-amber-100/80 text-amber-900 border-amber-200 hover:bg-amber-200' },
      { text: '꽃향 🌸', tags: ['꽃향'], color: 'bg-pink-100/80 text-pink-900 border-pink-200 hover:bg-pink-200' },
      { text: '나무향 🌲', tags: ['나무향'], color: 'bg-emerald-100/80 text-emerald-900 border-emerald-200 hover:bg-emerald-200' },
      { text: '허브향 🌿', tags: ['허브향'], color: 'bg-green-100/80 text-green-900 border-green-200 hover:bg-green-200' },
      { text: '시원함 🌊', tags: ['시원함'], color: 'bg-cyan-100/80 text-cyan-900 border-cyan-200 hover:bg-cyan-200' },
      { text: '상큼한 향 🍋', tags: ['상큼한 향'], color: 'bg-yellow-100/80 text-yellow-900 border-yellow-200 hover:bg-yellow-200' },
      { text: '달달한 향 🍭', tags: ['달달한 향'], color: 'bg-fuchsia-100/80 text-fuchsia-900 border-fuchsia-200 hover:bg-fuchsia-200' },
      { text: '상관없음 ✨', tags: [], color: 'bg-teal-100/80 text-teal-900 border-teal-200 hover:bg-teal-200' },
    ],
  },
  {
    id: 'problem',
    question: '가장 해결하고 싶은 문제는?',
    icon: Brain,
    optionsA: [
      { text: '불면증', tags: ['불면증'] },
      { text: '두통', tags: ['두통'] },
      { text: '스트레스', tags: ['스트레스'] },
      { text: '감정진정', tags: ['감정진정'] },
      { text: '피곤함', tags: ['피곤함'] },
      { text: '우울증', tags: ['우울증'] },
      { text: '근육통', tags: ['근육통'] },
      { text: '뾰루지', tags: ['뾰루지'] },
      { text: '벌레물림', tags: ['벌레물림'] },
      { text: '식욕부진', tags: ['식욕부진'] },
      { text: '입냄새', tags: ['입냄새'] },
      { text: '입덧', tags: ['입덧'] },
    ],
    optionsB: [
      { text: '불면증 💤', tags: ['불면증'], color: 'bg-indigo-100/80 text-indigo-900 border-indigo-200 hover:bg-indigo-200' },
      { text: '두통 🤕', tags: ['두통'], color: 'bg-orange-100/80 text-orange-900 border-orange-200 hover:bg-orange-200' },
      { text: '스트레스 ⚡', tags: ['스트레스'], color: 'bg-amber-100/80 text-amber-900 border-amber-200 hover:bg-amber-200' },
      { text: '감정진정 🧘‍♀️', tags: ['감정진정'], color: 'bg-emerald-100/80 text-emerald-900 border-emerald-200 hover:bg-emerald-200' },
      { text: '피곤함 🔋', tags: ['피곤함'], color: 'bg-lime-100/80 text-lime-900 border-lime-200 hover:bg-lime-200' },
      { text: '우울증 🌧️', tags: ['우울증'], color: 'bg-sky-100/80 text-sky-900 border-sky-200 hover:bg-sky-200' },
      { text: '근육통 💪', tags: ['근육통'], color: 'bg-red-100/80 text-red-900 border-red-200 hover:bg-red-200' },
      { text: '뾰루지 ✨', tags: ['뾰루지'], color: 'bg-rose-100/80 text-rose-900 border-rose-200 hover:bg-rose-200' },
      { text: '벌레물림 🐝', tags: ['벌레물림'], color: 'bg-yellow-100/80 text-yellow-900 border-yellow-200 hover:bg-yellow-200' },
      { text: '식욕부진 🍎', tags: ['식욕부진'], color: 'bg-pink-100/80 text-pink-900 border-pink-200 hover:bg-pink-200' },
      { text: '입냄새 🍃', tags: ['입냄새'], color: 'bg-teal-100/80 text-teal-900 border-teal-200 hover:bg-teal-200' },
      { text: '입덧 🍼', tags: ['입덧'], color: 'bg-purple-100/80 text-purple-900 border-purple-200 hover:bg-purple-200' },
    ],
  },
  {
    id: 'time',
    question: '주로 사용할 시간대는?',
    icon: Clock,
    optionsA: [
      { text: '아침', tags: ['아침'] },
      { text: '낮', tags: ['낮'] },
      { text: '저녁', tags: ['저녁'] },
      { text: '밤', tags: ['밤'] },
      { text: '하루종일', tags: ['하루종일'] },
    ],
    optionsB: [
      { text: '아침 🌅', tags: ['아침'], color: 'bg-amber-100/80 text-amber-900 border-amber-200 hover:bg-amber-200' },
      { text: '낮 ☀️', tags: ['낮'], color: 'bg-yellow-100/80 text-yellow-900 border-yellow-200 hover:bg-yellow-200' },
      { text: '저녁 🌆', tags: ['저녁'], color: 'bg-orange-100/80 text-orange-900 border-orange-200 hover:bg-orange-200' },
      { text: '밤 🌙', tags: ['밤'], color: 'bg-indigo-100/80 text-indigo-900 border-indigo-200 hover:bg-indigo-200' },
      { text: '하루종일 ⏰', tags: ['하루종일'], color: 'bg-emerald-100/80 text-emerald-900 border-emerald-200 hover:bg-emerald-200' },
    ],
  },
];

const parseRecommendationText = (text: string) => {
  const sections = {
    messageForYou: '',
    reason: '',
    scentFeel: '',
    tip: '',
    ending: '향은 문제를 해결해주지는 않지만, 오늘의 당신을 조금 더 다정하게 안아줄 수 있어요.'
  };

  if (!text) return sections;

  const parts = text.split(/(💭 지금의 당신에게|✨ 이 향을 추천한 이유|🌸 향의 느낌|🌱 작은 사용 팁|향은 문제를 해결해주지는 않지만)/);

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (part === '💭 지금의 당신에게') {
      sections.messageForYou = parts[i + 1]?.trim().split(/^[🌿💭✨🌸🌱]/m)[0].trim() || '';
    } else if (part === '✨ 이 향을 추천한 이유') {
      sections.reason = parts[i + 1]?.trim().split(/^[🌿💭✨🌸🌱]/m)[0].trim() || '';
    } else if (part === '🌸 향의 느낌') {
      sections.scentFeel = parts[i + 1]?.trim().split(/^[🌿💭✨🌸🌱]/m)[0].trim() || '';
    } else if (part === '🌱 작은 사용 팁') {
      sections.tip = parts[i + 1]?.trim().split(/^[🌿💭✨🌸🌱]/m)[0].trim() || '';
    }
  }

  if (!sections.messageForYou && !sections.reason) {
    sections.messageForYou = text;
  }

  return sections;
};

const QuizClient: FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [variant, setVariant] = useState<'A' | 'B'>('A');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlVariant = urlParams.get('variant')?.toUpperCase();
    if (urlVariant === 'B') {
      setVariant('B');
    } else if (urlVariant === 'A') {
      setVariant('A');
    } else {
      const cookieMatch = document.cookie.match(/(?:^|; )ab_variant=([^;]*)/);
      if (cookieMatch && (cookieMatch[1] === 'B' || cookieMatch[1] === 'A')) {
        setVariant(cookieMatch[1] as 'A' | 'B');
      } else {
        const localVariant = localStorage.getItem('ab_variant');
        if (localVariant === 'B' || localVariant === 'A') {
          setVariant(localVariant as 'A' | 'B');
        }
      }
    }
  }, []);

  const currentQuestion = quizQuestions[step];
  const progressValue = ((step + 1) / quizQuestions.length) * 100;

  const handleAnswer = (tags: string[]) => {
    const newAnswers = [...answers];
    newAnswers[step] = tags;
    setAnswers(newAnswers);

    if (step < quizQuestions.length - 1) {
      changeStep(step + 1);
    } else {
      const finalAnswers = newAnswers.flat();
      handleSubmit(finalAnswers);
    }
  };
  
  const changeStep = (nextStep: number) => {
    setIsFading(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsFading(false);
    }, 300);
  };

  const handleBack = () => {
    if (step > 0) {
      changeStep(step - 1);
    } else {
      router.push(`/?variant=${variant}`);
    }
  };

  const handleSubmit = async (finalAnswers: string[]) => {
    setIsLoading(true);
    setIsCardFlipped(false);

    try {
      const result = await getOilRecommendation(finalAnswers);

      if (result.success && result.data) {
        setRecommendation(result.data);
      } else {
        toast({
          variant: 'destructive',
          title: '오류',
          description: result.error,
        });
      }
    } catch (error) {
      console.error('Server action error:', error);
      toast({
        variant: 'destructive',
        title: '연결 오류',
        description: '서버와 통신할 수 없습니다. 페이지를 새로고침 해보세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className={`flex min-h-screen w-full items-center justify-center p-4 ${variant === 'A' ? 'bg-gray-50' : 'bg-gradient-to-b from-secondary/20 via-background to-primary/10'}`}>
        <Card className={`w-full max-w-xl text-center shadow-lg ${variant === 'B' ? 'border-primary/20 bg-white/90 backdrop-blur-md rounded-3xl' : ''}`}>
          <CardHeader>
            <CardTitle className="font-headline text-4xl">오일 찾는 중...</CardTitle>
            <CardDescription className="text-lg">당신의 기분을 분석하여 완벽한 오일을 찾고 있습니다.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6 py-16">
            <Loader2 className="h-20 w-20 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">잠시만 기다려주세요.</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (recommendation) {
    const { oil, recommendationText } = recommendation;
    const sections = parseRecommendationText(recommendationText);

    if (variant === 'A') {
      /* VARIANT A RESULT: Untouched Original Direct Recommendation View */
      return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4 py-8 sm:py-12">
          <Card className="w-full max-w-2xl animate-fade-in text-center shadow-2xl border-primary/20 bg-gradient-to-b from-white to-secondary/10">
            <CardHeader className="border-b border-border/50 pb-6">
              <CardTitle className="font-headline text-4xl text-foreground flex items-center justify-center gap-2">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                오늘의 향기
              </CardTitle>
              <CardDescription className="text-lg">당신의 상태를 분석하여 찾은 소중한 향기입니다.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-8 p-6 md:p-8">
              
              <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                <div className="relative h-64 w-64 bg-white rounded-2xl p-4 shadow-md flex-shrink-0 border border-primary/10">
                  <Image
                    src={oil.image}
                    alt={`${oil.name} oil`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-lg p-2"
                    data-ai-hint="essential oil bottle"
                  />
                </div>
                
                <div className="text-left space-y-4 flex-grow">
                  <div>
                    <span className="text-sm font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full">🌿 추천 오일</span>
                    <h3 className="font-headline text-4xl font-extrabold text-foreground mt-2">{oil.name}</h3>
                    <p className="text-lg text-muted-foreground capitalize mt-1">({oil.id.replace('-', ' ')})</p>
                  </div>
                  <p className="text-base text-foreground/80 border-l-2 border-primary/30 pl-3 italic">
                    {oil.description}
                  </p>
                </div>
              </div>

              <div className="w-full space-y-6 text-left">
                {sections.messageForYou && (
                  <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-secondary/20 shadow-sm">
                    <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                      <span>💭</span> 지금의 당신에게
                    </h4>
                    <p className="text-base text-foreground/90 leading-relaxed font-body whitespace-pre-line">
                      {sections.messageForYou}
                    </p>
                  </div>
                )}

                {sections.reason && (
                  <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-secondary/20 shadow-sm">
                    <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                      <span>✨</span> 이 향을 추천한 이유
                    </h4>
                    <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                      {sections.reason}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sections.scentFeel && (
                    <div className="bg-accent/5 p-5 rounded-2xl border border-accent/20 shadow-sm flex flex-col justify-between">
                      <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                        <span>🌸</span> 향의 느낌
                      </h4>
                      <p className="text-base text-foreground/90 leading-relaxed flex-grow whitespace-pre-line">
                        {sections.scentFeel}
                      </p>
                    </div>
                  )}

                  {sections.tip && (
                    <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/30 shadow-sm flex flex-col justify-between">
                      <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                        <span>🌱</span> 작은 사용 팁
                      </h4>
                      <p className="text-base text-foreground/90 leading-relaxed flex-grow whitespace-pre-line">
                        {sections.tip}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full pt-4 border-t border-border/50 text-center">
                <p className="font-headline text-lg italic text-foreground/80 leading-relaxed max-w-md mx-auto">
                  "{sections.ending.replace(/^"|"$/g, '')}"
                </p>
              </div>

              <SimilarOils currentOil={oil} />
            </CardContent>
            <CardFooter className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2 border-t border-border/50 bg-secondary/5">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-base"
                onClick={() => router.push(`/oils/${encodeURIComponent(oil.id)}`)}
              >
                <Sparkles className="mr-2 h-5 w-5 text-primary" /> 상세 정보
              </Button>
              <Button asChild size="lg" className="w-full text-base font-bold">
                <a href={oil.buyLink} target="_blank" rel="noopener noreferrer">
                  <ShoppingBag className="mr-2 h-5 w-5" /> 구매하기
                </a>
              </Button>
            </CardFooter>
          </Card>
        </main>
      );
    }

    /* VARIANT B RESULT: Brand-New Clean Experiment Result with 3D Card Flip & Trust Badge */
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-secondary/20 via-background to-primary/10 p-4 py-8 sm:py-12">
        <div className="w-full max-w-2xl flex flex-col items-center perspective-1000">
          {!isCardFlipped ? (
            /* Mystery Tarot Card (Front Face before flip) */
            <Card 
              onClick={() => setIsCardFlipped(true)}
              className="w-full cursor-pointer transform hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-2xl border-primary/30 bg-gradient-to-br from-primary/10 via-white to-accent/30 text-center p-8 sm:p-12 relative overflow-hidden group rounded-3xl"
            >
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all" />
              <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-accent/30 rounded-full blur-2xl group-hover:bg-accent/40 transition-all" />

              <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/90 shadow-lg flex items-center justify-center border-2 border-primary/20 group-hover:rotate-12 transition-transform duration-500">
                  <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 text-primary animate-pulse" />
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-primary px-4 py-1.5 bg-primary/15 rounded-full border border-primary/20">
                    Aroma Therapy Result
                  </span>
                  <h3 className="font-headline text-2xl sm:text-4xl font-extrabold text-foreground leading-snug">
                    오늘 당신을 위한 오일 카드가<br />도착했습니다 🎁
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground max-w-md">
                  당신의 지친 마음과 상태를 다정하게 보듬어줄 맞춤 아로마테라피 오일이 준비되었습니다.
                </p>

                <div className="pt-4">
                  <Button size="lg" className="rounded-full px-8 py-7 text-base sm:text-lg font-bold shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-all">
                    ✨ 카드를 터치하여 나의 오일 확인하기
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            /* Full Recommendation Details (Back Face after flip) */
            <Card className="w-full animate-fade-in text-center shadow-2xl border-primary/20 bg-gradient-to-b from-white to-secondary/10 rounded-3xl overflow-hidden">
              <CardHeader className="border-b border-border/50 pb-6 bg-primary/5">
                <CardTitle className="font-headline text-3xl sm:text-4xl text-foreground flex items-center justify-center gap-2">
                  <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                  오늘의 향기
                </CardTitle>
                <CardDescription className="text-lg">당신의 상태를 분석하여 찾은 소중한 향기입니다.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-8 p-6 md:p-8">
                
                <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                  <div className="relative h-64 w-64 bg-white rounded-2xl p-4 shadow-md flex-shrink-0 border border-primary/10">
                    <Image
                      src={oil.image}
                      alt={`${oil.name} oil`}
                      fill
                      style={{ objectFit: "contain" }}
                      className="rounded-lg p-2"
                    />
                  </div>
                  
                  <div className="text-left space-y-4 flex-grow">
                    <div>
                      <span className="text-sm font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full">🌿 추천 오일</span>
                      <h3 className="font-headline text-4xl font-extrabold text-foreground mt-2">{oil.name}</h3>
                      <p className="text-lg text-muted-foreground capitalize mt-1">({oil.id.replace('-', ' ')})</p>
                    </div>
                    <p className="text-base text-foreground/80 border-l-2 border-primary/30 pl-3 italic">
                      {oil.description}
                    </p>
                  </div>
                </div>

                <div className="w-full space-y-6 text-left">
                  {sections.messageForYou && (
                    <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-secondary/20 shadow-sm">
                      <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                        <span>💭</span> 지금의 당신에게
                      </h4>
                      <p className="text-base text-foreground/90 leading-relaxed font-body whitespace-pre-line">
                        {sections.messageForYou}
                      </p>
                    </div>
                  )}

                  {sections.reason && (
                    <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-secondary/20 shadow-sm">
                      <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                        <span>✨</span> 이 향을 추천한 이유
                      </h4>
                      <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                        {sections.reason}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections.scentFeel && (
                      <div className="bg-accent/5 p-5 rounded-2xl border border-accent/20 shadow-sm flex flex-col justify-between">
                        <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                          <span>🌸</span> 향의 느낌
                        </h4>
                        <p className="text-base text-foreground/90 leading-relaxed flex-grow whitespace-pre-line">
                          {sections.scentFeel}
                        </p>
                      </div>
                    )}

                    {sections.tip && (
                      <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/30 shadow-sm flex flex-col justify-between">
                        <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                          <span>🌱</span> 작은 사용 팁
                        </h4>
                        <p className="text-base text-foreground/90 leading-relaxed flex-grow whitespace-pre-line">
                          {sections.tip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <SimilarOils currentOil={oil} />
              </CardContent>
              <CardFooter className="flex flex-col items-center justify-center gap-4 p-6 border-t border-border/50 bg-secondary/5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 w-full">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-base"
                    onClick={() => router.push(`/oils/${encodeURIComponent(oil.id)}`)}
                  >
                    <Sparkles className="mr-2 h-5 w-5 text-primary" /> 상세 정보
                  </Button>
                  <Button asChild size="lg" className="w-full text-base font-bold shadow-md">
                    <a href={oil.buyLink} target="_blank" rel="noopener noreferrer">
                      <ShoppingBag className="mr-2 h-5 w-5" /> 구매하기
                    </a>
                  </Button>
                </div>

                {/* Variant B Footer Trust Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200/80 rounded-full text-amber-900 text-sm font-semibold shadow-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                  <span>98%의 사용자가 추천받은 향기에 만족했어요</span>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    );
  }

  /* QUIZ STEP SCREEN */
  const options = variant === 'A' ? currentQuestion.optionsA : currentQuestion.optionsB;

  return (
    <main className={`flex min-h-screen w-full items-center justify-center p-4 ${variant === 'A' ? 'bg-gray-50' : 'bg-gradient-to-b from-secondary/20 via-background to-primary/10'}`}>
      <Card className={`w-full max-w-2xl shadow-xl ${variant === 'A' ? '' : 'border-primary/10 rounded-3xl bg-white/95'}`}>
        <CardHeader>
          <Progress value={progressValue} className="mb-6 h-2" />
          <CardTitle className="font-headline text-4xl">기분 퀴즈</CardTitle>
          <CardDescription className="text-lg">
            질문 {step + 1} / {quizQuestions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className={`min-h-[350px] transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          {currentQuestion && (
            <div className="flex flex-col items-center space-y-6 text-center">
              <currentQuestion.icon className="h-16 w-16 text-primary" />
              <p className="text-2xl font-medium">{currentQuestion.question}</p>
              <div className="grid w-full grid-cols-2 justify-center gap-3 pt-4 sm:grid-cols-3 md:grid-cols-4">
                {options.map((option) => (
                  <Button 
                    key={option.text}
                    onClick={() => handleAnswer(option.tags)} 
                    size="lg" 
                    variant="outline"
                    className={`w-full h-auto px-4 py-3.5 text-base font-bold transition-all duration-200 border rounded-2xl whitespace-normal ${
                      variant === 'A' 
                        ? 'text-foreground hover:bg-accent/10' 
                        : `shadow-sm hover:scale-105 hover:shadow-md ${'color' in option ? option.color : ''}`
                    }`}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-start">
          <Button variant="outline" onClick={handleBack} className="rounded-xl">
            <ChevronLeft className="mr-2 h-4 w-4" /> 뒤로
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default QuizClient;
