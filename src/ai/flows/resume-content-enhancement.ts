'use server';
/**
 * @fileOverview Enhances resume content with AI-driven suggestions.
 *
 * - enhanceResumeContent - Provides suggestions to improve resume content.
 * - EnhanceResumeContentInput - Input type for enhanceResumeContent.
 * - EnhanceResumeContentOutput - Output type for enhanceResumeContent.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceResumeContentInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The current content of the resume to be enhanced.'),
});
export type EnhanceResumeContentInput = z.infer<typeof EnhanceResumeContentInputSchema>;

const EnhanceResumeContentOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'A list of suggestions to improve the resume content, including rephrasing, keyword additions, and highlighting achievements.'
    ),
});
export type EnhanceResumeContentOutput = z.infer<typeof EnhanceResumeContentOutputSchema>;

export async function enhanceResumeContent(
  input: EnhanceResumeContentInput
): Promise<EnhanceResumeContentOutput> {
  return enhanceResumeContentFlow(input);
}

const enhanceResumeContentPrompt = ai.definePrompt({
  name: 'enhanceResumeContentPrompt',
  input: {schema: EnhanceResumeContentInputSchema},
  output: {schema: EnhanceResumeContentOutputSchema},
  prompt: `You are an expert resume writer. Please provide suggestions on how to improve the content of the following resume. Focus on rephrasing sentences, adding relevant keywords, and highlighting achievements to make the resume more impactful and appealing to potential employers.\n\nResume Content: {{{resumeContent}}}`,
});

const enhanceResumeContentFlow = ai.defineFlow(
  {
    name: 'enhanceResumeContentFlow',
    inputSchema: EnhanceResumeContentInputSchema,
    outputSchema: EnhanceResumeContentOutputSchema,
  },
  async input => {
    const {output} = await enhanceResumeContentPrompt(input);
    return output!;
  }
);
