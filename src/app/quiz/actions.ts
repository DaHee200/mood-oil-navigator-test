'use server';

import { oilRecommendations, type Oil } from '@/lib/oils';

interface ActionResult {
  success: boolean;
  data?: Oil;
  error?: string;
}

// Helper function to find an oil by its ID
const findOil = (id: string) => oilRecommendations.find(o => o.id === id);

export async function getOilRecommendation(userKeywords: string[]): Promise<ActionResult> {
  try {
    const keywords = new Set(userKeywords);

    // Direct matching rules for each oil
    if (keywords.has('headache relief') && keywords.has('herbal') && keywords.has('morning')) {
      const oil = findOil('peppermint');
      if (oil) return { success: true, data: oil };
    }
    if (keywords.has('stress relief') && keywords.has('woody') && keywords.has('evening')) {
      const oil = findOil('frankincense');
      if (oil) return { success: true, data: oil };
    }
    if (keywords.has('tension relief') && keywords.has('floral') && keywords.has('evening')) {
      const oil = findOil('ylang-ylang');
      if (oil) return { success: true, data: oil };
    }
     if (keywords.has('emotional calming') && keywords.has('citrus') && keywords.has('day')) {
      const oil = findOil('bergamot');
      if (oil) return { success: true, data: oil };
    }
    if (keywords.has('mood change') && keywords.has('citrus') && keywords.has('all day')) {
        const oil = findOil('orange');
        if (oil) return { success: true, data: oil };
    }
    if (keywords.has('insomnia relief') && keywords.has('floral') && keywords.has('night')) {
        const oil = findOil('lavender');
        if (oil) return { success: true, data: oil };
    }

    // Fallback to score-based matching if no direct match is found
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
        // Fallback to a default oil if no match is found at all
        bestMatch = findOil('lavender') || oilRecommendations[0];
    }
    
    return { success: true, data: bestMatch };

  } catch (error) {
    console.error('Error getting oil recommendation:', error);
    return { success: false, error: '추천을 받는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.' };
  }
}
