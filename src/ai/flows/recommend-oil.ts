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
  happiness: z.number().describe('A number representing happiness level.').optional(),
  anxiety: z.number().describe('A number representing anxiety level.').optional(),
  depression: z.number().describe('A number representing depression level.').optional(),
  fatigue: z.number().describe('A number representing fatigue level.').optional(),
  irritation: z.number().describe('A number representing irritation level.').optional(),
  stress: z.number().describe('A number representing stress level.').optional(),
});
export type MoodQuizInput = z.infer<typeof MoodQuizInputSchema>;

const OilRecommendationOutputSchema = z.object({
  oilName: z.string().describe('The name of the recommended oil.'),
  description: z.string().describe('A brief description of the oil and its benefits.'),
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
  prompt: `Based on the user's mood quiz answers, recommend the most suitable oil from the following set of oils:

  - Lavender: Known for its calming and relaxing properties. It can help reduce stress and anxiety.
  - Peppermint: Known for its energizing and refreshing properties. It can help reduce fatigue and improve focus.
  - Lemon: Known for its uplifting and cleansing properties. It can help improve mood and reduce irritation.
  - Eucalyptus: Known for its decongestant and immune-boosting properties. It can help with respiratory issues and boost the immune system.
  - Chamomile: Known for its soothing and anti-inflammatory properties. It can help with relaxation and sleep.

Consider the emotional categories of happiness, anxiety, depression, fatigue, irritation, and stress, and the corresponding selections.

Happiness: {{{happiness}}}
Anxiety: {{{anxiety}}}
Depression: {{{depression}}}
Fatigue: {{{fatigue}}}
Irritation: {{{irritation}}}
Stress: {{{stress}}}

Recommend one oil based on these mood indicators. Return the oil name, a brief description of its benefits, and a link to purchase it (a placeholder link is fine).`,
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
