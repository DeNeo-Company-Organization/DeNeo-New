import { Logo } from "@/components/shared/logo";
import { Twitter, Linkedin, Gitlab } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-1 items-center justify-start">
            <Logo />
        </div>
        <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} DeNeo. All Rights Reserved.
        </p>
        <div className="flex flex-1 items-center justify-end gap-4">
            <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter size={20} />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin size={20} />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Gitlab size={20} />
            </a>
        </div>
      </div>
    </footer>
  );
}
