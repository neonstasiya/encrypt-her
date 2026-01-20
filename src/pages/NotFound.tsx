import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SkipLink } from "@/components/SkipLink";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  usePageTitle("Page Not Found | EncryptHer");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <main id="main-content" className="flex min-h-screen items-center justify-center">
        <div className="text-center px-4">
          <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
          <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
          <p className="mb-8 text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild size="lg">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              Return to Home
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
