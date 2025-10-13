import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Lock, Shield, Search, FileText, Scale, BookOpen, AlertCircle, CheckCircle, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import encryptherLogo from "@/assets/encrypther-logo.png";
import onlineSecurityImage from "@/assets/online-security.jpg";

const OnlinePrivacy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
                <Link to="/about" className="text-lg text-muted-foreground hover:text-foreground transition-colors">About</Link>
                <a href="/#contact" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                <Link to="/donate" className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors">Donate</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={onlineSecurityImage} alt="Digital privacy and online security" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/90 to-accent/40" />
        </div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">Online Privacy & Security</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Take Control of Your <span className="text-primary">Digital Footprint</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn how to manually remove your personal information from the internet, understand your privacy rights, and protect your digital identity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">Enroll in Course</Button>
            <Button size="lg" variant="outline" className="text-lg">Free Resources</Button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What You'll Learn</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive training to reduce your digital exposure and protect your privacy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Find Your Data</CardTitle>
                <CardDescription>
                  Discover where your personal information exists online and what data brokers know about you
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Manual Removal Process</CardTitle>
                <CardDescription>
                  Step-by-step guidance on removing your information from data aggregator websites
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Know Your Rights</CardTitle>
                <CardDescription>
                  Understanding privacy laws like GDPR, CCPA, and your legal rights to data removal
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Ongoing Protection</CardTitle>
                <CardDescription>
                  Learn how to maintain privacy and prevent future data exposure
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Practical Tools</CardTitle>
                <CardDescription>
                  Access templates, scripts, and tools to streamline the removal process
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Privacy Best Practices</CardTitle>
                <CardDescription>
                  Essential habits to minimize your digital footprint going forward
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Aggregators Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Understanding Data Aggregators</h2>
            <p className="text-lg text-muted-foreground">
              Learn about the companies collecting and selling your personal information
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
            <p className="text-lg">
              Data aggregators, also known as data brokers or people search sites, collect personal information from public records, social media, online activities, and other sources. They compile this data into detailed profiles that are sold to marketers, employers, and anyone willing to pay.
            </p>
          </div>

          <Card className="border-border mb-8">
            <CardHeader>
              <CardTitle>Common Types of Data Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Full name, age, date of birth, and aliases</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Current and previous addresses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Phone numbers and email addresses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Family members and associates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Property ownership and financial records</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Court records, arrests, and criminal history</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Professional licenses and education history</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Social media activity and online behavior</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Major Data Broker Sites</CardTitle>
              <CardDescription>
                Our course covers how to remove your data from these and many more sites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Spokeo</li>
                  <li>• WhitePages</li>
                  <li>• BeenVerified</li>
                  <li>• PeopleFinders</li>
                  <li>• Intelius</li>
                  <li>• MyLife</li>
                </ul>
                <ul className="space-y-2">
                  <li>• TruthFinder</li>
                  <li>• InstantCheckmate</li>
                  <li>• Radaris</li>
                  <li>• PeopleSmart</li>
                  <li>• FastPeopleSearch</li>
                  <li>• And 50+ more sites</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Privacy Laws Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Your Privacy Rights & The Law</h2>
            <p className="text-lg text-muted-foreground">
              Understanding the legal protections available to you
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="ccpa" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                CCPA (California Consumer Privacy Act)
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  The CCPA grants California residents specific rights regarding their personal information, including:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• The right to know what personal data is being collected</li>
                  <li>• The right to know if personal data is sold or shared</li>
                  <li>• The right to say no to the sale of personal information</li>
                  <li>• The right to access personal information</li>
                  <li>• The right to request deletion of personal data</li>
                  <li>• The right to equal service and price</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gdpr" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                GDPR (General Data Protection Regulation)
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  The GDPR is a European Union law that protects data privacy for EU citizens and residents, including:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• The right to access your personal data</li>
                  <li>• The right to rectification (correcting inaccurate data)</li>
                  <li>• The right to erasure ("right to be forgotten")</li>
                  <li>• The right to restrict processing</li>
                  <li>• The right to data portability</li>
                  <li>• The right to object to processing</li>
                  <li>• Rights related to automated decision-making</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="other-laws" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Other U.S. State Privacy Laws
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  Several U.S. states have enacted or are implementing comprehensive privacy laws:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Virginia (VCDPA):</strong> Consumer Data Protection Act</li>
                  <li>• <strong>Colorado (CPA):</strong> Privacy Act</li>
                  <li>• <strong>Connecticut (CTDPA):</strong> Data Privacy Act</li>
                  <li>• <strong>Utah (UCPA):</strong> Consumer Privacy Act</li>
                  <li>• Additional states with pending legislation</li>
                </ul>
                <p className="mt-3">
                  Our course helps you understand which laws apply to you and how to exercise your rights under each one.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="exercising-rights" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                How to Exercise Your Rights
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  Our comprehensive course teaches you:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• How to identify which privacy laws protect you</li>
                  <li>• Step-by-step instructions for filing data removal requests</li>
                  <li>• Template letters and emails for contacting data brokers</li>
                  <li>• How to verify that your data has been removed</li>
                  <li>• What to do if companies refuse to comply</li>
                  <li>• How to file complaints with regulatory authorities</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Course Curriculum Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Course Curriculum</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive, step-by-step program to reclaim your privacy
            </p>
          </div>

          <div className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                  Assessment & Discovery
                </CardTitle>
                <CardDescription>Learn what information is publicly available about you</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Conducting a privacy audit</li>
                  <li>• Search engines and what they reveal</li>
                  <li>• Identifying all data broker profiles</li>
                  <li>• Understanding your exposure level</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                  Manual Removal Strategies
                </CardTitle>
                <CardDescription>Detailed guidance on removing your information</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Opt-out procedures for major data brokers</li>
                  <li>• Crafting effective removal requests</li>
                  <li>• Using legal rights to demand deletion</li>
                  <li>• Tracking and documenting your requests</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
                  Social Media & Account Cleanup
                </CardTitle>
                <CardDescription>Securing and removing old digital accounts</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Finding forgotten accounts</li>
                  <li>• Deleting old profiles and accounts</li>
                  <li>• Privacy settings optimization</li>
                  <li>• Managing your current digital presence</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</div>
                  Ongoing Privacy Maintenance
                </CardTitle>
                <CardDescription>Creating sustainable privacy habits</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Monitoring for new data exposure</li>
                  <li>• Privacy-focused tools and services</li>
                  <li>• Preventing future data collection</li>
                  <li>• Annual privacy checkups</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Reclaim Your Privacy?
          </h3>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join our comprehensive online privacy course and take the first step toward protecting your digital identity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg">
              Enroll Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 text-white border-white/20">
              View Free Resources
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-1 mb-4">
                <img src={encryptherLogo} alt="EncryptHer logo" className="h-12 w-12" />
                <span className="font-bold text-lg text-foreground">EncryptHer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering women through digital safety education and real-world protection strategies.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Programs</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/online-privacy" className="hover:text-foreground transition-colors">Online Privacy</Link></li>
                <li><Link to="/travel-safety" className="hover:text-foreground transition-colors">Travel Safety</Link></li>
                <li><Link to="/digital-advocacy" className="hover:text-foreground transition-colors">Advocacy</Link></li>
                <li><Link to="/public-safety" className="hover:text-foreground transition-colors">Public Safety</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link to="/safety-guides" className="hover:text-foreground transition-colors">Safety Guides</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><Link to="/newsletter" className="hover:text-foreground transition-colors">Newsletter</Link></li>
                <li><Link to="/donate" className="hover:text-foreground transition-colors">Donate</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 EncryptHer. All rights reserved. A nonprofit organization dedicated to women's digital and physical safety.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OnlinePrivacy;
