import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import encryptherLogo from "@/assets/encrypther-logo.png";

export const SafetyGuidesHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-px">
        <Link to="/" className="flex items-center gap-0">
          <img src={encryptherLogo} alt="EncryptHer logo" className="h-24 w-24" />
          <h1 className="text-2xl font-bold text-foreground">EncryptHer</h1>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              <Link to="/" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <a href="/#classes" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Classes</a>
              <Link to="/safety-guides" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Safety Guides</Link>
              <Link to="/blog" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
              <Link to="/about" className="text-lg text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <a href="/#contact" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              <Link to="/donate" className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors">Donate</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
