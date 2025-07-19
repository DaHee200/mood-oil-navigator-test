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
  ChevronRight,
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
import { Slider } from '@/components/ui/slider';
import { getOilRecommendation } from './actions';
import { useToast } from '@/hooks/use-toast';
import type { OilRecommendationOutput } from '@/ai/flows/recommend-oil';
import Image from 'next/image';

const quizQuestions = [
  {
    id: 'happiness',
    question: 'How happy do you feel right now?',
    icon: Smile,
    labels: ['Not at all', 'Extremely Happy'],
  },
  {
    id: 'stress',
    question: 'How stressed have you been lately?',
    icon: Annoyed,
    labels: ['Completely Calm', 'Very Stressed'],
  },
  {
    id: 'fatigue',
    question: 'How would you rate your energy levels?',
    icon: Battery,
    labels: ['Drained', 'Full of Energy'],
    reverse: true, // We will reverse the value for the `fatigue` input
  },
  {
    id: 'anxiety',
    question: 'How much anxiety are you experiencing?',
    icon: Wind,
    labels: ['None', 'A Lot of Anxiety'],
  },
  {
    id: 'irritation',
    question: 'How easily irritated have you been?',
    icon: Zap,
    labels: ['Very Patient', 'Easily Irritated'],
  },
];

const QuizClient = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<OilRecommendationOutput | null>(null);
  const [isFading, setIsFading] = useState(false);

  const currentQuestion = quizQuestions[step];
  const progressValue = (step / quizQuestions.length) * 100;

  const handleSliderChange = (value: number[]) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value[0] }));
  };

  const changeStep = (nextStep: number) => {
    setIsFading(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsFading(false);
    }, 300);
  };

  const handleNext = () => {
    if (step < quizQuestions.length - 1) {
      changeStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      changeStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const finalAnswers = { ...answers };
    const fatigueQuestion = quizQuestions.find((q) => q.id === 'fatigue');
    if (fatigueQuestion?.reverse && finalAnswers.fatigue) {
      // Reversing the value: 1 becomes 5, 5 becomes 1.
      finalAnswers.fatigue = 6 - finalAnswers.fatigue;
    }
    
    const result = await getOilRecommendation(finalAnswers);

    if (result.success && result.data) {
      setRecommendation(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
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
        return `For "${label}", the user selected ${value} out of 5.`;
      })
      .join(' ');
  }, [answers]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Finding Your Oil...</CardTitle>
          <CardDescription>Our AI is analyzing your mood to find the perfect match.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <p className="text-muted-foreground">Please wait a moment.</p>
        </CardContent>
      </Card>
    );
  }

  if (recommendation) {
    return (
      <Card className="w-full max-w-lg animate-fade-in text-center shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Your Recommended Oil</CardTitle>
          <CardDescription>Based on your answers, we suggest:</CardDescription>
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
            <Sparkles className="mr-2 h-4 w-4" /> View Details
          </Button>
          <Button asChild>
            <a href={recommendation.purchaseLink} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="mr-2 h-4 w-4" /> Purchase Now
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
        <CardTitle className="font-headline text-3xl">Your Mood Quiz</CardTitle>
        <CardDescription>
          Question {step + 1} of {quizQuestions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className={`min-h-[220px] transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        {currentQuestion && (
          <div className="flex flex-col items-center space-y-6 text-center">
            <currentQuestion.icon className="h-12 w-12 text-primary" />
            <p className="text-xl font-medium">{currentQuestion.question}</p>
            <div className="w-full px-2">
              <Slider
                value={[answers[currentQuestion.id] || 3]}
                onValueChange={handleSliderChange}
                min={1}
                max={5}
                step={1}
              />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>{currentQuestion.labels[0]}</span>
                <span>{currentQuestion.labels[1]}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={step === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        {step < quizQuestions.length - 1 ? (
          <Button onClick={handleNext} disabled={answers[currentQuestion.id] === undefined}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={answers[currentQuestion.id] === undefined}>
            Get Recommendation
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizClient;
