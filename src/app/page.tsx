import { Header } from "@/components/Header";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumeFormProvider } from "@/components/resume/ResumeFormProvider";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <ResumeFormProvider>
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 overflow-hidden">
          <ScrollArea className="h-full lg:col-span-2 rounded-lg border bg-card">
            <div className="p-6">
              <ResumeForm />
            </div>
          </ScrollArea>
          <div className="h-full md:col-span-1 lg:col-span-3">
             <ScrollArea className="h-full rounded-lg">
                <div className="flex justify-center items-start h-full">
                <div className="w-full max-w-[210mm] min-h-[297mm] bg-card shadow-lg rounded-lg overflow-hidden">
                    <ResumePreview />
                </div>
                </div>
            </ScrollArea>
          </div>
        </main>
      </div>
    </ResumeFormProvider>
  );
}
