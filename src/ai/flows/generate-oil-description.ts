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
    .describe('A short description of the oil based on the mood quiz answers.'),
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
  prompt: `Based on the user's mood quiz answers: "{{{moodQuizAnswers}}}", generate a short description of the benefits of {{oilName}}. The description should be personalized and relevant to the user's mood.`,
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
