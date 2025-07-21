'use client';

import { useState, type FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  HeartPulse,
  Smile,
  Leaf,
  Clock,
  Loader2,
  ChevronLeft,
  Sparkles,
  ShoppingBag,
  Wind,
  Brain,
  Bed,
  CloudDrizzle,
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
    id: 'state',
    question: '지금 당신의 상태는 어떤가요?',
    icon: HeartPulse,
    options: [
      { text: '짜증나요', tags: ['mood change'] },
      { text: '슬퍼요', tags: ['emotional calming'] },
      { text: '피곤해요', tags: ['mood change'] },
      { text: '긴장돼요', tags: ['tension relief'] },
      { text: '화나요', tags: ['stress relief'] },
      { text: '잠이 안와요', tags: ['insomnia relief'] },
      { text: '머리가 아파요', tags: ['headache relief'] },
      { text: '딱히 없어요', tags: ['mood change'] },
    ],
  },
  {
    id: 'scent',
    question: '선호하는 향은 무엇인가요?',
    icon: Wind,
    options: [
      { text: '과일향', tags: ['citrus'] },
      { text: '꽃향', tags: ['floral'] },
      { text: '나무향', tags: ['woody'] },
      { text: '풀향', tags: ['herbal'] },
    ],
  },
  {
    id: 'problem',
    question: '가장 해결하고 싶은 문제는 무엇인가요?',
    icon: Brain,
    options: [
      { text: '불면증', tags: ['insomnia relief', 'night'] },
      { text: '두통', tags: ['headache relief', 'morning'] },
      { text: '스트레스', tags: ['stress relief', 'evening'] },
      { text: '감정 기복', tags: ['emotional calming', 'day'] },
      { text: '피로', tags: ['mood change', 'all day'] },
      { text: '우울감', tags: ['emotional calming', 'day'] },
      { text: '근육통', tags: ['tension relief', 'evening'] },
    ],
  },
  {
    id: 'time',
    question: '주로 언제 사용하고 싶으신가요?',
    icon: Clock,
    options: [
      { text: '아침', tags: ['morning'] },
      { text: '낮', tags: ['day'] },
      { text: '저녁', tags: ['evening'] },
      { text: '밤', tags: ['night'] },
      { text: '하루 종일', tags: ['all day'] },
    ],
  },
];

const QuizClient: FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Oil | null>(null);
  const [isFading, setIsFading] = useState(false);

  const currentQuestion = quizQuestions[step];
  const progressValue = ((step + 1) / quizQuestions.length) * 100;

  const handleAnswer = (tags: string[]) => {
    const nextAnswers = [...answers, ...tags];
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
      // A more robust implementation might remove the previous answer's tags.
      // For simplicity, we just go back.
      changeStep(step - 1);
    }
  };

  const handleSubmit = async (finalAnswers: string[]) => {
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
      <Card className="w-full max-w-md animate-fade-in text-center shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">추천 오일</CardTitle>
          <CardDescription className="text-base">답변을 바탕으로 다음 오일을 추천합니다:</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 px-4">
          <div className="relative h-48 w-48">
            <Image
              src={recommendation.image}
              alt={`${recommendation.name} oil`}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-lg"
              data-ai-hint="essential oil bottle"
            />
          </div>
          <div>
            <h3 className="font-headline text-3xl font-bold text-primary">{recommendation.name}</h3>
            <p className="text-lg text-muted-foreground capitalize">({recommendation.id.replace('-', ' ')})</p>
          </div>
          <p className="text-base text-muted-foreground">{recommendation.description}</p>
        </CardContent>
        <CardFooter className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2">
           <Button
            size="lg"
            variant="outline"
            onClick={() =>
              router.push(
                `/oils/${encodeURIComponent(recommendation.id)}`
              )
            }
          >
            <Sparkles className="mr-2 h-4 w-4" /> 상세 정보
          </Button>
          <Button asChild size="lg">
            <a href={recommendation.buyLink} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="mr-2 h-4 w-4" /> 구매하기
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
            <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-center gap-3 pt-4">
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
        <Button variant="outline" onClick={handleBack} disabled={step === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> 뒤로
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizClient;