'use server';

import { oilRecommendations, type Oil } from '@/lib/oils';

interface ActionResult {
  success: boolean;
  data?: Oil;
  error?: string;
}

export async function getOilRecommendation(userKeywords: string[]): Promise<ActionResult> {
  try {
    // Direct match for Peppermint
    if (userKeywords.includes('피로회복') && userKeywords.includes('집중력')) {
      const peppermint = oilRecommendations.find(o => o.id === 'peppermint');
      if (peppermint) {
        return { success: true, data: peppermint };
      }
    }

    let bestMatch: Oil | null = null;
    let maxScore = -1;

    for (const oil of oilRecommendations) {
      // Don't reconsider peppermint if it wasn't a direct match
      if (oil.id === 'peppermint') continue;

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
