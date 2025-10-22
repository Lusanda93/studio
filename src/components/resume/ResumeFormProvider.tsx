"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ResumeSchema, resumeSchema } from "@/lib/types";

export function ResumeFormProvider({ children }: { children: React.ReactNode }) {
  const form = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
    mode: "onBlur",
    defaultValues: {
      personal: {
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
      },
      summary: "",
      experience: [],
      education: [],
      skills: "",
      certifications: [],
      projects: [],
      styling: {
        template: "Modern",
        font: "Inter",
        colorScheme: "#5E548E",
        includePhoto: false,
      },
      meta: {
        format: "PDF",
        save: true,
        generateCoverLetter: false,
      }
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
