'use server';

/**
 * @fileOverview Optimizes a resume for Applicant Tracking Systems (ATS).
 *
 * - optimizeResumeForAts - A function that optimizes the resume for ATS.
 * - AtsOptimizationInput - The input type for the optimizeResumeForAts function.
 * - AtsOptimizationOutput - The return type for the optimizeResumeForAts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AtsOptimizationInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume to be optimized.'),
});
export type AtsOptimizationInput = z.infer<typeof AtsOptimizationInputSchema>;

const AtsOptimizationOutputSchema = z.object({
  optimizedResume: z.string().describe('The resume content optimized for ATS. This can be the original resume if no changes are needed.'),
  suggestions: z.array(z.string()).describe('A list of actionable suggestions for improving the resume for ATS.'),
});
export type AtsOptimizationOutput = z.infer<typeof AtsOptimizationOutputSchema>;

export async function optimizeResumeForAts(input: AtsOptimizationInput): Promise<AtsOptimizationOutput> {
  return optimizeResumeForAtsFlow(input);
}

const atsOptimizationPrompt = ai.definePrompt({
  name: 'atsOptimizationPrompt',
  input: {schema: AtsOptimizationInputSchema},
  output: {schema: AtsOptimizationOutputSchema},
  prompt: `You are an expert resume optimization consultant. Your goal is to analyze the provided resume text for Applicant Tracking Systems (ATS) and suggest improvements.

  Analyze the following resume text and provide:
  1. An optimized version of the resume. If no changes are necessary, you can return the original text.
  2. A list of actionable suggestions for improving the resume for ATS.

  Resume Text: {{{resumeText}}}

  Your output must be in the specified JSON format.`,
});

const optimizeResumeForAtsFlow = ai.defineFlow(
  {
    name: 'optimizeResumeForAtsFlow',
    inputSchema: AtsOptimizationInputSchema,
    outputSchema: AtsOptimizationOutputSchema,
  },
  async input => {
    const {output} = await atsOptimizationPrompt(input);
    return output!;
  }
);
