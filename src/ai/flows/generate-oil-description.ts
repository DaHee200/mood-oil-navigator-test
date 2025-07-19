'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a short description of an oil's benefits based on mood quiz answers.
 *
 * - generateOilDescription - A function that triggers the oil description generation flow.
 * - GenerateOilDescriptionInput - The input type for the generateOilDescription function.
 * - GenerateOilDescriptionOutput - The return type for the generateOilDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOilDescriptionInputSchema = z.object({
  moodQuizAnswers: z
    .string()
    .describe("The user's answers to the mood quiz, as a string."),
  oilName: z.string().describe('The name of the oil to describe.'),
});
export type GenerateOilDescriptionInput = z.infer<
  typeof GenerateOilDescriptionInputSchema
>;

const GenerateOilDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A short description of the oil based on the mood quiz answers, in Korean.'),
});
export type GenerateOilDescriptionOutput = z.infer<
  typeof GenerateOilDescriptionOutputSchema
>;

export async function generateOilDescription(
  input: GenerateOilDescriptionInput
): Promise<GenerateOilDescriptionOutput> {
  return generateOilDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOilDescriptionPrompt',
  input: {schema: GenerateOilDescriptionInputSchema},
  output: {schema: GenerateOilDescriptionOutputSchema},
  prompt: `사용자의 기분 퀴즈 답변: "{{{moodQuizAnswers}}}"을(를) 바탕으로, {{oilName}} 오일의 이점에 대한 짧은 설명을 한국어로 생성해주세요. 설명은 사용자의 기분과 관련이 있도록 개인화되어야 합니다.`,
});

const generateOilDescriptionFlow = ai.defineFlow(
  {
    name: 'generateOilDescriptionFlow',
    inputSchema: GenerateOilDescriptionInputSchema,
    outputSchema: GenerateOilDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
