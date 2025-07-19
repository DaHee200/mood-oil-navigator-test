'use client';

import { useState, useMemo, type FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  Smile,
  Annoyed,
  Battery,
  Wind,
  Zap,
  Loader2,
  ChevronLeft,
  Sparkles,
  ShoppingBag,
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
import { getOilRecommendation } from './actions';
import { useToast } from '@/hooks/use-toast';
import type { OilRecommendationOutput } from '@/ai/flows/recommend-oil';
import Image from 'next/image';

const quizQuestions = [
  {
    id: 'happiness',
    question: '지금 행복하다고 느끼시나요?',
    icon: Smile,
  },
  {
    id: 'stress',
    question: '최근 스트레스를 많이 받았나요?',
    icon: Annoyed,
  },
  {
    id: 'fatigue',
    question: '에너지가 넘친다고 느끼시나요?',
    icon: Battery,
  },
  {
    id: 'anxiety',
    question: '불안감을 느끼고 있나요?',
    icon: Wind,
  },
  {
    id: 'irritation',
    question: '최근 쉽게 짜증이 났나요?',
    icon: Zap,
  },
];

const QuizClient = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<OilRecommendationOutput | null>(null);
  const [isFading, setIsFading] = useState(false);

  const currentQuestion = quizQuestions[step];
  const progressValue = ((step + 1) / quizQuestions.length) * 100;

  const handleAnswer = (value: boolean) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);
    if (step < quizQuestions.length - 1) {
      changeStep(step + 1);
    } else {
      handleSubmit(nextAnswers);
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
    }
  };

  const handleSubmit = async (finalAnswers: { [key: string]: boolean }) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const answersString = useMemo(() => {
    return Object.entries(answers)
      .map(([key, value]) => {
        const question = quizQuestions.find(q => q.id === key);
        const label = question ? question.question : key;
        return `질문 "${label}"에 대해, 사용자는 ${value ? '예' : '아니오'}라고 답했습니다.`;
      })
      .join(' ');
  }, [answers]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">오일 찾는 중...</CardTitle>
          <CardDescription>AI가 당신의 기분을 분석하여 완벽한 오일을 찾고 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <p className="text-muted-foreground">잠시만 기다려주세요.</p>
        </CardContent>
      </Card>
    );
  }

  if (recommendation) {
    return (
      <Card className="w-full max-w-lg animate-fade-in text-center shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">추천 오일</CardTitle>
          <CardDescription>답변을 바탕으로 다음 오일을 추천합니다:</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Image
            src={`https://placehold.co/400x300/E8F5E9/333333`}
            data-ai-hint={`${recommendation.oilName} bottle`}
            alt={recommendation.oilName}
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
          <h3 className="font-headline text-4xl text-primary">{recommendation.oilName}</h3>
          <p className="text-lg text-muted-foreground">{recommendation.description}</p>
        </CardContent>
        <CardFooter className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2">
           <Button
            variant="outline"
            onClick={() =>
              router.push(
                `/oils/${encodeURIComponent(recommendation.oilName)}?answers=${encodeURIComponent(
                  answersString
                )}&purchaseLink=${encodeURIComponent(recommendation.purchaseLink)}`
              )
            }
          >
            <Sparkles className="mr-2 h-4 w-4" /> 상세 정보 보기
          </Button>
          <Button asChild>
            <a href={recommendation.purchaseLink} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="mr-2 h-4 w-4" /> 지금 구매하기
            </a>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <Progress value={progressValue} className="mb-4 h-2" />
        <CardTitle className="font-headline text-3xl">기분 퀴즈</CardTitle>
        <CardDescription>
          질문 {step + 1} / {quizQuestions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className={`min-h-[220px] transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        {currentQuestion && (
          <div className="flex flex-col items-center space-y-6 text-center">
            <currentQuestion.icon className="h-12 w-12 text-primary" />
            <p className="text-xl font-medium">{currentQuestion.question}</p>
            <div className="flex w-full justify-center gap-4 pt-4">
              <Button onClick={() => handleAnswer(true)} size="lg" className="w-32">
                예
              </Button>
              <Button onClick={() => handleAnswer(false)} size="lg" variant="outline" className="w-32">
                아니오
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-start">
        <Button variant="outline" onClick={handleBack} disabled={step === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> 뒤로
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizClient;
