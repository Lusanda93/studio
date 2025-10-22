'use server';

/**
 * @fileOverview This file defines a Genkit flow to tailor a resume based on a job description.
 *
 * - tailorResumeFromJobDescription - A function that tailors a resume based on a job description.
 * - TailorResumeFromJobDescriptionInput - The input type for the tailorResumeFromJob-description function.
 * - TailorResumeFromJobDescriptionOutput - The return type for the tailorResumeFromJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { experienceSchema } from '@/lib/types';

const TailorResumeFromJobDescriptionInputSchema = z.object({
  resume: z.string().describe("The user's current resume content (summary, experience, skills)."),
  jobDescription: z.string().describe('The job description to tailor the resume to.'),
});
export type TailorResumeFromJobDescriptionInput = z.infer<
  typeof TailorResumeFromJobDescriptionInputSchema
>;

const TailoredResumeSchema = z.object({
    summary: z.string().optional().describe("The new, tailored professional summary."),
    experience: z.array(experienceSchema).optional().describe("An updated list of work experiences, tailored to the job."),
    skills: z.string().optional().describe("A comma-separated list of skills, tailored to the job."),
});

const TailorResumeFromJobDescriptionOutputSchema = z.object({
  tailoredResume: z.string().describe('The tailored resume content as a JSON string matching the structure of { summary: string, experience: Experience[], skills: string }'),
});
export type TailorResumeFromJobDescriptionOutput = z.infer<
  typeof TailorResumeFromJobDescriptionOutputSchema
>;

export async function tailorResumeFromJobDescription(
  input: TailorResumeFromJobDescriptionInput
): Promise<TailorResumeFromJobDescriptionOutput> {
  return tailorResumeFromJobDescriptionFlow(input);
}

const tailorResumeFromJobDescriptionPrompt = ai.definePrompt({
  name: 'tailorResumeFromJobDescriptionPrompt',
  input: {schema: TailorResumeFromJobDescriptionInputSchema},
  output: {schema: TailorResumeFromJobDescriptionOutputSchema},
  prompt: `You are an expert resume writer and career advisor.

    A user will provide you with their resume and a job description. You will tailor the resume to match the specific requirements and keywords of the job description.
    Focus on highlighting the skills and experiences in the resume that are most relevant to the job description. Rewrite the resume to use the same language as the job description where appropriate.

    Here is the user's resume:
    {{{resume}}}

    Here is the job description:
    {{{jobDescription}}}
    
    Your output MUST be a single JSON string. The JSON should contain one key: 'tailoredResume'. The value of this key should be another JSON string containing the tailored 'summary', 'experience', and 'skills' sections.
    For the 'experience' array, each object must have 'id', 'company', 'role', 'startDate', 'endDate', and 'responsibilities' fields. Ensure the output is valid JSON.
    Example output format:
    {
      "tailoredResume": "{\\"summary\\":\\"A new summary...\\",\\"experience\\":[{\\"id\\":\\"...",...}],\\"skills\\":\\"skill1, skill2\\"}"
    }
    `,
});

const tailorResumeFromJobDescriptionFlow = ai.defineFlow(
  {
    name: 'tailorResumeFromJobDescriptionFlow',
    inputSchema: TailorResumeFromJobDescriptionInputSchema,
    outputSchema: TailorResumeFromJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await tailorResumeFromJobDescriptionPrompt(input);
    return output!;
  }
);
