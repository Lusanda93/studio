import { FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <FileText className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">ResuMaster</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
