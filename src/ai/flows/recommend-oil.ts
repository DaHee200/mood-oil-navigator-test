'use server';

/**
 * @fileOverview Recommends an oil based on the user's mood quiz answers.
 *
 * - recommendOil - A function that takes mood quiz answers and returns an oil recommendation.
 * - MoodQuizInput - The input type for the recommendOil function.
 * - OilRecommendationOutput - The return type for the recommendOil function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodQuizInputSchema = z.object({
  happiness: z.boolean().describe('Whether the user feels happy.').optional(),
  anxiety: z.boolean().describe('Whether the user feels anxious.').optional(),
  depression: z.boolean().describe('Whether the user feels depressed.').optional(),
  fatigue: z.boolean().describe('Whether the user feels energetic (true) or fatigued (false).').optional(),
  irritation: z.boolean().describe('Whether the user feels irritated.').optional(),
  stress: z.boolean().describe('Whether the user feels stressed.').optional(),
});
export type MoodQuizInput = z.infer<typeof MoodQuizInputSchema>;

const OilRecommendationOutputSchema = z.object({
  oilName: z.string().describe('The name of the recommended oil in Korean.'),
  description: z.string().describe('A brief description of the oil and its benefits in Korean.'),
  purchaseLink: z.string().describe('A link to purchase the recommended oil.'),
});
export type OilRecommendationOutput = z.infer<typeof OilRecommendationOutputSchema>;

export async function recommendOil(input: MoodQuizInput): Promise<OilRecommendationOutput> {
  return recommendOilFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendOilPrompt',
  input: {schema: MoodQuizInputSchema},
  output: {schema: OilRecommendationOutputSchema},
  prompt: `Based on the user's mood quiz answers (true means "yes", false means "no"), recommend the most suitable oil in Korean from the following set of oils.
  Your entire response (oilName, description) MUST be in Korean.

  - 라벤더 (Lavender): 진정 및 이완 효과로 유명합니다. 스트레스와 불안을 줄이는 데 도움이 될 수 있습니다.
  - 페퍼민트 (Peppermint): 활력을 주고 상쾌하게 하는 특성으로 알려져 있습니다. 피로를 줄이고 집중력을 높이는 데 도움이 될 수 있습니다.
  - 레몬 (Lemon): 기분을 좋게 하고 정화하는 특성으로 알려져 있습니다. 기분을 개선하고 짜증을 줄이는 데 도움이 될 수 있습니다.
  - 유칼립투스 (Eucalyptus): 코막힘 완화 및 면역력 강화 특성이 있습니다. 호흡기 문제에 도움이 되고 면역 체계를 강화할 수 있습니다.
  - 캐모마일 (Chamomile): 진정 및 항염증 특성으로 알려져 있습니다. 이완과 수면에 도움이 될 수 있습니다.

Consider the user's answers:

- 행복함 (happiness): {{{happiness}}}
- 불안함 (anxiety): {{{anxiety}}}
- 우울함 (depression): {{{depression}}}
- 활기참 (fatigue - true means energetic, false means fatigued): {{{fatigue}}}
- 짜증남 (irritation): {{{irritation}}}
- 스트레스 받음 (stress): {{{stress}}}

Recommend one oil based on these mood indicators. For example, if stress is true, Lavender might be a good choice. If fatigue is false, Peppermint could be recommended. Return the oil name, a brief description of its benefits, and a link to purchase it (a placeholder link is fine). The oil name and description must be in Korean.`,
});

const recommendOilFlow = ai.defineFlow(
  {
    name: 'recommendOilFlow',
    inputSchema: MoodQuizInputSchema,
    outputSchema: OilRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
