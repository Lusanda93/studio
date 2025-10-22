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
import { FileText } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function SummarySection() {
  const form = useFormContext<ResumeSchema>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="text-primary" />
          Professional Summary
        </CardTitle>
        <CardDescription>
          Write a professional summary or objective statement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. Results-driven Software Engineer with 5+ years of experience in..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A brief, 2-3 sentence summary of your career and skills.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
