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
import { Brush } from "lucide-react";
import { useFormContext } from "react-hook-form";

const colorSchemes = [
  { name: "Purple", value: "#5E548E" },
  { name: "Blue", value: "#2A628F" },
  { name: "Green", value: "#4F772D" },
  { name: "Gray", value: "#52525B" },
  { name: "Orange", value: "#EA580C" },
];

export function StylingSection() {
  const form = useFormContext<ResumeSchema>();

  return (
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
                        <FormLabel className="font-normal">{template}</FormLabel>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
      </CardContent>
    </Card>
  );
}
