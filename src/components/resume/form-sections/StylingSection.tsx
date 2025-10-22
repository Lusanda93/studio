
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
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ResumeSchema } from "@/lib/types";
import { Brush, Camera, Upload } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { CameraDialog } from "../CameraDialog";
import { cn } from "@/lib/utils";

const colorSchemes = [
  { name: "Purple", value: "#5E548E" },
  { name: "Blue", value: "#2A628F" },
  { name: "Green", value: "#4F772D" },
  { name: "Gray", value: "#52525B" },
  { name: "Orange", value: "#EA580C" },
];

export function StylingSection() {
  const form = useFormContext<ResumeSchema>();
  const includePhoto = form.watch("styling.includePhoto");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraDialogOpen, setCameraDialogOpen] = useState(false);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("personal.photo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoSelect = (dataUri: string) => {
    form.setValue("personal.photo", dataUri);
    setCameraDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brush className="text-primary" />
            Style & Format
          </CardTitle>
          <CardDescription>
            Customize the look and feel of your resume.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="styling.template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume Template Style</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4 pt-2"
                  >
                    {["Classic", "Modern", "Creative", "Minimalist"].map(
                      (template) => (
                        <FormItem
                          key={template}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={template} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {template}
                          </FormLabel>
                        </FormItem>
                      )
                    )}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="styling.font"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Font Style</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Inter">Inter (Sans-serif)</SelectItem>
                    <SelectItem value="Serif">Default Serif</SelectItem>
                    <SelectItem value="Mono">Default Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="styling.colorScheme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Scheme</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {colorSchemes.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => field.onChange(color.value)}
                        className={`h-8 w-8 rounded-full border-2 ${
                          field.value === color.value
                            ? "border-ring ring-2 ring-ring"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: color.value }}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="styling.includePhoto"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Include a photo?</FormLabel>
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
          <div
            className={cn(
              "transition-all duration-300 ease-in-out overflow-hidden",
              includePhoto
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            )}
          >
             <div className="p-4 border rounded-lg space-y-4">
                <FormLabel>Profile Photo</FormLabel>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Photo
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <Button type="button" variant="outline" className="w-full" onClick={() => setCameraDialogOpen(true)}>
                    <Camera className="mr-2 h-4 w-4" /> Take Picture
                  </Button>
                </div>
             </div>
          </div>
        </CardContent>
      </Card>
      <CameraDialog isOpen={isCameraDialogOpen} onOpenChange={setCameraDialogOpen} onPhotoSelect={handlePhotoSelect} />
    </>
  );
}
