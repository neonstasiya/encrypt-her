import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Shield, Users, Scale, Megaphone, FileText, Globe, Building, Mail, ExternalLink, CheckSquare, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import advocacyImage from "@/assets/advocacy.jpg";
import encryptherLogo from "@/assets/encrypther-logo.png";
import { FooterResourcesDropdown } from "@/components/FooterResourcesDropdown";
import { SkipLink } from "@/components/SkipLink";
import { usePageTitle } from "@/hooks/usePageTitle";

const DigitalAdvocacy = () => {
  usePageTitle("Digital Privacy Advocacy | EncryptHer");
  
  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50" role="banner">
        <div className="container mx-auto px-4 flex items-center justify-between py-px">
          <Link to="/" className="flex items-center gap-0 focus:outline-none focus:ring-2 focus:ring-ring rounded">
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
                <Link to="/" className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Home</Link>
                <a href="/#classes" className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Classes</a>
                <Link to="/safety-guides" className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Safety Guides</Link>
                <Link to="/about" className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">About</Link>
                <a href="/#contact" className="text-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Contact</a>
                <Link to="/donate" className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Donate</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main id="main-content">

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={advocacyImage} 
            alt="Women advocating for privacy rights and legislation" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/80 to-accent/40" />
        </div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
            <Megaphone className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">Our Mission</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Fighting for <span className="text-primary">Privacy Rights in America</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            EncryptHer advocates for comprehensive federal privacy legislation and empowers individuals to demand privacy protections from their government.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <a href="#resources">View Resources</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <a href="#what-we-do">Learn About Our Work</a>
            </Button>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What We Do</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              EncryptHer works to protect privacy rights through advocacy, education, and community organizing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Legislative Advocacy</CardTitle>
                <CardDescription>
                  Pushing for comprehensive federal privacy laws
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Lobbying Congress for privacy legislation</li>
                  <li>• Submitting public comments on proposed rules</li>
                  <li>• Working with policymakers on privacy bills</li>
                  <li>• Monitoring legislative developments</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Coalition Building</CardTitle>
                <CardDescription>
                  Partnering with privacy organizations nationwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Collaborating with EFF, ACLU, and EPIC</li>
                  <li>• Building grassroots coalitions</li>
                  <li>• Coordinating advocacy campaigns</li>
                  <li>• Sharing resources and expertise</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Megaphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community Organizing</CardTitle>
                <CardDescription>
                  Mobilizing citizens for privacy rights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Organizing letter-writing campaigns</li>
                  <li>• Hosting advocacy training events</li>
                  <li>• Coordinating with local activists</li>
                  <li>• Building a national privacy movement</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Policy Research</CardTitle>
                <CardDescription>
                  Analyzing privacy laws and corporate practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Researching federal and state privacy laws</li>
                  <li>• Tracking data breach incidents</li>
                  <li>• Studying corporate surveillance practices</li>
                  <li>• Publishing policy recommendations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Public Education</CardTitle>
                <CardDescription>
                  Raising awareness about privacy threats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Creating educational resources</li>
                  <li>• Hosting webinars and workshops</li>
                  <li>• Publishing privacy news and analysis</li>
                  <li>• Engaging through social media</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <CheckSquare className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Direct Action</CardTitle>
                <CardDescription>
                  Providing tools for immediate advocacy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Letter templates for representatives</li>
                  <li>• Petition campaigns for privacy rights</li>
                  <li>• Tools to find your elected officials</li>
                  <li>• Guidance on filing privacy complaints</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Privacy Crisis in America */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">The Privacy Crisis in America</h2>
          </div>
          
          <p className="text-lg text-muted-foreground mb-6">
            The United States lacks comprehensive federal privacy legislation, leaving Americans vulnerable to corporate surveillance, data breaches, and privacy violations. While the EU has GDPR and other countries have robust privacy protections, the US relies on a patchwork of state laws and narrow federal regulations.
          </p>

          <div className="space-y-4 mb-8">
            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-2">Corporate Surveillance</h3>
                <p className="text-muted-foreground">Tech companies collect massive amounts of personal data with minimal oversight. Your browsing history, location data, private messages, and even biometric information are bought and sold without meaningful consent.</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-2">Data Breaches</h3>
                <p className="text-muted-foreground">In 2024 alone, over 1 billion records were exposed in data breaches. Weak privacy laws mean companies face minimal consequences for failing to protect your information.</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-2">The GDPR Gap</h3>
                <p className="text-muted-foreground">European citizens have strong privacy rights under GDPR - the right to access, delete, and control their data. Americans have no equivalent federal protections.</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">Why Federal Legislation Matters</h3>
            <p className="text-muted-foreground">State privacy laws are a start, but only federal legislation can provide consistent protections for all Americans, regulate interstate data flows, and hold tech giants accountable nationwide.</p>
          </div>
        </div>
      </section>

      {/* Current Privacy Legislation */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Scale className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Current Privacy Legislation</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Without comprehensive federal privacy law, states are creating their own regulations - resulting in a confusing patchwork that leaves most Americans unprotected.
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Federal Level</h3>
            <Card className="border-border mb-4">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-foreground mb-2">Current Federal Privacy Laws</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong className="text-foreground">HIPAA</strong> - Healthcare data only (1996)</li>
                  <li>• <strong className="text-foreground">COPPA</strong> - Children under 13 only (1998)</li>
                  <li>• <strong className="text-foreground">FCRA</strong> - Credit reporting only (1970)</li>
                  <li>• <strong className="text-foreground">GLBA</strong> - Financial institutions only (1999)</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground italic">These laws are decades old and cover only specific sectors - most personal data remains unprotected.</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-foreground mb-2">Proposed Federal Bills</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong className="text-foreground">American Data Privacy and Protection Act (ADPPA)</strong> - Comprehensive privacy framework (stalled in Congress)</li>
                  <li>• <strong className="text-foreground">Data Accountability and Transparency Act</strong> - FTC enforcement powers</li>
                  <li>• <strong className="text-foreground">Kids Online Safety Act (KOSA)</strong> - Protections for minors</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground italic">Despite bipartisan support, privacy bills continue to stall due to tech industry lobbying.</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">State Privacy Laws</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="california">
                <AccordionTrigger>California - CCPA/CPRA (Strongest Protection)</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">Enacted:</strong> CCPA (2020), CPRA (2023)</p>
                    <p><strong className="text-foreground">Coverage:</strong> California residents</p>
                    <p><strong className="text-foreground">Key Rights:</strong> Access, deletion, opt-out of sale, correction, and limitations on sensitive data use</p>
                    <p><strong className="text-foreground">Enforcement:</strong> California Privacy Protection Agency with strong enforcement powers</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="virginia">
                <AccordionTrigger>Virginia - CDPA</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">Enacted:</strong> 2023</p>
                    <p><strong className="text-foreground">Coverage:</strong> Virginia residents</p>
                    <p><strong className="text-foreground">Key Rights:</strong> Access, deletion, data portability, opt-out of targeted advertising</p>
                    <p><strong className="text-foreground">Limitations:</strong> Attorney General enforcement only, no private right of action</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="colorado">
                <AccordionTrigger>Colorado - CPA</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">Enacted:</strong> 2023</p>
                    <p><strong className="text-foreground">Coverage:</strong> Colorado residents</p>
                    <p><strong className="text-foreground">Key Rights:</strong> Access, correction, deletion, data portability, opt-out</p>
                    <p><strong className="text-foreground">Unique Feature:</strong> Universal opt-out mechanism required</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="connecticut">
                <AccordionTrigger>Connecticut - CTDPA</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">Enacted:</strong> 2023</p>
                    <p><strong className="text-foreground">Coverage:</strong> Connecticut residents</p>
                    <p><strong className="text-foreground">Key Rights:</strong> Similar to Virginia with data minimization requirements</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="utah">
                <AccordionTrigger>Utah - UCPA</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">Enacted:</strong> 2023</p>
                    <p><strong className="text-foreground">Coverage:</strong> Utah residents</p>
                    <p><strong className="text-foreground">Key Rights:</strong> Access, deletion, data portability, opt-out</p>
                    <p><strong className="text-foreground">Note:</strong> More business-friendly than other state laws</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="other">
                <AccordionTrigger>Other States</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p>Several other states have enacted or are considering privacy laws including Oregon, Texas, Montana, Iowa, Tennessee, Florida, and Indiana.</p>
                    <p className="italic">The patchwork approach creates confusion and leaves most Americans without comprehensive protections.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* How You Can Take Action */}
      <section id="resources" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Megaphone className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">How You Can Take Action</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Your voice matters. Here are concrete steps you can take to advocate for privacy rights.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <Mail className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Contact Your Representatives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Find your elected officials and let them know privacy matters to you.</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://www.usa.gov/elected-officials" target="_blank" rel="noopener noreferrer">
                    Find Your Representatives <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Join Active Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Participate in ongoing advocacy efforts and letter-writing campaigns.</p>
                <Button variant="outline" className="w-full" disabled>
                  View Campaigns (Coming Soon)
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CheckSquare className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Sign Petitions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Add your voice to petitions demanding privacy protections.</p>
                <Button variant="outline" className="w-full" disabled>
                  Active Petitions (Coming Soon)
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Spread Awareness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Share information about privacy issues on social media and in your community.</p>
                <Button variant="outline" className="w-full" disabled>
                  Social Media Toolkit (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Organizations */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Globe className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Privacy Organizations & Resources</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Connect with leading organizations fighting for digital privacy rights.
          </p>

          <div className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Electronic Frontier Foundation (EFF)
                  <Button variant="ghost" size="sm" asChild>
                    <a href="https://www.eff.org" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Leading nonprofit defending digital privacy, free speech, and innovation. Provides legal support, policy analysis, and advocacy tools.</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  American Civil Liberties Union (ACLU)
                  <Button variant="ghost" size="sm" asChild>
                    <a href="https://www.aclu.org/issues/privacy-technology" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Protects privacy rights through litigation, advocacy, and public education. Fights government and corporate surveillance.</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Electronic Privacy Information Center (EPIC)
                  <Button variant="ghost" size="sm" asChild>
                    <a href="https://www.epic.org" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Independent research center focused on privacy, civil liberties, and technology policy. Publishes detailed privacy research and reports.</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Fight for the Future
                  <Button variant="ghost" size="sm" asChild>
                    <a href="https://www.fightforthefuture.org" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Grassroots digital rights organization running creative campaigns for privacy, free expression, and user rights online.</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Privacy International
                  <Button variant="ghost" size="sm" asChild>
                    <a href="https://www.privacyinternational.org" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Global organization fighting for the right to privacy worldwide. Investigates surveillance, challenges governments and corporations.</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Access Now
                  <Button variant="ghost" size="sm" asChild>
                    <a href="https://www.accessnow.org" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Defends and extends digital rights of users at risk around the world. Provides direct technical support and policy advocacy.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Write to Your Government */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Write to Your Government</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Contacting your representatives is one of the most effective ways to create change. Here's how to make your voice heard.
          </p>

          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Find Your Representatives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">U.S. Senate & House</h4>
                  <Button variant="outline" asChild>
                    <a href="https://www.congress.gov/members/find-your-member" target="_blank" rel="noopener noreferrer">
                      Find Your Members of Congress <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">State Legislators</h4>
                  <Button variant="outline" asChild>
                    <a href="https://openstates.org/find_your_legislator/" target="_blank" rel="noopener noreferrer">
                      Find Your State Legislators <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Tips for Effective Advocacy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Be specific:</strong> Reference specific bills or issues (e.g., "Please support the American Data Privacy and Protection Act")
                  </li>
                  <li>
                    <strong className="text-foreground">Tell your story:</strong> Share how privacy issues have affected you personally
                  </li>
                  <li>
                    <strong className="text-foreground">Be respectful:</strong> Keep your tone professional and constructive
                  </li>
                  <li>
                    <strong className="text-foreground">Include your address:</strong> Representatives prioritize correspondence from their constituents
                  </li>
                  <li>
                    <strong className="text-foreground">Follow up:</strong> Send periodic updates and thank representatives who take action
                  </li>
                  <li>
                    <strong className="text-foreground">Call AND write:</strong> Phone calls have immediate impact, but written letters create a record
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Public Comment Periods</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Federal agencies accept public comments on proposed privacy rules and regulations. Your comments become part of the official record.
                </p>
                <Button variant="outline" asChild>
                  <a href="https://www.regulations.gov" target="_blank" rel="noopener noreferrer">
                    View Open Comment Periods <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Report Privacy Violations */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Report Privacy Violations</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            If you've experienced a privacy violation, here's where to file complaints with government agencies.
          </p>

          <div className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Federal Trade Commission (FTC)
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://reportfraud.ftc.gov" target="_blank" rel="noopener noreferrer">
                      File Complaint <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Report data breaches, deceptive privacy practices, identity theft, and unfair business practices involving your personal information.</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  State Attorneys General
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.naag.org/find-my-ag/" target="_blank" rel="noopener noreferrer">
                      Find Your AG <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">State AGs enforce state privacy laws. If you're in California, Virginia, Colorado, Connecticut, or Utah, your AG has special privacy enforcement powers.</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Consumer Financial Protection Bureau (CFPB)
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.consumerfinance.gov/complaint/" target="_blank" rel="noopener noreferrer">
                      File Complaint <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Report privacy violations by banks, credit card companies, lenders, and other financial institutions.</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  HHS Office for Civil Rights
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.hhs.gov/hipaa/filing-a-complaint/index.html" target="_blank" rel="noopener noreferrer">
                      File Complaint <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Report violations of HIPAA - the federal law protecting medical and health information privacy.</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>California Privacy Protection Agency (CPPA)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">California residents can report CCPA/CPRA violations to the nation's first dedicated privacy enforcement agency.</p>
                <Button variant="outline" asChild>
                  <a href="https://cppa.ca.gov" target="_blank" rel="noopener noreferrer">
                    Visit CPPA <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Join the Fight for Privacy Rights</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Together, we can demand comprehensive federal privacy legislation and hold corporations accountable. Every voice matters in this fight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="https://www.usa.gov/elected-officials" target="_blank" rel="noopener noreferrer">
                Contact Your Representatives
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#resources">View All Resources</a>
            </Button>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card" role="contentinfo">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-0 mb-1">
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
              <ul className="space-y-2 text-sm">
                <li><FooterResourcesDropdown /></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link to="/safety-guides" className="text-muted-foreground hover:text-foreground transition-colors">Safety Guides</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link to="/newsletter" className="hover:text-foreground transition-colors">Newsletter</Link></li>
                <li><Link to="/donate" className="hover:text-foreground transition-colors">Donate</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 EncryptHer. All rights reserved. A nonprofit organization dedicated to women's digital and physical world.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DigitalAdvocacy;