'use server';

import { recommendOil, MoodQuizInput, OilRecommendationOutput } from '@/ai/flows/recommend-oil';

interface ActionResult {
  success: boolean;
  data?: OilRecommendationOutput;
  error?: string;
}

export async function getOilRecommendation(input: MoodQuizInput): Promise<ActionResult> {
  try {
    const recommendation = await recommendOil(input);
    return { success: true, data: recommendation };
  } catch (error) {
    console.error('Error getting oil recommendation:', error);
    return { success: false, error: 'Sorry, we couldn\'t get a recommendation at this time. Please try again later.' };
  }
}
