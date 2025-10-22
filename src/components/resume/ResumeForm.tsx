"use client";

import { PersonalDetailsSection } from "./form-sections/PersonalDetailsSection";
import { SummarySection } from "./form-sections/SummarySection";
import { ExperienceSection } from "./form-sections/ExperienceSection";
import { EducationSection } from "./form-sections/EducationSection";
import { SkillsSection } from "./form-sections/SkillsSection";
import { ExtrasSection } from "./form-sections/ExtrasSection";
import { StylingSection } from "./form-sections/StylingSection";
import { AiToolsSection } from "./form-sections/AiToolsSection";
import { FinalizeSection } from "./form-sections/FinalizeSection";

export function ResumeForm() {
  return (
    <div className="space-y-6 pb-12">
      <PersonalDetailsSection />
      <SummarySection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ExtrasSection />
      <StylingSection />
      <AiToolsSection />
      <FinalizeSection />
    </div>
  );
}
