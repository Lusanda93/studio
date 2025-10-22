"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ResumeSchema } from "@/lib/types";
import { FilePlus2, Wand2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useTransition, useState } from "react";
import { getCoverLetter } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CoverLetterSection() {
  const { control, getValues, setValue } = useFormContext<ResumeSchema>();
  const [isPending, startTransition] = useTransition();
  const [jobDescription, setJobDescription] = useState("");
  const { toast } = useToast();

  const handleGenerateCoverLetter = () => {
    startTransition(async () => {
      if (!jobDescription) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please paste a job description first.",
        });
        return;
      }
      const resume = getValues();
      const result = await getCoverLetter(resume, jobDescription);
      if (result.success && result.data) {
        setValue("coverLetter", result.data.coverLetter, {
          shouldValidate: true,
        });
        toast({
          title: "Success",
          description: "Cover letter generated successfully!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "AI Error",
          description: result.error,
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePlus2 className="text-primary" />
          Cover Letter
        </CardTitle>
        <CardDescription>
          Write a cover letter or generate one with AI based on your resume and
          the job description.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Dear Hiring Manager,..."
                  rows={15}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="p-4 border rounded-lg space-y-4 bg-muted/20">
            <h4 className="font-semibold flex items-center gap-2"><Wand2 className="text-primary w-5 h-5"/> AI Generation</h4>
             <Textarea
                placeholder="Paste the job description here to generate a tailored cover letter."
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                />
            <Button onClick={handleGenerateCoverLetter} disabled={isPending}>
                {isPending ? "Generating..." : "Generate with AI"}
            </Button>
            {isPending && <Skeleton className="h-20 w-full" />}
        </div>
      </CardContent>
    </Card>
  );
}
