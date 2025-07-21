'use server';

import { oilRecommendations, type Oil } from '@/lib/oils';

interface ActionResult {
  success: boolean;
  data?: Oil;
  error?: string;
}

const findOil = (id: string) => oilRecommendations.find(o => o.id === id);

export async function getOilRecommendation(userKeywords: string[]): Promise<ActionResult> {
  try {
    const keywords = new Set(userKeywords);

    if (keywords.has('두통완화') && keywords.has('허브향') && keywords.has('아침추천')) {
      const oil = findOil('peppermint');
      if (oil) return { success: true, data: oil };
    }
    if (keywords.has('스트레스완화') && keywords.has('나무향') && keywords.has('저녁추천')) {
      const oil = findOil('frankincense');
      if (oil) return { success: true, data: oil };
    }
    if (keywords.has('긴장완화') && keywords.has('꽃향') && keywords.has('저녁추천')) {
      const oil = findOil('ylang-ylang');
      if (oil) return { success: true, data: oil };
    }
    if (keywords.has('감정진정') && keywords.has('시트러스향') && keywords.has('낮추천')) {
      const oil = findOil('bergamot');
      if (oil) return { success: true, data: oil };
    }
    if (keywords.has('기분변화') && keywords.has('시트러스향') && keywords.has('하루종일')) {
        const oil = findOil('orange');
        if (oil) return { success: true, data: oil };
    }
    if (keywords.has('불면완화') && keywords.has('꽃향') && keywords.has('밤추천')) {
        const oil = findOil('lavender');
        if (oil) return { success: true, data: oil };
    }

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
        bestMatch = findOil('lavender') || oilRecommendations[0];
    }
    
    return { success: true, data: bestMatch };

  } catch (error) {
    console.error('Error getting oil recommendation:', error);
    return { success: false, error: '추천을 받는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.' };
  }
}
