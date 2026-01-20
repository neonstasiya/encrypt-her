import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Shield, 
  MapPin, 
  ArrowRight, 
  Download, 
  ExternalLink, 
  Check,
  Phone,
  FileText,
  Plane,
  Users,
  FileCheck,
  CreditCard,
  Lock,
  Eye,
  Globe,
  Heart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageTitle } from "@/hooks/usePageTitle";
import heroImage from "@/assets/hero-privacy.jpg";

const Resources = () => {
  usePageTitle("Free Resources | EncryptHer");

  const navigationCards = [
    {
      title: "Blog",
      description: "Read our latest articles on safety, privacy, and digital advocacy. Stay informed with expert tips and real-world insights.",
      icon: BookOpen,
      link: "/blog",
      linkText: "Visit Blog",
      color: "primary"
    },
    {
      title: "12 Keys to Safety",
      description: "Our comprehensive guide covering online privacy, travel safety, public awareness, and digital advocacy fundamentals.",
      icon: Shield,
      link: "/safety-guides",
      linkText: "View Safety Guide",
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

  const downloadableGuides = [
    {
      title: "Online Privacy Starter Guide",
      description: "Essential steps to protect your digital footprint and secure your online accounts.",
      icon: Lock,
      available: false
    },
    {
      title: "Travel Safety Checklist",
      description: "Comprehensive pre-travel and in-destination safety checklist for solo travelers.",
      icon: Plane,
      available: false
    },
    {
      title: "Personal Safety Handbook",
      description: "Day-to-day safety practices for home, work, and public spaces.",
      icon: Shield,
      available: false
    },
    {
      title: "Advocacy Action Guide",
      description: "How to effectively advocate for privacy rights and digital safety legislation.",
      icon: Users,
      available: false
    },
    {
      title: "Data Broker Opt-Out Templates",
      description: "Ready-to-use templates for removing your information from data broker sites.",
      icon: FileCheck,
      available: false
    },
    {
      title: "Emergency Contact Card",
      description: "Printable card with essential emergency contacts and safety information.",
      icon: CreditCard,
      available: false
    }
  ];

  const quickSafetyTips = [
    {
      id: "online-privacy",
      title: "Online Privacy Quick Wins",
      icon: Lock,
      tips: [
        "Enable two-factor authentication on all important accounts",
        "Use a password manager to create and store strong, unique passwords",
        "Review and tighten privacy settings on social media platforms",
        "Use a VPN when connecting to public Wi-Fi networks",
        "Google yourself to see what information is publicly available"
      ]
    },
    {
      id: "personal-safety",
      title: "Personal Safety Essentials",
      icon: Eye,
      tips: [
        "Always be aware of your surroundings and exits in public spaces",
        "Trust your instincts - if something feels wrong, it probably is",
        "Share your location with trusted contacts when meeting someone new",
        "Keep emergency contacts easily accessible on your phone",
        "Vary your daily routines to avoid predictable patterns"
      ]
    },
    {
      id: "travel-safety",
      title: "Travel Safety Basics",
      icon: Plane,
      tips: [
        "Inspect hotel rooms for hidden cameras upon arrival",
        "Use a portable door lock or security alarm in hotel rooms",
        "Never post your travel plans on social media until after you return",
        "Research destination-specific safety concerns before traveling",
        "Keep copies of important documents separately from originals"
      ]
    },
    {
      id: "digital-rights",
      title: "Digital Rights Actions",
      icon: Globe,
      tips: [
        "Contact your representatives about privacy legislation",
        "Exercise your data rights under CCPA if you're in California",
        "Report data breaches and privacy violations to the FTC",
        "Share privacy resources with friends and family",
        "Support organizations fighting for digital rights and privacy"
      ]
    }
  ];

  const externalResources = [
    {
      name: "Electronic Frontier Foundation (EFF)",
      description: "Digital privacy guides, surveillance self-defense, and privacy tools to help you protect yourself online.",
      website: "https://www.eff.org",
      phone: null
    },
    {
      name: "RAINN",
      description: "Rape, Abuse & Incest National Network - the nation's largest anti-sexual violence organization.",
      website: "https://www.rainn.org",
      phone: "1-800-656-HOPE (4673)"
    },
    {
      name: "National Domestic Violence Hotline",
      description: "24/7 confidential support for those experiencing domestic violence. Text START to 88788.",
      website: "https://www.thehotline.org",
      phone: "1-800-799-7233"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content" role="main">
        {/* Hero Section */}
        <section 
          className="relative py-20 md:py-28 overflow-hidden" 
          aria-labelledby="resources-heading"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" aria-hidden="true" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <Badge variant="secondary" className="mb-4">
              Free Resources
            </Badge>
            <h1 id="resources-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Safety Resources & Guides
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access free downloadable guides, quick tips, and practical resources to protect your privacy and safety in the digital and physical world.
            </p>
          </div>
        </section>

        {/* Navigation Cards Section */}
        <section className="py-16" aria-label="Main resource categories">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Explore Our Resources
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {navigationCards.map((resource) => (
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

        {/* Downloadable Guides Section */}
        <section 
          className="py-16 bg-muted/30" 
          aria-labelledby="downloads-heading"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="downloads-heading" className="text-2xl md:text-3xl font-bold mb-4">
                Downloadable Guides
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Free, printable resources to help you stay safe. Download and keep these guides handy for quick reference.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {downloadableGuides.map((guide) => (
                <Card key={guide.title} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div 
                        className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <guide.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      {!guide.available && (
                        <Badge variant="secondary" className="text-xs">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-3">{guide.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant={guide.available ? "default" : "outline"} 
                      className="w-full"
                      disabled={!guide.available}
                      aria-label={guide.available ? `Download ${guide.title}` : `${guide.title} - Coming Soon`}
                    >
                      <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                      {guide.available ? "Download PDF" : "Coming Soon"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Safety Tips Section */}
        <section 
          className="py-16" 
          aria-labelledby="tips-heading"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="tips-heading" className="text-2xl md:text-3xl font-bold mb-4">
                Quick Safety Tips
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Actionable tips you can implement today to enhance your safety and privacy.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {quickSafetyTips.map((category) => (
                  <AccordionItem 
                    key={category.id} 
                    value={category.id}
                    className="border rounded-lg px-6 bg-card"
                  >
                    <AccordionTrigger className="hover:no-underline py-5">
                      <div className="flex items-center gap-3">
                        <div 
                          className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                          aria-hidden="true"
                        >
                          <category.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <span className="font-semibold text-left">{category.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <ul className="space-y-3 ml-13" role="list">
                        {category.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check 
                              className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" 
                              aria-hidden="true" 
                            />
                            <span className="text-muted-foreground">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* External Resources Section */}
        <section 
          className="py-16 bg-muted/30" 
          aria-labelledby="external-heading"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="external-heading" className="text-2xl md:text-3xl font-bold mb-4">
                Trusted External Resources
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Organizations we trust for additional support, information, and advocacy.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {externalResources.map((resource) => (
                <Card key={resource.name} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{resource.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {resource.phone && (
                      <a 
                        href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`}
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                        aria-label={`Call ${resource.name} at ${resource.phone}`}
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        {resource.phone}
                      </a>
                    )}
                    <a 
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Visit Website
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-16" 
          aria-labelledby="cta-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <Heart className="h-12 w-12 mx-auto mb-6 text-primary" aria-hidden="true" />
            <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-4">
              Want More Comprehensive Training?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Explore our in-depth courses or join our newsletter for regular safety tips, privacy news, and exclusive resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/coming-soon">
                  View Our Courses
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/newsletter">Join Our Newsletter</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section 
          className="py-16 bg-muted/50" 
          aria-labelledby="help-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 id="help-heading" className="text-2xl md:text-3xl font-bold mb-4">
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
