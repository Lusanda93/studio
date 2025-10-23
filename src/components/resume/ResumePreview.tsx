
"use client";

import { useFormContext } from "react-hook-form";
import { ResumeSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Briefcase, GraduationCap, Mail, Phone, Star, User, Award, Lightbulb, Contact } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LinkedInIcon } from "../icons/BrandIcons";

export function ResumePreview() {
  const { watch } = useFormContext<ResumeSchema>();
  const data = watch();

  const { personal, summary, experience, education, skills, projects, certifications, references, styling } = data;

  const templateStyles = {
    Modern: {
      header: "bg-primary text-primary-foreground",
      sectionTitleContainer: "pb-2 mb-3 border-b-2 border-primary",
      sectionTitle: "text-primary font-bold",
    },
    Classic: {
      header: "text-center border-b-2 pb-4",
      sectionTitleContainer: "pb-1 mb-2 border-b",
      sectionTitle: "text-lg font-bold",
    },
    Creative: {
      header: "bg-secondary text-secondary-foreground text-center rounded-t-lg",
      sectionTitleContainer: "pb-2 mb-3",
      sectionTitle: "text-secondary font-headline tracking-wider uppercase",
    },
    Minimalist: {
      header: "py-4",
      sectionTitleContainer: "pb-2 mb-3",
      sectionTitle: "font-semibold tracking-widest text-muted-foreground text-sm uppercase",
    },
    Professional: {
        header: 'border-b-4 border-primary pb-4',
        sectionTitleContainer: "pb-2 mb-3",
        sectionTitle: 'text-primary font-bold text-lg tracking-wide',
    },
  };

  const fontStyles = {
    Inter: "font-body",
    Serif: "font-serif",
    Mono: "font-mono",
    Roboto: "font-['Roboto',sans-serif]",
    Lato: "font-['Lato',sans-serif]",
    Raleway: "font-['Raleway',sans-serif]",
  };

  const selectedStyle = templateStyles[styling?.template] || templateStyles.Modern;
  const selectedFont = fontStyles[styling?.font] || fontStyles.Inter;
  
  const profilePhotoPlaceholder = PlaceHolderImages.find(p => p.id === 'user-profile-placeholder');

  const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="mb-6">
      <div className={cn("flex items-center gap-2", selectedStyle.sectionTitleContainer)} style={{ borderColor: (styling.template !== 'Modern' && styling.template !== 'Creative') ? styling.colorScheme : undefined}}>
        <h3 className={cn("text-xl", selectedStyle.sectionTitle)} style={{ color: (styling.template !== 'Modern' && styling.template !== 'Creative') ? styling.colorScheme : undefined}}>
          {icon}
          {title}
        </h3>
      </div>
      <div className="text-sm text-foreground/80">{children}</div>
    </div>
  );

  return (
    <ScrollArea className="h-full">
      <div className={cn("p-8 bg-card text-foreground", selectedFont)} style={{'--primary-color': styling?.colorScheme || '#5E548E'} as React.CSSProperties}>
        <header className={cn("p-6 -mx-8 -mt-8 mb-8 flex justify-between items-center", selectedStyle.header)} style={{ backgroundColor: (styling.template === 'Modern' || styling.template === 'Creative') ? styling.colorScheme : undefined, borderColor: (styling.template === 'Professional' || styling.template === 'Classic') ? styling.colorScheme : undefined}}>
           <div className="flex-1">
             <h1 className="text-4xl font-bold font-headline">{personal?.fullName || "Your Name"}</h1>
             <div className="flex items-center gap-4 mt-2 text-sm flex-wrap">
                {personal?.email && <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {personal.email}</span>}
                {personal?.phone && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {personal.phone}</span>}
                {personal?.linkedin && <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><LinkedInIcon/> LinkedIn</a>}
             </div>
           </div>
           {styling?.includePhoto && (
             <Avatar className="h-24 w-24">
                <AvatarImage src={personal.photo || profilePhotoPlaceholder?.imageUrl} alt="Profile Photo" />
                <AvatarFallback>{personal?.fullName?.charAt(0) || 'U'}</AvatarFallback>
             </Avatar>
           )}
        </header>
        
        <main>
          {summary && (
            <Section title="Professional Summary" icon={<User className="w-5 h-5" />}>
              <p className="whitespace-pre-wrap">{summary}</p>
            </Section>
          )}

          {experience && experience.length > 0 && (
            <Section title="Work Experience" icon={<Briefcase className="w-5 h-5" />}>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold">{exp.role || "Role"}</h4>
                    <p className="text-xs text-muted-foreground">{exp.startDate || "Start Date"} - {exp.endDate || "Present"}</p>
                  </div>
                  <p className="text-sm italic">{exp.company || "Company Name"}</p>
                  <p className="mt-1 whitespace-pre-wrap text-foreground/70">{exp.responsibilities || "Responsibilities"}</p>
                </div>
              ))}
            </Section>
          )}

          {education && education.length > 0 && (
            <Section title="Education" icon={<GraduationCap className="w-5 h-5" />}>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2 flex justify-between">
                  <div>
                    <h4 className="font-bold">{edu.degree || "Degree"}</h4>
                    <p className="text-sm italic">{edu.institution || "Institution"}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{edu.graduationYear || "Year"}</p>
                </div>
              ))}
            </Section>
          )}

          {skills && (
            <Section title="Skills" icon={<Star className="w-5 h-5" />}>
              <p className="whitespace-pre-wrap">{skills}</p>
            </Section>
          )}

          {projects && projects.length > 0 && (
             <Section title="Projects" icon={<Lightbulb className="w-5 h-5" />}>
              {projects.map((item) => (
                <div key={item.id} className="mb-2">
                  <h4 className="font-bold">{item.title || "Project Title"}</h4>
                  <p className="text-sm whitespace-pre-wrap text-foreground/70">{item.description || "Project description."}</p>
                </div>
              ))}
            </Section>
          )}

          {certifications && certifications.length > 0 && (
            <Section title="Certifications & Awards" icon={<Award className="w-5 h-5" />}>
              {certifications.map((item) => (
                <div key={item.id} className="mb-2">
                   <h4 className="font-bold">{item.title || "Certification Title"}</h4>
                   <p className="text-sm whitespace-pre-wrap text-foreground/70">{item.description || "Certification description."}</p>
                </div>
              ))}
            </Section>
          )}

          {references && references.length > 0 && (
            <Section title="References" icon={<Contact className="w-5 h-5" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {references.map((ref) => (
                  <div key={ref.id} className="mb-2">
                    <h4 className="font-bold">{ref.name || "Reference Name"}</h4>
                    <p className="text-sm italic">{ref.relationship || "Relationship"}</p>
                    <p className="text-sm text-foreground/70">{ref.contact || "Contact Info"}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </main>
      </div>
    </ScrollArea>
  );
}
