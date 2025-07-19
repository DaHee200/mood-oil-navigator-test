'use client';

import { useState, type FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  HeartPulse,
  Smile,
  Users,
  Grape,
  Clock,
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
    question: '지금 기분은 어떤가요?',
    icon: HeartPulse,
    options: {
      yes: { text: '지치고 피곤함', tag: '피로' },
      no: { text: '불안하고 긴장됨', tag: '불안' },
    },
  },
  {
    id: 'feeling',
    question: '원하는 느낌은?',
    icon: Smile,
    options: {
      yes: { text: '활력', tag: '활력' },
      no: { text: '안정감', tag: '안정' },
    },
  },
  {
    id: 'personality',
    question: '평소 성향은?',
    icon: Users,
    options: {
      yes: { text: '외향적', tag: '활력' },
      no: { text: '내향적', tag: '안정' },
    },
  },
  {
    id: 'scent',
    question: '원하는 향 계열은?',
    icon: Grape,
    options: {
      yes: { text: '상큼한 과일향', tag: '과일' },
      no: { text: '부드러운 꽃향', tag: '꽃' },
    },
  },
  {
    id: 'time',
    question: '오일을 사용할 시간대는?',
    icon: Clock,
    options: {
      yes: { text: '아침', tag: '아침' },
      no: { text: '밤', tag: '밤' },
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
