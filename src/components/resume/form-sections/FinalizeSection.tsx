
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Download } from "lucide-react";
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function FinalizeSection() {
  const form = useFormContext<ResumeSchema>();
  const { toast } = useToast();

  const handleDownload = async () => {
    const format = form.getValues("meta.format");
    const resumeContainer = document.getElementById('resume-preview-container');

    if (!resumeContainer) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not find resume content to download.",
      });
      return;
    }
    
    toast({
      title: "Generating your resume...",
      description: `Your resume will be downloaded as a ${format} file.`,
    });

    if (format === 'PDF') {
      try {
        const canvas = await html2canvas(resumeContainer, {
          scale: 3, // Higher scale for better quality
          useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        
        // A4 dimensions in mm: 210 x 297
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const width = pdfWidth;
        const height = width / ratio;

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        
        pdf.save("resume.pdf");

        toast({
          title: "Download Complete",
          description: "Your resume has been downloaded as a PDF.",
        });

      } catch (error) {
        console.error("Failed to generate PDF", error);
        toast({
          variant: "destructive",
          title: "Download Failed",
          description: "There was an error generating the PDF.",
        });
      }
    } else {
       toast({
          variant: "destructive",
          title: "Not Implemented",
          description: `${format} download is not yet supported.`,
        });
    }
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
                      <RadioGroupItem value="DOC" disabled />
                    </FormControl>
                    <FormLabel className="font-normal text-muted-foreground">DOC (soon)</FormLabel>
                  </FormItem>
                   <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="HTML" disabled />
                    </FormControl>
                    <FormLabel className="font-normal text-muted-foreground">HTML (soon)</FormLabel>
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
                <FormLabel className="text-base">Add a cover letter?</FormLabel>
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
        <div className="flex gap-4">
          <Button onClick={handleDownload} className="w-full">
            <Download className="mr-2 h-4 w-4" /> Download Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
