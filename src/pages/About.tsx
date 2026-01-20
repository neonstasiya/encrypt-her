import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Users, BookOpen, AlertCircle, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import encryptherLogo from "@/assets/encrypther-logo.png";
import founderPhoto from "@/assets/founder-photo.png";
import { FooterResourcesDropdown } from "@/components/FooterResourcesDropdown";
import { usePageTitle } from "@/hooks/usePageTitle";

const About = () => {
  usePageTitle();
  
  return <div className="min-h-screen bg-background">
      {/* Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
        Skip to main content
      </a>

      {/* Header */}
      <header role="banner" className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-px">
          <Link to="/" className="flex items-center gap-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg" aria-label="EncryptHer home">
            <img src={encryptherLogo} alt="" className="h-24 w-24" aria-hidden="true" />
            <span className="text-2xl font-bold text-foreground">EncryptHer</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6" aria-label="Main navigation">
                <Link to="/" className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Home</Link>
                <a href="/#classes" className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Classes</a>
                <Link to="/safety-guides" className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Safety Guides</Link>
                <Link to="/about" className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded" aria-current="page">About</Link>
                <a href="/#contact" className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Contact</a>
                <Link to="/donate" className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Donate</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main">
        {/* About Section */}
        <section className="py-20 px-4" aria-labelledby="about-heading">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 id="about-heading" className="text-4xl md:text-5xl font-bold mb-4 text-foreground">About EncryptHer</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Born from personal experience, built for women's empowerment
              </p>
            </div>
            
            {/* Founder's Story */}
            <div className="flex justify-center mb-16">
              {/* Story & Mission */}
              <div className="space-y-6 max-w-3xl">
                <div className="border-l-4 border-primary pl-6 py-2">
                  <h2 className="text-2xl font-semibold mb-3 text-foreground">Our Mission</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
                    <p>In a world where personal data has become a form of currency, EncryptHer exists to help women reclaim their digital power. We teach women how to protect themselves online and offline — from removing personal information off the internet, to building real-world situational awareness and digital confidence.</p>
                    <p>Founded by cybersecurity analyst Anastasiya, EncryptHer bridges the gap between cybersecurity education, personal safety, and empowerment. We're here to make sure no woman ever feels exposed, unprotected, or powerless in the digital age.</p>
                    <p>Our mission is to empower women through cybersecurity education, privacy awareness, and practical safety training — giving every woman the tools to protect her identity, her reputation, and her life.</p>
                    <p>We provide digital privacy training, cyber safety workshops, and real-world safety skills through partnerships with law enforcement and security experts. We also build a supportive community of tech-savvy women who share knowledge, resources, and confidence to navigate today's digital world.</p>
                    <p>Every day, women are targeted online — from harassment and stalking to scams and doxxing. EncryptHer exists to turn fear into skill, vulnerability into confidence, and silence into empowerment.</p>
                    <p>Knowledge is protection, and protection is power. Together, we're creating a world where women don't just survive the digital landscape — they dominate it.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Core Values */}
            <section aria-labelledby="values-heading">
              <h2 id="values-heading" className="text-3xl font-bold text-center mb-8 text-foreground">Our Core Values</h2>
              <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Core values">
                <Card className="border-border hover:shadow-lg transition-shadow" role="listitem">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4" aria-hidden="true">
                      <Users className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle>Advocacy</CardTitle>
                    <CardDescription>
                      Fighting for women's digital rights and privacy protection through education and awareness
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-border hover:shadow-lg transition-shadow" role="listitem">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4" aria-hidden="true">
                      <AlertCircle className="h-6 w-6 text-accent" aria-hidden="true" />
                    </div>
                    <CardTitle>Awareness</CardTitle>
                    <CardDescription>
                      Raising consciousness about both digital threats and physical safety concerns women face daily
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-border hover:shadow-lg transition-shadow" role="listitem">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4" aria-hidden="true">
                      <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>
                      Providing practical skills and actionable knowledge for digital safety and real-world protection
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer role="contentinfo" className="py-12 px-4 border-t border-border bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-1 mb-4">
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
                <li><Link to="/about" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded" aria-current="page">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Contact</Link></li>
                <li><Link to="/newsletter" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Newsletter</Link></li>
                <li><Link to="/donate" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Donate</Link></li>
              </ul>
            </nav>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 EncryptHer. All rights reserved. A nonprofit organization dedicated to women's digital and physical safety.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default About;