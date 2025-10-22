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
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 md:overflow-y-hidden">
          <ScrollArea className="h-full lg:col-span-2">
            <div className="pr-4 pb-4">
              <ResumeForm />
            </div>
          </ScrollArea>
          <div className="h-full md:col-span-1 lg:col-span-3">
             <div className="flex justify-center items-start h-full">
              <div className="w-full h-full max-w-[210mm] aspect-[210/297] bg-card shadow-lg rounded-lg overflow-hidden">
                  <ResumePreview />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ResumeFormProvider>
  );
}
