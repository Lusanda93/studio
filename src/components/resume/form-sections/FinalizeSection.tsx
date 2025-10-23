
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

  const getResumeHtml = () => {
    const resumeContainer = document.getElementById('resume-preview-container');
    if (!resumeContainer) return null;

    // Clone the node to avoid modifying the original
    const clone = resumeContainer.cloneNode(true) as HTMLElement;
    
    // Get all stylesheets
    const sheets = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('');
        } catch (e) {
          console.warn("Can't read cross-origin stylesheet", e);
          return null;
        }
      })
      .filter(Boolean)
      .join('\n');

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        <style>${sheets}</style>
      </head>
      <body>
        <div style="width: 210mm; margin: auto;">
         ${clone.innerHTML}
        </div>
      </body>
      </html>
    `;
    return html;
  };

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

    try {
      if (format === 'PDF') {
        const canvas = await html2canvas(resumeContainer, {
          scale: 3, 
          useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        
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
        
        let width = pdfWidth;
        let height = pdfHeight;
        let imgHeight = width / ratio;

        if(imgHeight > height) {
          imgHeight = height;
          width = imgHeight * ratio;
        }

        const x = (pdfWidth - width) / 2;
        const y = 0;


        pdf.addImage(imgData, 'PNG', x, y, width, imgHeight);
        
        pdf.save("resume.pdf");

      } else if (format === 'HTML' || format === 'DOC') {
        const htmlContent = getResumeHtml();
        if (htmlContent) {
          const blob = new Blob([htmlContent], { type: format === 'DOC' ? 'application/msword' : 'text/html' });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `resume.${format.toLowerCase()}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          throw new Error("Could not generate HTML content.");
        }
      }

      toast({
        title: "Download Complete",
        description: `Your resume has been downloaded as a ${format} file.`,
      });

    } catch (error) {
      console.error("Failed to generate file", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: `There was an error generating the ${format} file.`,
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
                      <RadioGroupItem value="DOC" />
                    </FormControl>
                    <FormLabel className="font-normal">DOC</FormLabel>
                  </FormItem>
                   <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="HTML" />
                    </FormControl>
                    <FormLabel className="font-normal">HTML</FormLabel>
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
