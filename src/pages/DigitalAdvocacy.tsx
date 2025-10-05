import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, AlertCircle, Users, Scale, Megaphone, Lock, FileText, UserCheck, Globe, Phone, Heart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import advocacyImage from "@/assets/advocacy.jpg";
import encryptherLogo from "@/assets/encrypther-logo.png";

const DigitalAdvocacy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-px">
          <Link to="/" className="flex items-center gap-0">
            <img src={encryptherLogo} alt="EncryptHer logo" className="h-24 w-24" />
            <h1 className="text-2xl font-bold text-foreground">EncryptHer</h1>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/#classes" className="text-muted-foreground hover:text-foreground transition-colors">Classes</Link>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
          <Button>Get Started</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={advocacyImage} 
            alt="Diverse group of women learning about digital advocacy and rights" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/80 to-accent/40" />
        </div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
            <Megaphone className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">Digital Rights & Advocacy</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Empower Your Voice & <span className="text-primary">Protect Your Rights</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn to navigate digital spaces safely, advocate for your rights, and build supportive communities online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">Start Learning</Button>
            <Button size="lg" variant="outline" className="text-lg">View Resources</Button>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What You'll Learn</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive training in digital rights, advocacy, and online safety
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Understanding Digital Rights</CardTitle>
                <CardDescription>
                  Know your rights and freedoms in digital spaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Freedom of expression online</li>
                  <li>• Right to privacy & data protection</li>
                  <li>• Access to information</li>
                  <li>• Digital inclusion & accessibility</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Reporting Harassment</CardTitle>
                <CardDescription>
                  Document and report online harassment effectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Types of online harassment</li>
                  <li>• Evidence documentation</li>
                  <li>• Platform reporting processes</li>
                  <li>• Law enforcement procedures</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Building Support Networks</CardTitle>
                <CardDescription>
                  Create and maintain safe community spaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Finding online communities</li>
                  <li>• Creating safe spaces</li>
                  <li>• Peer support strategies</li>
                  <li>• Working with organizations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Legal Protections</CardTitle>
                <CardDescription>
                  Navigate legal resources and protections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Cyberstalking & harassment laws</li>
                  <li>• Restraining orders & legal action</li>
                  <li>• Working with law enforcement</li>
                  <li>• Finding legal aid services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Megaphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Advocacy Tools</CardTitle>
                <CardDescription>
                  Use digital tools for effective advocacy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Secure communication tools</li>
                  <li>• Anonymous reporting platforms</li>
                  <li>• Social media strategies</li>
                  <li>• Digital organizing best practices</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Activist Safety</CardTitle>
                <CardDescription>
                  Stay safe while advocating for change
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Digital security for activists</li>
                  <li>• Managing online visibility</li>
                  <li>• Protecting personal information</li>
                  <li>• Crisis response planning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Understanding Digital Rights */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Understanding Digital Rights</h2>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8">
            Digital rights are human rights in the digital age. Understanding these rights empowers you to navigate online spaces with confidence and advocate for fair treatment.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-border">
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Freedom of Expression</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Your right to express opinions, share information, and engage in public discourse online without censorship or retaliation.
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Lock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Privacy & Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Control over your personal information, including how it's collected, used, and shared by companies and organizations.
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Access to Information</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                The right to seek, receive, and share information freely online without undue restrictions or censorship.
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <UserCheck className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Digital Inclusion</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Equal access to digital technologies and online spaces regardless of gender, race, ability, or socioeconomic status.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reporting Online Harassment */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Reporting & Documenting Online Harassment</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Knowing how to properly document and report online harassment is crucial for your safety and holding perpetrators accountable.
          </p>

          <div className="space-y-6 mb-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Types of Online Harassment</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li><strong className="text-foreground">Cyberbullying:</strong> Repeated hostile behavior intended to intimidate or humiliate</li>
                  <li><strong className="text-foreground">Doxxing:</strong> Publishing private information (address, phone number) without consent</li>
                  <li><strong className="text-foreground">Cyberstalking:</strong> Persistent unwanted contact and monitoring of online activities</li>
                  <li><strong className="text-foreground">Threats:</strong> Direct or implied threats of violence or harm</li>
                  <li><strong className="text-foreground">Impersonation:</strong> Creating fake accounts to damage reputation</li>
                  <li><strong className="text-foreground">Revenge Porn:</strong> Non-consensual sharing of intimate images</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>How to Document Evidence</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                  <li><strong className="text-foreground">Take screenshots:</strong> Capture the full context including timestamps, usernames, and URLs</li>
                  <li><strong className="text-foreground">Save original messages:</strong> Keep copies of emails, DMs, and messages in their original format</li>
                  <li><strong className="text-foreground">Record details:</strong> Note dates, times, platforms, and any identifying information</li>
                  <li><strong className="text-foreground">Back up everything:</strong> Store documentation in multiple secure locations</li>
                  <li><strong className="text-foreground">Keep a log:</strong> Maintain a chronological record of all incidents</li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Platform Reporting Guides</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="twitter">
                <AccordionTrigger>Twitter / X Reporting</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">Step 1:</strong> Click the three dots on the tweet or profile</p>
                    <p><strong className="text-foreground">Step 2:</strong> Select "Report Tweet" or "Report"</p>
                    <p><strong className="text-foreground">Step 3:</strong> Choose the violation type (harassment, threats, etc.)</p>
                    <p><strong className="text-foreground">Step 4:</strong> Provide additional context and submit</p>
                    <p><strong className="text-foreground">Note:</strong> You can also block and mute accounts for immediate relief</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="instagram">
                <AccordionTrigger>Instagram Reporting</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">Step 1:</strong> Tap the three dots above a post or profile</p>
                    <p><strong className="text-foreground">Step 2:</strong> Select "Report"</p>
                    <p><strong className="text-foreground">Step 3:</strong> Choose the reason (bullying, hate speech, etc.)</p>
                    <p><strong className="text-foreground">Step 4:</strong> Follow the prompts to submit your report</p>
                    <p><strong className="text-foreground">Tip:</strong> Use the "Restrict" feature to limit interactions without blocking</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="facebook">
                <AccordionTrigger>Facebook Reporting</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">Step 1:</strong> Click the three dots in the top right of the post</p>
                    <p><strong className="text-foreground">Step 2:</strong> Select "Find support or report post"</p>
                    <p><strong className="text-foreground">Step 3:</strong> Choose the violation category</p>
                    <p><strong className="text-foreground">Step 4:</strong> Submit with additional information if needed</p>
                    <p><strong className="text-foreground">Resources:</strong> Facebook offers victim support resources and safety tools</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tiktok">
                <AccordionTrigger>TikTok Reporting</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">Step 1:</strong> Long press on the video or go to the profile</p>
                    <p><strong className="text-foreground">Step 2:</strong> Tap "Report"</p>
                    <p><strong className="text-foreground">Step 3:</strong> Select the reason (harassment, hate speech, etc.)</p>
                    <p><strong className="text-foreground">Step 4:</strong> Provide details and submit</p>
                    <p><strong className="text-foreground">Privacy:</strong> Use privacy settings to control who can interact with your content</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="law-enforcement">
                <AccordionTrigger>Reporting to Law Enforcement</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">When to report:</strong> Threats of violence, stalking, doxxing, revenge porn, or persistent harassment</p>
                    <p><strong className="text-foreground">What to bring:</strong> All documentation (screenshots, messages, logs), account information, and chronological timeline</p>
                    <p><strong className="text-foreground">Where to report:</strong> Local police department or FBI's Internet Crime Complaint Center (IC3)</p>
                    <p><strong className="text-foreground">Follow up:</strong> Request a case number and keep records of all communications with law enforcement</p>
                    <p><strong className="text-foreground">Support:</strong> Consider bringing a support person or advocate with you</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Legal Protections & Resources */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Legal Protections & Resources</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Understanding the legal framework around online harassment empowers you to take appropriate action and seek justice.
          </p>

          <div className="space-y-6 mb-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Federal Laws</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li><strong className="text-foreground">18 U.S.C. § 2261A:</strong> Federal cyberstalking law prohibiting online harassment with intent to harm or intimidate</li>
                  <li><strong className="text-foreground">18 U.S.C. § 875:</strong> Criminalizes interstate threats transmitted via digital communication</li>
                  <li><strong className="text-foreground">Communications Decency Act (Section 230):</strong> Platform liability protections (but with exceptions)</li>
                  <li><strong className="text-foreground">Violence Against Women Act (VAWA):</strong> Provides protections and resources for victims</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>State-Specific Protections</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="california">
                    <AccordionTrigger>California</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Strong cyberstalking and revenge porn laws. Penal Code 653.2 addresses electronic harassment. Right to have intimate images removed from websites (SB-255).
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="new-york">
                    <AccordionTrigger>New York</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Cyber harassment covered under Penal Law § 240.30. Strong revenge porn legislation. Orders of protection available for online harassment.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="texas">
                    <AccordionTrigger>Texas</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Penal Code § 42.07 covers online harassment and cyberbullying. Revenge porn prohibited under § 21.16. Cyberstalking can result in felony charges.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="florida">
                    <AccordionTrigger>Florida</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Statute 784.048 addresses cyberstalking. Strong revenge porn laws (§ 810.145). Electronic harassment is a first-degree misdemeanor.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Taking Legal Action</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Restraining Orders / Orders of Protection</h4>
                    <p>Civil orders that prohibit an individual from contacting or approaching you. Can include online contact. Violation can result in arrest.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Civil Lawsuits</h4>
                    <p>You may sue for damages related to defamation, intentional infliction of emotional distress, or invasion of privacy.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Criminal Charges</h4>
                    <p>Law enforcement can pursue criminal charges for cyberstalking, threats, harassment, or related crimes.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Finding Legal Help</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li><strong className="text-foreground">Legal Aid Organizations:</strong> Free or low-cost legal services for qualifying individuals</li>
                  <li><strong className="text-foreground">State Bar Associations:</strong> Lawyer referral services and pro bono programs</li>
                  <li><strong className="text-foreground">Victim Advocacy Groups:</strong> Organizations that provide legal support and advocacy</li>
                  <li><strong className="text-foreground">Law School Clinics:</strong> Many law schools offer free legal clinics for cybercrime victims</li>
                  <li><strong className="text-foreground">Cyber Civil Rights Initiative:</strong> Provides resources and referrals for online harassment victims</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Building Support Networks */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Building Support Networks</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Strong support networks are essential for navigating online harassment and advocating for digital rights. You don't have to face challenges alone.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-border">
              <CardHeader>
                <Heart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Online Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Women's support groups and forums</li>
                  <li>• Survivor networks and peer support</li>
                  <li>• Professional advocacy organizations</li>
                  <li>• Platform-specific safety communities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Creating Safe Spaces</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Establish clear community guidelines</li>
                  <li>• Implement moderation policies</li>
                  <li>• Use privacy-respecting platforms</li>
                  <li>• Foster inclusive environments</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Peer Support Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Active listening and validation</li>
                  <li>• Sharing resources and experiences</li>
                  <li>• Respecting boundaries and privacy</li>
                  <li>• Mutual accountability and care</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Phone className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Crisis Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• National hotlines and helplines</li>
                  <li>• Online crisis chat services</li>
                  <li>• Mental health support services</li>
                  <li>• Emergency intervention resources</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Key Organizations & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground">Cyber Civil Rights Initiative (CCRI)</h4>
                  <p>Combats online harassment and non-consensual pornography. Crisis helpline: 844-878-CCRI</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">National Network to End Domestic Violence (NNEDV)</h4>
                  <p>Safety Net project provides tech safety resources and support</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Electronic Frontier Foundation (EFF)</h4>
                  <p>Digital rights advocacy and security resources</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">National Suicide Prevention Lifeline</h4>
                  <p>24/7 crisis support: 988 or 1-800-273-8255</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">RAINN (Rape, Abuse & Incest National Network)</h4>
                  <p>Support for victims of sexual violence: 800-656-HOPE</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Course Curriculum */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Course Curriculum</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive 6-module program designed to empower your digital advocacy journey
            </p>
          </div>

          <div className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    1
                  </div>
                  <div>
                    <CardTitle>Digital Rights Assessment & Awareness</CardTitle>
                    <CardDescription>Understanding your rights and the digital landscape</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Learn about fundamental digital rights, current threats to online safety, and how to assess your digital risk profile.
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    2
                  </div>
                  <div>
                    <CardTitle>Documentation & Evidence Collection</CardTitle>
                    <CardDescription>Properly documenting online harassment</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Master techniques for capturing, storing, and organizing evidence of online harassment in legally admissible formats.
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    3
                  </div>
                  <div>
                    <CardTitle>Platform Reporting & Escalation</CardTitle>
                    <CardDescription>Navigating reporting systems effectively</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Step-by-step guides for reporting harassment on major platforms and escalating when reports are ignored.
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    4
                  </div>
                  <div>
                    <CardTitle>Legal Resources & Protections</CardTitle>
                    <CardDescription>Understanding and accessing legal support</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Navigate the legal system, understand your protections, and find pro bono legal assistance for online harassment cases.
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    5
                  </div>
                  <div>
                    <CardTitle>Advocacy Skills & Tools</CardTitle>
                    <CardDescription>Amplifying your voice safely</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Learn secure communication tools, social media strategies, and digital organizing techniques for effective advocacy.
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    6
                  </div>
                  <div>
                    <CardTitle>Community Building & Support Networks</CardTitle>
                    <CardDescription>Creating and maintaining safe communities</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Build supportive communities, connect with advocacy organizations, and create sustainable support systems.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Advocate for Your Rights?
          </h3>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join our community and learn how to navigate digital spaces safely while advocating for change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg">
              Enroll in Course
            </Button>
            <Button size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 text-white border-white/20">
              Get Support Now
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
                <li><a href="/#classes" className="hover:text-foreground transition-colors">Public Safety</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
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

export default DigitalAdvocacy;
