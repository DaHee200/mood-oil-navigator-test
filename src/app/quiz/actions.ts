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
    if (keywords.has('피로회복') && keywords.has('집중력')) {
      const oil = findOil('peppermint');
      if (oil) return { success: true, data: oil };
    }
    if (keywords.has('명상') && keywords.has('마음안정')) {
      const oil = findOil('frankincense');
      if (oil) return { success: true, data: oil };
    }
    if (keywords.has('우울완화') && keywords.has('행복감')) {
      const oil = findOil('ylang-ylang');
      if (oil) return { success: true, data: oil };
    }
     if (keywords.has('짜증완화') && keywords.has('스트레스완화')) {
      const oil = findOil('bergamot');
      if (oil) return { success: true, data: oil };
    }
    if (keywords.has('기분전환') && keywords.has('아침추천')) {
        const oil = findOil('orange');
        if (oil) return { success: true, data: oil };
    }
    if (keywords.has('불안완화') && keywords.has('밤추천')) {
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
