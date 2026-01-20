import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import encryptherLogo from "@/assets/encrypther-logo.png";
import { VisuallyHidden } from "@/components/VisuallyHidden";

interface AccessibleHeaderProps {
  showDonateButton?: boolean;
}

export const AccessibleHeader = ({ showDonateButton = false }: AccessibleHeaderProps) => {
  const location = useLocation();
  
  const isCurrentPage = (path: string) => location.pathname === path;
  
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50" role="banner">
      <div className="container mx-auto px-4 flex items-center justify-between py-px">
        <Link 
          to="/" 
          className="flex items-center gap-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
          aria-label="EncryptHer - Go to homepage"
        >
          <img src={encryptherLogo} alt="" className="h-24 w-24" aria-hidden="true" />
          <span className="text-2xl font-bold text-foreground">EncryptHer</span>
        </Link>
        
        <div className="flex items-center gap-2">
          {showDonateButton && (
            <Link to="/donate">
              <Button>Donate</Button>
            </Link>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Open main navigation menu"
                aria-haspopup="dialog"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
                <VisuallyHidden>Menu</VisuallyHidden>
              </Button>
            </SheetTrigger>
            <SheetContent aria-label="Main navigation menu">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6" aria-label="Main navigation">
                <Link 
                  to="/" 
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
                  aria-current={isCurrentPage("/") ? "page" : undefined}
                >
                  Home
                </Link>
                <a 
                  href="/#classes" 
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
                >
                  Programs
                </a>
                <Link 
                  to="/safety-guides" 
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
                  aria-current={isCurrentPage("/safety-guides") ? "page" : undefined}
                >
                  Safety Guides
                </Link>
                <Link 
                  to="/resources" 
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
                  aria-current={isCurrentPage("/resources") ? "page" : undefined}
                >
                  Resources
                </Link>
                <Link 
                  to="/blog" 
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
                  aria-current={isCurrentPage("/blog") ? "page" : undefined}
                >
                  Blog
                </Link>
                <Link 
                  to="/about" 
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
                  aria-current={isCurrentPage("/about") ? "page" : undefined}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
                  aria-current={isCurrentPage("/contact") ? "page" : undefined}
                >
                  Contact
                </Link>
                <Link 
                  to="/donate" 
                  className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
                  aria-current={isCurrentPage("/donate") ? "page" : undefined}
                >
                  Donate
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};