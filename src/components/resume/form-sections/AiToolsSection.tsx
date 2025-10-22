"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ResumeSchema } from "@/lib/types";
import { useState, useTransition } from "react";
import {
  getContentEnhancements,
  getAtsOptimizations,
  getTailoredResume,
} from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AiToolsSection() {
  const { getValues, setValue } = useFormContext<ResumeSchema>();
  const [isPending, startTransition] = useTransition();
  const [jobDescription, setJobDescription] = useState("");
  const { toast } = useToast();

  const [atsResult, setAtsResult] = useState<{
    optimizedResume: string;
    suggestions: string[];
  } | null>(null);
  const [enhancementResult, setEnhancementResult] = useState<string | null>(
    null
  );

  const handleEnhanceContent = () => {
    startTransition(async () => {
      setEnhancementResult(null);
      const summary = getValues("summary");
      if (!summary) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill out your professional summary first.",
        });
        return;
      }
      const result = await getContentEnhancements(summary);
      if (result.success && result.data) {
        setEnhancementResult(result.data.suggestions);
      } else {
        toast({
          variant: "destructive",
          title: "AI Error",
          description: result.error,
        });
      }
    });
  };

  const handleApplyEnhancement = () => {
    if (enhancementResult) {
      setValue("summary", enhancementResult, { shouldValidate: true });
      toast({ title: "Success", description: "Summary updated with AI suggestions." });
      setEnhancementResult(null);
    }
  };

  const handleOptimizeAts = () => {
    startTransition(async () => {
      setAtsResult(null);
      const resumeText = JSON.stringify(getValues());
      const result = await getAtsOptimizations(resumeText);
      if (result.success && result.data) {
        setAtsResult(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "AI Error",
          description: result.error,
        });
      }
    });
  };
  
  const handleTailorResume = () => {
    startTransition(async () => {
        if(!jobDescription) {
            toast({ variant: "destructive", title: "Error", description: "Please paste a job description." });
            return;
        }
        const currentResume = getValues();
        const result = await getTailoredResume(currentResume, jobDescription);
        if (result.success && result.data?.tailoredResume) {
          try {
            const tailoredData = JSON.parse(result.data.tailoredResume);
            if (tailoredData.summary) {
              setValue("summary", tailoredData.summary, { shouldValidate: true });
            }
             if (tailoredData.skills) {
              setValue("skills", tailoredData.skills, { shouldValidate: true });
            }
            if (Array.isArray(tailoredData.experience) && tailoredData.experience.length > 0) {
              setValue("experience", tailoredData.experience, { shouldValidate: true });
            }
            toast({ title: "Success", description: "Your resume has been tailored to the job description." });
          } catch(e) {
            console.error("Failed to parse tailored resume JSON:", e);
            // Fallback for non-JSON response
            setValue("summary", result.data.tailoredResume, { shouldValidate: true });
            toast({ title: "Success", description: "Resume summary has been updated." });
          }
        } else {
            toast({ variant: "destructive", title: "AI Error", description: result.error });
        }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-primary" />
          AI Enhancements
        </CardTitle>
        <CardDescription>
          Use AI to optimize and tailor your resume.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="enhance">
            <AccordionTrigger>Content Enhancement Suggestions</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Get AI-powered suggestions to improve your professional summary.
                </p>
                <Button onClick={handleEnhanceContent} disabled={isPending}>
                  {isPending && !enhancementResult ? "Generating..." : "Suggest Improvements"}
                </Button>
                {isPending && !enhancementResult && <Skeleton className="h-20 w-full" />}
                {enhancementResult && (
                  <Alert>
                    <AlertTitle>Suggestion</AlertTitle>
                    <AlertDescription>
                      <p className="mb-4">{enhancementResult}</p>
                      <Button onClick={handleApplyEnhancement} size="sm">Apply Suggestion</Button>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ats">
            <AccordionTrigger>ATS Optimization</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Optimize your resume to pass through Applicant Tracking Systems (ATS).
                </p>
                <Button onClick={handleOptimizeAts} disabled={isPending}>
                  {isPending && !atsResult ? "Optimizing..." : "Optimize for ATS"}
                </Button>
                {isPending && !atsResult && <Skeleton className="h-32 w-full" />}
                {atsResult && (
                    <Alert>
                    <AlertTitle>ATS Optimization Report</AlertTitle>
                    <AlertDescription>
                        <h4 className="font-semibold mt-4 mb-2">Suggestions:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            {atsResult.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </AlertDescription>
                    </Alert>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tailor">
            <AccordionTrigger>Tailor from Job Description</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Paste a job description below to automatically tailor your resume.
                </p>
                <Textarea
                  placeholder="Paste job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={6}
                />
                <Button onClick={handleTailorResume} disabled={isPending}>
                  {isPending ? "Tailoring..." : "Tailor My Resume"}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
