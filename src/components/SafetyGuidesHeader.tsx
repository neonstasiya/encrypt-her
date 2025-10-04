import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import encryptherLogo from "@/assets/encrypther-logo.png";

export const SafetyGuidesHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          <img src={encryptherLogo} alt="EncryptHer logo" className="h-24 w-24" />
          <h1 className="text-2xl font-bold text-foreground">EncryptHer</h1>
        </Link>
        
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Home
          </Button>
        </Link>
      </div>
    </header>
  );
};
