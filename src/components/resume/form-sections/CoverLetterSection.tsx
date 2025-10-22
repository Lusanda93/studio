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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ResumeSchema } from "@/lib/types";
import { FilePlus2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function CoverLetterSection() {
  const { control } = useFormContext<ResumeSchema>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePlus2 className="text-primary" />
          Cover Letter
        </CardTitle>
        <CardDescription>
          Write your cover letter here.
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
      </CardContent>
    </Card>
  );
}
