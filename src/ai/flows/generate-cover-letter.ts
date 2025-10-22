'use server';
/**
 * @fileOverview Generates a cover letter based on resume and job description.
 *
 * - generateCoverLetter - A function that generates the cover letter.
 * - GenerateCoverLetterInput - The input type for the function.
 * - GenerateCoverLetterOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  resume: z.string().describe('The JSON stringified resume of the user.'),
  jobDescription: z.string().describe('The job description for the position the user is applying for.'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter text.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const coverLetterPrompt = ai.definePrompt({
  name: 'coverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are an expert career coach. Your task is to write a compelling and professional cover letter for a user based on their resume and the job description they are applying for.

  The cover letter should be tailored to the specific job, highlighting the most relevant skills and experiences from the user's resume. It should have a professional tone and be formatted correctly.

  User's Resume:
  {{{resume}}}

  Job Description:
  {{{jobDescription}}}
  
  Generate only the cover letter text as a string for the 'coverLetter' field in the output JSON.`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await coverLetterPrompt(input);
    return output!;
  }
);
