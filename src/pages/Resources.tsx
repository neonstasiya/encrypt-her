import { Link } from "react-router-dom";
import { BookOpen, Shield, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";

const Resources = () => {
  const resourceCards = [
    {
      title: "Blog",
      description: "Read our latest articles on safety, privacy, and digital advocacy. Stay informed with expert tips and real-world insights.",
      icon: BookOpen,
      link: "/blog",
      linkText: "Visit Blog",
      color: "primary"
    },
    {
      title: "Safety Guides",
      description: "Download comprehensive guides covering online privacy, travel safety, and public awareness. Free resources to help you stay protected.",
      icon: Shield,
      link: "/safety-guides",
      linkText: "View Safety Guides",
      color: "accent"
    },
    {
      title: "Resources by State",
      description: "Find local safety resources, crisis hotlines, shelters, legal aid, and support services specific to your state.",
      icon: MapPin,
      link: "/resources-by-state",
      linkText: "Find Local Resources",
      color: "primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content" role="main">
        {/* Hero Section */}
        <section 
          className="py-16 bg-gradient-to-b from-primary/10 to-background" 
          aria-labelledby="resources-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 text-primary" aria-hidden="true" />
            <h1 id="resources-heading" className="text-4xl md:text-5xl font-bold mb-4">
              Free Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access our comprehensive collection of safety guides, educational content, and local resources—all designed to empower and protect you.
            </p>
          </div>
        </section>

        {/* Resource Cards Section */}
        <section className="py-16" aria-label="Available resources">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {resourceCards.map((resource) => (
                <Card 
                  key={resource.title}
                  className="border-border hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <CardHeader>
                    <div 
                      className={`h-14 w-14 rounded-lg ${resource.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'} flex items-center justify-center mb-4`}
                      aria-hidden="true"
                    >
                      <resource.icon 
                        className={`h-7 w-7 ${resource.color === 'primary' ? 'text-primary' : 'text-accent'}`} 
                        aria-hidden="true" 
                      />
                    </div>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                    <CardDescription className="text-base">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full group">
                      <Link to={resource.link}>
                        {resource.linkText}
                        <ArrowRight 
                          className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" 
                          aria-hidden="true" 
                        />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section 
          className="py-16 bg-muted/50" 
          aria-labelledby="more-resources-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 id="more-resources-heading" className="text-2xl md:text-3xl font-bold mb-4">
              Need Help Finding Something?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              If you can't find what you're looking for or need personalized guidance, our team is here to help.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default Resources;
