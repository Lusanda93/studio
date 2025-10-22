
"use server";

import { optimizeResumeForAts } from "@/ai/flows/ats-resume-optimization";
import { enhanceResumeContent } from "@/ai/flows/resume-content-enhancement";
import { tailorResumeFromJobDescription } from "@/ai/flows/tailored-resume-from-job-description";
import { resumeSchema } from "@/lib/types";
import { z } from "zod";

export async function getAtsOptimizations(resumeText: string) {
  try {
    const result = await optimizeResumeForAts({ resumeText });
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get ATS optimizations." };
  }
}

export async function getContentEnhancements(resumeContent: string) {
  try {
    const result = await enhanceResumeContent({ resumeContent });
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get content enhancements." };
  }
}

export async function getTailoredResume(
  resume: z.infer<typeof resumeSchema>,
  jobDescription: string
) {
  try {
    // Convert only the relevant parts of the resume to a string for the AI
    const resumeString = `
      Current Summary: ${resume.summary}
      Work Experience: ${resume.experience.map(e => `${e.role} at ${e.company}`).join(', ')}
      Skills: ${resume.skills}
    `;

    const result = await tailorResumeFromJobDescription({
      resume: resumeString,
      jobDescription,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to tailor resume." };
  }
}
