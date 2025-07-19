'use server';

import { oilRecommendations, type Oil } from '@/lib/oils';

interface ActionResult {
  success: boolean;
  data?: Oil;
  error?: string;
}

export async function getOilRecommendation(answers: { [key: string]: boolean }): Promise<ActionResult> {
  try {
    const userKeywords: string[] = [];
    if (answers.happiness) userKeywords.push('happiness');
    if (answers.stress) userKeywords.push('stress');
    if (answers.fatigue) userKeywords.push('fatigue');
    else userKeywords.push('energy');
    if (answers.anxiety) userKeywords.push('anxiety');
    if (answers.irritation) userKeywords.push('irritation');

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
        // Fallback to the first oil if no match is found
        bestMatch = oilRecommendations[0];
    }
    
    return { success: true, data: bestMatch };

  } catch (error) {
    console.error('Error getting oil recommendation:', error);
    return { success: false, error: 'Sorry, we couldn\'t get a recommendation at this time. Please try again later.' };
  }
}
