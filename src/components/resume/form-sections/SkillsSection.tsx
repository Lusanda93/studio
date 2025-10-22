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
import { Star } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function SkillsSection() {
  const form = useFormContext<ResumeSchema>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="text-primary" />
          Skills
        </CardTitle>
        <CardDescription>
          Include your relevant skills (technical and soft skills).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Skills</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. JavaScript, React, Project Management, Team Leadership"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Separate skills with commas or list them on new lines.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
