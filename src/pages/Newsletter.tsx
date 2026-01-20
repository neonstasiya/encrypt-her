import { SafetyGuidesHeader } from "@/components/SafetyGuidesHeader";
import { NewsletterForm } from "@/components/NewsletterForm";
import { BookOpen, Megaphone, Lightbulb, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import encryptherLogo from "@/assets/encrypther-logo.png";
import { FooterResourcesDropdown } from "@/components/FooterResourcesDropdown";
import { usePageTitle } from "@/hooks/usePageTitle";

const Newsletter = () => {
  usePageTitle();
  
  const benefits = [
    {
      icon: BookOpen,
      title: "New Classes & Workshops",
      description: "Be the first to know about upcoming workshops and training sessions"
    },
    {
      icon: Megaphone,
      title: "Safety Guides & Resources",
      description: "Get exclusive access to comprehensive safety guides and digital security tips"
    },
    {
      icon: Lightbulb,
      title: "Exclusive Tips & Tutorials",
      description: "Receive expert advice and step-by-step tutorials delivered to your inbox"
    },
    {
      icon: Users,
      title: "Community News & Updates",
      description: "Stay connected with the EncryptHer community and latest developments"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SafetyGuidesHeader />
      
      {/* Main Content */}
      <main id="main-content" role="main">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden" aria-labelledby="newsletter-heading">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" aria-hidden="true" />
          
          <div className="container mx-auto px-4 relative z-10">
            <header className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <h1 id="newsletter-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Stay Connected with EncryptHer
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Join our newsletter and be part of a community dedicated to digital safety, 
                privacy, and empowerment. Get the latest updates, exclusive resources, and 
                early access to new content.
              </p>
            </header>

            {/* Benefits Grid */}
            <section aria-labelledby="benefits-heading" className="mb-16">
              <h2 id="benefits-heading" className="sr-only">Newsletter Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto" role="list" aria-label="Newsletter benefits">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <Card 
                      key={index} 
                      className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                      role="listitem"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10" aria-hidden="true">
                            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2 text-foreground">
                              {benefit.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Newsletter Form */}
            <div className="max-w-2xl mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer role="contentinfo" className="py-12 px-4 border-t border-border bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-0 mb-1">
                <img src={encryptherLogo} alt="" className="h-12 w-12" aria-hidden="true" />
                <span className="font-bold text-lg text-foreground">EncryptHer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering women through digital safety education and real-world protection strategies.
              </p>
            </div>
            
            <nav aria-label="Programs navigation">
              <h2 className="font-semibold mb-4 text-foreground text-base">Programs</h2>
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li><Link to="/online-privacy" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Online Privacy</Link></li>
                <li><Link to="/travel-safety" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Travel Safety</Link></li>
                <li><Link to="/digital-advocacy" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Advocacy</Link></li>
                <li><Link to="/public-safety" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Public Safety</Link></li>
              </ul>
            </nav>
            
            <nav aria-label="Resources navigation">
              <h2 className="font-semibold mb-4 text-foreground text-base">Resources</h2>
              <ul className="space-y-2 text-sm" role="list">
                <li><FooterResourcesDropdown /></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Blog</Link></li>
                <li><Link to="/safety-guides" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Safety Guides</Link></li>
              </ul>
            </nav>
            
            <nav aria-label="Connect navigation">
              <h2 className="font-semibold mb-4 text-foreground text-base">Connect</h2>
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li><Link to="/about" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Contact</Link></li>
                <li><Link to="/newsletter" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded" aria-current="page">Newsletter</Link></li>
                <li><Link to="/donate" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Donate</Link></li>
              </ul>
            </nav>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 EncryptHer. All rights reserved. A nonprofit organization dedicated to women's digital and physical safety.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Newsletter;
