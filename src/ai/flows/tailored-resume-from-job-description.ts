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
    experience: z.array(experienceSchema.omit({id: true})).optional().describe("An updated list of work experiences, tailored to the job. Do not include id."),
    skills: z.string().optional().describe("A comma-separated list of skills, tailored to the job."),
});

const TailorResumeFromJobDescriptionOutputSchema = z.object({
  tailoredResume: TailoredResumeSchema.describe('An object containing the tailored resume content: summary, experience, and skills.'),
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
    
    Your output MUST be a single JSON object. The JSON should contain one key: 'tailoredResume'. The value of this key should be an object containing the tailored 'summary', 'experience', and 'skills' sections.
    For the 'experience' array, each object must have 'company', 'role', 'startDate', 'endDate', and 'responsibilities' fields. Ensure the output is valid JSON. Do not include 'id' fields in the experience objects.
    Example output format:
    {
      "tailoredResume": {
        "summary": "A new summary...",
        "experience": [
          {
            "company": "Example Corp",
            "role": "Software Developer",
            "startDate": "Jan 2020",
            "endDate": "Present",
            "responsibilities": "- Did a thing..."
          }
        ],
        "skills": "skill1, skill2"
      }
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
