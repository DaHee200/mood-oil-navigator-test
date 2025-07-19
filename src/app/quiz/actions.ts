'use server';

import { oilRecommendations, type Oil } from '@/lib/oils';

interface ActionResult {
  success: boolean;
  data?: Oil;
  error?: string;
}

export async function getOilRecommendation(answers: { [key: string]: string }): Promise<ActionResult> {
  try {
    const userKeywords = Object.values(answers);

    let bestMatch: Oil | null = null;
    let maxScore = -1;

    for (const oil of oilRecommendations) {
      let currentScore = 0;
      for (const keyword of userKeywords) {
        if (oil.keywords.includes(keyword)) {
          currentScore++;
        }
      }
      if (currentScore > maxScore) {
        maxScore = currentScore;
        bestMatch = oil;
      }
    }

    if (!bestMatch) {
        // Fallback to a default oil if no match is found
        bestMatch = oilRecommendations.find(o => o.id === 'lavender') || oilRecommendations[0];
    }
    
    return { success: true, data: bestMatch };

  } catch (error) {
    console.error('Error getting oil recommendation:', error);
    return { success: false, error: '추천을 받는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.' };
  }
}
