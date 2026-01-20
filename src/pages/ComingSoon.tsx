import { Link } from "react-router-dom";
import { Clock, Bell, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageTitle } from "@/hooks/usePageTitle";

const ComingSoon = () => {
  usePageTitle("Coming Soon | EncryptHer");
  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content" role="main">
        {/* Hero Section */}
        <section 
          className="py-20 bg-gradient-to-b from-primary/10 via-accent/5 to-background" 
          aria-labelledby="coming-soon-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <div 
                className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8"
                aria-hidden="true"
              >
                <Clock className="h-10 w-10 text-primary" aria-hidden="true" />
              </div>
              
              <h1 id="coming-soon-heading" className="text-4xl md:text-5xl font-bold mb-6">
                Coming Soon!
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                We're working hard to bring you an amazing learning experience. Our comprehensive courses are currently in development and will be available soon.
              </p>

              <Card className="bg-card/50 border-primary/20 mb-8">
                <CardHeader>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                    <CardTitle className="text-lg">What to Expect</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Expert-led courses on online privacy, personal safety, and digital advocacy designed specifically for women.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1" aria-hidden="true">•</span>
                      <span>Interactive video lessons with real-world scenarios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1" aria-hidden="true">•</span>
                      <span>Downloadable resources and checklists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1" aria-hidden="true">•</span>
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1" aria-hidden="true">•</span>
                      <span>Access to our supportive community</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/newsletter">
                    <Bell className="mr-2 h-5 w-5" aria-hidden="true" />
                    Get Notified
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Free Resources CTA */}
        <section 
          className="py-16 bg-muted/50" 
          aria-labelledby="meanwhile-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 id="meanwhile-heading" className="text-2xl md:text-3xl font-bold mb-4">
              In the Meantime...
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Check out our free resources including safety guides, blog articles, and local resources by state.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/resources">Browse Free Resources</Link>
            </Button>
          </div>
        </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default ComingSoon;
