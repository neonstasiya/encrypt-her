import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Eye, Shield, Package, Heart, Bus, AlertCircle, CheckCircle, Phone, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import publicSafetyImage from "@/assets/public-safety.jpg";
import encryptherLogo from "@/assets/encrypther-logo.png";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { SkipLink } from "@/components/SkipLink";
import { usePageTitle } from "@/hooks/usePageTitle";

const PublicSafety = () => {
  usePageTitle("Public Safety Course | EncryptHer");
  
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
          <img src={publicSafetyImage} alt="Personal safety and awareness" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/90 to-accent/40" />
        </div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">Public Safety Course</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Master Personal Safety <span className="text-primary">& Protection</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive training in situational awareness, self-defense, personal safety tools, and protective strategies for everyday life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">Enroll in Course</Button>
            <Button size="lg" variant="outline" className="text-lg">Free Resources</Button>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What You'll Learn</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Build practical skills and confidence to protect yourself in any situation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Situational Awareness</CardTitle>
                <CardDescription>
                  Master threat recognition, the OODA loop, and reading your environment to stay ahead of danger
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Self-Defense Techniques</CardTitle>
                <CardDescription>
                  Learn verbal boundaries, de-escalation tactics, and physical defense skills that work in real situations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Personal Safety Equipment</CardTitle>
                <CardDescription>
                  Proper use of pepper spray, personal alarms, tactical tools, and safety apps with legal guidance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Safe Dating Practices</CardTitle>
                <CardDescription>
                  Navigate online dating, first dates, and social situations safely with proven strategies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Bus className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Transportation Safety</CardTitle>
                <CardDescription>
                  Stay safe using ride-sharing, public transit, parking lots, and walking alone
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Community Resources</CardTitle>
                <CardDescription>
                  Build your safety network with emergency contacts, support organizations, and local resources
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Understanding Personal Safety Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Understanding Personal Safety</h2>
            <p className="text-lg text-muted-foreground">
              Build a foundation in awareness and self-defense philosophy
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
            <p className="text-lg">
              Personal safety starts with awareness and preparation. Most dangerous situations can be avoided entirely through situational awareness, understanding threat patterns, and trusting your instincts. When avoidance isn't possible, having practical self-defense skills and the right tools can make all the difference.
            </p>
          </div>

          <Card className="border-border mb-8">
            <CardHeader>
              <CardTitle>Core Safety Principles</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Prevention First:</strong> Most dangerous situations can be avoided through awareness</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Trust Your Instincts:</strong> If something feels wrong, it probably is</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Set Boundaries:</strong> Don't worry about appearing rude when your safety is at stake</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>De-escalation Works:</strong> Words and body language can often defuse situations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Fight to Escape:</strong> Physical defense is about getting away, not winning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Tools Require Training:</strong> Having safety equipment is only effective with proper training</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Build Your Network:</strong> Safety is enhanced through community connections</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Know the Law:</strong> Legal regulations vary by location for self-defense tools</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>The OODA Loop Framework</CardTitle>
              <CardDescription>
                A proven decision-making process used by law enforcement and military
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Observe</h4>
                  <p>Continuously scan your environment for potential threats, unusual behavior, exits, and escape routes</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Orient</h4>
                  <p>Process what you're seeing, consider context, and assess the level of potential danger</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Decide</h4>
                  <p>Choose your course of action: avoid, create distance, de-escalate, or defend</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Act</h4>
                  <p>Execute your decision quickly and decisively, then reassess the situation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Safety Tools Guide Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Safety Tools & Equipment Guide</h2>
            <p className="text-lg text-muted-foreground">
              Understanding your options for personal protection
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Recommended Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Pepper Spray:</strong> Effective range, legal in most areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Personal Alarms:</strong> 120+ decibels, no training needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Tactical Flashlights:</strong> Disorient attackers, multi-purpose</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Safety Apps:</strong> Location sharing, emergency alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Whistles:</strong> Simple, affordable, effective</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Self-Defense Keychains:</strong> Discreet striking tools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Tool Selection Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span><strong>Legal Status:</strong> Check local laws before purchasing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span><strong>Training Level:</strong> Match tools to your skill and comfort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span><strong>Accessibility:</strong> Must be quickly reachable when needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span><strong>Maintenance:</strong> Check expiration dates, test batteries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span><strong>Effectiveness Range:</strong> Understand tool limitations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span><strong>Budget:</strong> Quality tools at various price points</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-destructive/5 border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Important Legal Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-3">
                Self-defense tool laws vary dramatically by state, county, and city. Items legal in one jurisdiction may be restricted or prohibited in another. Our course covers:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• How to research local regulations in your area</li>
                <li>• Legal self-defense principles and proportional force</li>
                <li>• Documentation and reporting requirements</li>
                <li>• Travel considerations when carrying safety tools</li>
              </ul>
              <p className="mt-3 font-semibold">
                Always verify legality before purchasing or carrying any self-defense tool.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Course Curriculum Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Course Curriculum</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive, hands-on program to build real-world safety skills
            </p>
          </div>

          <div className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                  Situational Awareness & Threat Recognition
                </CardTitle>
                <CardDescription>Develop skills to identify and avoid danger before it escalates</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• The OODA Loop decision-making framework</li>
                  <li>• Reading body language and behavioral cues</li>
                  <li>• Identifying exit routes and safe zones</li>
                  <li>• Trusting your intuition and gut feelings</li>
                  <li>• Avoiding common distractions (phone use, headphones)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                  Self-Defense Fundamentals
                </CardTitle>
                <CardDescription>Verbal, mental, and physical defense techniques that work</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Verbal boundaries and assertive communication</li>
                  <li>• De-escalation tactics and conflict avoidance</li>
                  <li>• Basic striking techniques for vulnerable targets</li>
                  <li>• Escape techniques from common grabs</li>
                  <li>• Legal considerations and proportional force</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
                  Personal Safety Equipment
                </CardTitle>
                <CardDescription>Proper selection, training, and legal use of safety tools</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Pepper spray: proper technique, range, maintenance</li>
                  <li>• Personal alarms and acoustic deterrents</li>
                  <li>• Tactical flashlights and disorientation tactics</li>
                  <li>• Self-defense keychains and striking tools</li>
                  <li>• Safety apps and digital protection</li>
                  <li>• Legal research for your jurisdiction</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</div>
                  Dating & Social Safety
                </CardTitle>
                <CardDescription>Navigate social situations and relationships safely</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Online dating safety and red flags</li>
                  <li>• First date precautions and meeting locations</li>
                  <li>• Drink safety and awareness in social settings</li>
                  <li>• Creating safety check-ins with friends</li>
                  <li>• Recognizing manipulation and coercion</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">5</div>
                  Transportation & Public Space Safety
                </CardTitle>
                <CardDescription>Stay protected while traveling and in public areas</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Ride-sharing safety protocols and verification</li>
                  <li>• Public transit awareness and positioning</li>
                  <li>• Parking lot and garage safety strategies</li>
                  <li>• Walking alone: routes, timing, and awareness</li>
                  <li>• Hotel and travel safety measures</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">6</div>
                  Emergency Response & Resources
                </CardTitle>
                <CardDescription>Build your safety network and response plan</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Creating emergency contact protocols</li>
                  <li>• Local and national safety resources</li>
                  <li>• Reporting incidents and documentation</li>
                  <li>• Building a personal safety network</li>
                  <li>• Post-incident support and resources</li>
                  <li>• Ongoing safety practice and skill maintenance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Common questions about personal safety and self-defense
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="followed" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                What should I do if I think I'm being followed?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  If you suspect you're being followed:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Don't go home - head to a public, well-lit area with people</li>
                  <li>• Cross the street or change direction to verify</li>
                  <li>• Call someone and describe your location loudly</li>
                  <li>• Enter a business and ask staff for help</li>
                  <li>• Call 911 if the situation escalates</li>
                  <li>• Trust your instincts - it's better to be wrong than unsafe</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pepper-spray" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Is pepper spray legal everywhere?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  Pepper spray legality varies significantly by location:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Legal in most U.S. states with some restrictions</li>
                  <li>• Some states limit the size or concentration</li>
                  <li>• A few states require permits or special training</li>
                  <li>• Restricted in some cities even when state-legal</li>
                  <li>• Prohibited in many international destinations</li>
                  <li>• Always research laws in your specific jurisdiction before purchasing</li>
                </ul>
                <p className="mt-3">
                  Our course includes a comprehensive guide to researching local regulations.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="self-defense-class" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Do I need to take a physical self-defense class?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  While our course covers fundamental self-defense principles, we highly recommend supplementing with in-person training:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Physical practice builds muscle memory and confidence</li>
                  <li>• Instructors can correct technique in real-time</li>
                  <li>• Sparring scenarios prepare you for stress responses</li>
                  <li>• Many community centers offer affordable or free classes</li>
                  <li>• Look for women-specific self-defense programs in your area</li>
                </ul>
                <p className="mt-3">
                  Our course teaches you what to practice and provides resources for finding qualified instructors.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="safety-apps" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Which safety apps do you recommend?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  Popular safety apps include:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Life360:</strong> Location sharing with family and friends</li>
                  <li>• <strong>bSafe:</strong> Emergency alerts, fake call feature, live streaming</li>
                  <li>• <strong>Noonlight:</strong> Silent emergency dispatch with location tracking</li>
                  <li>• <strong>Circle of 6:</strong> Quick reach emergency contacts</li>
                  <li>• <strong>Citizen:</strong> Real-time crime and safety alerts</li>
                </ul>
                <p className="mt-3">
                  Our course includes setup guides and best practices for using safety apps effectively.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="solo-travel" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                How can I stay safe when traveling alone?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  Solo travel safety strategies:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Share your itinerary with trusted contacts</li>
                  <li>• Research safe neighborhoods before booking accommodations</li>
                  <li>• Stay in well-reviewed hotels with good security</li>
                  <li>• Use licensed transportation services</li>
                  <li>• Keep copies of important documents separately</li>
                  <li>• Learn basic phrases in the local language</li>
                  <li>• Register with your embassy when traveling internationally</li>
                  <li>• Maintain regular check-ins with someone back home</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="safety-kit" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                What should be in my personal safety kit?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  A comprehensive safety kit includes:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Pepper spray (if legal in your area)</li>
                  <li>• Personal alarm or whistle</li>
                  <li>• Tactical flashlight with strobe function</li>
                  <li>• Portable phone charger and charging cable</li>
                  <li>• Emergency contact card with key phone numbers</li>
                  <li>• Small first aid supplies</li>
                  <li>• Cash for emergencies</li>
                  <li>• Safety apps installed and configured on your phone</li>
                </ul>
                <p className="mt-3">
                  Keep items easily accessible but secure. Our course includes a detailed equipment checklist.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-10" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready to Build Your Safety Skills?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of women taking control of their personal safety. Enroll today and start building confidence, awareness, and practical protection skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">Enroll Now</Button>
            <Button size="lg" variant="outline" className="text-lg">View Free Resources</Button>
          </div>
        </div>
      </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default PublicSafety;