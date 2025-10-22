"use client";

import { PersonalDetailsSection } from "./form-sections/PersonalDetailsSection";
import { SummarySection } from "./form-sections/SummarySection";
import { ExperienceSection } from "./form-sections/ExperienceSection";
import { EducationSection } from "./form-sections/EducationSection";
import { SkillsSection } from "./form-sections/SkillsSection";
import { ExtrasSection } from "./form-sections/ExtrasSection";
import { StylingSection } from "./form-sections/StylingSection";
import { FinalizeSection } from "./form-sections/FinalizeSection";
import { CoverLetterSection } from "./form-sections/CoverLetterSection";
import { useFormContext } from "react-hook-form";
import { ResumeSchema } from "@/lib/types";

export function ResumeForm() {
  const { watch } = useFormContext<ResumeSchema>();
  const showCoverLetter = watch("meta.generateCoverLetter");

  return (
    <div className="space-y-6 pb-12">
      <PersonalDetailsSection />
      <SummarySection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ExtrasSection />
      <StylingSection />
      {showCoverLetter && <CoverLetterSection />}
      <FinalizeSection />
    </div>
  );
}
