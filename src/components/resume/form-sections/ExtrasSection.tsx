"use client";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeSchema } from "@/lib/types";
import { Award, Lightbulb, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ExtraSectionProps = {
  name: "projects" | "certifications";
  title: string;
  noun: string;
};

function ExtraSection({ name, title, noun }: ExtraSectionProps) {
  const form = useFormContext<ResumeSchema>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg relative space-y-2">
          <FormField
            control={form.control}
            name={`${name}.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{noun} Title</FormLabel>
                <FormControl>
                  <Input placeholder={`e.g. My Awesome ${noun}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${name}.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder={`Describe your ${noun}...`} rows={2} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ title: "", description: "" })}
      >
        <Plus className="mr-2 h-4 w-4" /> Add {noun}
      </Button>
    </div>
  );
}

export function ExtrasSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Additional Information
        </CardTitle>
        <CardDescription>
          Include any certifications, awards, projects, or publications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="projects">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">
              <Lightbulb className="mr-2 h-4 w-4" /> Projects
            </TabsTrigger>
            <TabsTrigger value="certifications">
              <Award className="mr-2 h-4 w-4" /> Certifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="pt-4">
            <ExtraSection name="projects" title="Projects" noun="Project" />
          </TabsContent>
          <TabsContent value="certifications" className="pt-4">
            <ExtraSection name="certifications" title="Certifications & Awards" noun="Certification" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
