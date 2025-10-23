
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
import { ResumeSchema } from "@/lib/types";
import { Contact, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function ReferencesSection() {
  const form = useFormContext<ResumeSchema>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "references",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Contact className="text-primary" />
          References
        </CardTitle>
        <CardDescription>
          Add your professional or academic references.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg relative space-y-2">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`references.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Dr. Jane Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`references.${index}.relationship`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Former Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="md:col-span-2">
                    <FormField
                    control={form.control}
                    name={`references.${index}.contact`}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Info</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. jane.smith@email.com or (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                 </div>
             </div>
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
          onClick={() => append({ name: "", contact: "", relationship: "" })}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Reference
        </Button>
      </CardContent>
    </Card>
  );
}
