'use client';

import { useState, type FC } from 'react';
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
import type { Oil } from '@/lib/oils';
import Image from 'next/image';

const quizQuestions = [
  {
    id: 'mood',
    question: '지금 어떤 기분을 느끼고 싶으신가요?',
    icon: Smile,
    options: {
      yes: { text: '활기참', tag: '활력' },
      no: { text: '차분함', tag: '안정' },
    },
  },
  {
    id: 'stress',
    question: '최근 스트레스를 많이 받았나요?',
    icon: Annoyed,
    options: {
      yes: { text: '예', tag: '스트레스' },
      no: { text: '아니오', tag: '평온' },
    },
  },
  {
    id: 'energy',
    question: '주로 어느 시간대에 오일을 사용하고 싶으신가요?',
    icon: Battery,
    options: {
      yes: { text: '아침/낮', tag: '에너지' },
      no: { text: '저녁/밤', tag: '휴식' },
    },
  },
  {
    id: 'anxiety',
    question: '마음의 평온이 필요한 순간이 있나요?',
    icon: Wind,
    options: {
      yes: { text: '예', tag: '불안' },
      no: { text: '아니오', tag: '집중' },
    },
  },
  {
    id: 'irritation',
    question: '최근 쉽게 짜증이 났나요?',
    icon: Zap,
    options: {
      yes: { text: '예', tag: '짜증' },
      no: { text: '아니오', tag: '행복' },
    },
  },
];

const QuizClient: FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Oil | null>(null);
  const [isFading, setIsFading] = useState(false);

  const currentQuestion = quizQuestions[step];
  const progressValue = ((step + 1) / quizQuestions.length) * 100;

  const handleAnswer = (tag: string) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: tag };
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

  const handleSubmit = async (finalAnswers: { [key: string]: string }) => {
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
    return (
      <Card className="w-full max-w-xl animate-fade-in text-center shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-4xl">추천 오일</CardTitle>
          <CardDescription className="text-lg">답변을 바탕으로 다음 오일을 추천합니다:</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <Image
            src={recommendation.image}
            alt={`${recommendation.name} oil`}
            width={400}
            height={300}
            className="rounded-lg object-cover"
            data-ai-hint="essential oil"
          />
          <h3 className="font-headline text-5xl text-primary">{recommendation.name}</h3>
          <p className="text-xl text-muted-foreground">{recommendation.description}</p>
        </CardContent>
        <CardFooter className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
           <Button
            size="lg"
            variant="outline"
            onClick={() =>
              router.push(
                `/oils/${encodeURIComponent(recommendation.id)}`
              )
            }
          >
            <Sparkles className="mr-2 h-5 w-5" /> 상세 정보 보기
          </Button>
          <Button asChild size="lg">
            <a href={recommendation.purchaseLink} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="mr-2 h-5 w-5" /> 지금 구매하기
            </a>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xl shadow-lg">
      <CardHeader>
        <Progress value={progressValue} className="mb-6 h-2" />
        <CardTitle className="font-headline text-4xl">기분 퀴즈</CardTitle>
        <CardDescription className="text-lg">
          질문 {step + 1} / {quizQuestions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className={`min-h-[250px] transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        {currentQuestion && (
          <div className="flex flex-col items-center space-y-8 text-center">
            <currentQuestion.icon className="h-16 w-16 text-primary" />
            <p className="text-2xl font-medium">{currentQuestion.question}</p>
            <div className="flex w-full justify-center gap-6 pt-6">
              <Button onClick={() => handleAnswer(currentQuestion.options.yes.tag)} size="lg" className="w-40 py-6 text-lg">
                {currentQuestion.options.yes.text}
              </Button>
              <Button onClick={() => handleAnswer(currentQuestion.options.no.tag)} size="lg" variant="outline" className="w-40 py-6 text-lg">
                {currentQuestion.options.no.text}
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
