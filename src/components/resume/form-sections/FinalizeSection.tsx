"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Download, FileText, Save } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useFormContext } from "react-hook-form";
import { ResumeSchema } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export function FinalizeSection() {
  const form = useFormContext<ResumeSchema>();
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your resume download will begin shortly.",
    });
    // In a real app, you would trigger a PDF/Word generation and download here.
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Check className="text-primary" />
          Finalize & Download
        </CardTitle>
        <CardDescription>
          Your resume is ready! Choose your final settings and download.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="meta.format"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose a format</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="PDF" />
                    </FormControl>
                    <FormLabel className="font-normal">PDF</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Word" />
                    </FormControl>
                    <FormLabel className="font-normal">Word</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meta.save"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Save for future edits?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meta.generateCoverLetter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Generate a cover letter?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button onClick={handleDownload} className="w-full">
            <Download className="mr-2 h-4 w-4" /> Download Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
