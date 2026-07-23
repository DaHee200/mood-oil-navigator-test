'use client';

import { useState, type FC } from 'react';
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
  Droplet,
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
import type { Oil } from '@/lib/oils';
import Image from 'next/image';
import { SimilarOils } from '@/components/SimilarOils';

const quizQuestions = [
  {
    id: 'state',
    question: '나의 지금 상태는?',
    icon: HeartPulse,
    options: [
      { text: '짜증', tags: ['짜증'] },
      { text: '슬픔', tags: ['슬픔'] },
      { text: '피곤', tags: ['피곤함'] },
      { text: '긴장', tags: ['긴장'] },
      { text: '분노', tags: ['분노'] },
      { text: '불면', tags: ['불면'] },
      { text: '두통', tags: ['두통'] },
      { text: '상관없음', tags: [] },
    ],
  },
  {
    id: 'scent',
    question: '선호하는 향기는?',
    icon: Wind,
    options: [
      { text: '과일향', tags: ['과일향'] },
      { text: '꽃향', tags: ['꽃향'] },
      { text: '나무향', tags: ['나무향'] },
      { text: '허브향', tags: ['허브향'] },
      { text: '시원함', tags: ['시원함'] },
      { text: '상큼한 향', tags: ['상큼한 향'] },
      { text: '달달한 향', tags: ['달달한 향'] },
      { text: '상관없음', tags: [] },
    ],
  },
  {
    id: 'problem',
    question: '가장 해결하고 싶은 문제는?',
    icon: Brain,
    options: [
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
  },
  {
    id: 'time',
    question: '주로 사용할 시간대는?',
    icon: Clock,
    options: [
      { text: '아침', tags: ['아침'] },
      { text: '낮', tags: ['낮'] },
      { text: '저녁', tags: ['저녁'] },
      { text: '밤', tags: ['밤'] },
      { text: '하루종일', tags: ['하루종일'] },
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
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [isFading, setIsFading] = useState(false);

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
      router.push('/');
    }
  };

  const handleSubmit = async (finalAnswers: string[]) => {
    setIsLoading(true);
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
        description: '서버와 통신할 수 없습니다. 터널링 링크의 보안 경고창이 원인일 수 있으니 페이지를 새로고침 해보세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-xl text-center">
        <CardHeader>
          <CardTitle className="font-headline text-4xl">오일 찾는 중...</CardTitle>
          <CardDescription className="text-lg">당신의 기분을 분석하여 완벽한 오일을 찾고 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-6 py-16">
          <Loader2 className="h-20 w-20 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">잠시만 기다려주세요.</p>
        </CardContent>
      </Card>
    );
  }

  if (recommendation) {
    const { oil, recommendationText } = recommendation;
    const sections = parseRecommendationText(recommendationText);

    return (
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
            onClick={() =>
              router.push(
                `/oils/${encodeURIComponent(oil.id)}`
              )
            }
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
    );
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg">
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
              {currentQuestion.options.map((option) => (
                <Button 
                  key={option.text}
                  onClick={() => handleAnswer(option.tags)} 
                  size="lg" 
                  variant="outline"
                  className="w-full h-auto px-4 py-3 text-base whitespace-normal"
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-start">
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> 뒤로
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizClient;
