
import { z } from "zod";

export const experienceSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string(),
  responsibilities: z.string().min(1, "Responsibilities are required"),
});

export const educationSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  graduationYear: z.string().min(1, "Graduation year is required"),
});

export const extrasSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});


export const resumeSchema = z.object({
  personal: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal('')),
    photo: z.string().optional(),
  }),
  summary: z.string().min(1, "Professional summary is required"),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.string().min(1, "Please list at least one skill"),
  certifications: z.array(extrasSchema),
  projects: z.array(extrasSchema),
  coverLetter: z.string().optional(),
  styling: z.object({
    template: z.enum(["Classic", "Modern", "Creative", "Minimalist"]).default("Modern"),
    font: z.enum(["Inter", "Serif", "Mono"]).default("Inter"),
    colorScheme: z.string().default("#5E548E"),
    includePhoto: z.boolean().default(false),
  }),
  meta: z.object({
    format: z.enum(["PDF", "Word"]).default("PDF"),
    save: z.boolean().default(true),
    generateCoverLetter: z.boolean().default(false),
  })
});

export type ResumeSchema = z.infer<typeof resumeSchema>;
