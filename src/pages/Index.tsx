import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Plane, Users, BookOpen, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import heroImage from "@/assets/hero-privacy.jpg";
import encryptherLogo from "@/assets/encrypther-logo.png";
import privacyPaperImage from "@/assets/privacy-paper.jpg";
import travelLuggageImage from "@/assets/travel-luggage.jpg";
import advocacyImage from "@/assets/advocacy.jpg";
import streetAwarenessImage from "@/assets/street-awareness.jpg";
const Index = () => {
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-px">
          <div className="flex items-center gap-0">
            <img src={encryptherLogo} alt="EncryptHer logo" className="h-28 w-28 object-cover -mr-2" />
            <h1 className="text-2xl font-bold text-foreground">EncryptHer</h1>
          </div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="#what-we-do" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2">What We Do</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground bg-transparent text-base">Programs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[200px] p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/online-privacy" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none mb-1">Online Privacy</div>
                          <p className="text-xs leading-snug text-muted-foreground line-clamp-2">
                            Digital security & privacy
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/public-safety" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none mb-1">Public Safety</div>
                          <p className="text-xs leading-snug text-muted-foreground line-clamp-2">
                            Awareness & protection
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/travel-safety" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none mb-1">Travel Safety</div>
                          <p className="text-xs leading-snug text-muted-foreground line-clamp-2">
                            Safe travel practices
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/digital-advocacy" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2">Advocate</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link to="/donate">
            <Button>Donate</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Woman working securely on laptop with digital privacy" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/80 to-accent/40" />
        </div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">Empowering Women Through Digital Safety</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Your Safety, Your Privacy, <span className="text-primary">Your Power</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            EncryptHer provides essential education on online privacy, personal safety, and digital advocacy for women worldwide.
          </p>
            <div className="flex justify-center">
              <a href="#courses"><Button size="lg" className="text-lg">Get Empowered</Button></a>
            </div>
        </div>
      </section>

      {/* What We Do Overview Section */}
      <section id="what-we-do" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What We Do</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              EncryptHer empowers women through comprehensive educational courses and active advocacy for digital rights and privacy legislation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Educational Courses</CardTitle>
                <CardDescription>
                  Comprehensive courses covering online privacy, travel safety, and public awareness—designed to protect and empower you in the digital and physical world.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Advocacy Work</CardTitle>
                <CardDescription>
                  Active advocacy for comprehensive federal privacy legislation and stronger data protection laws to safeguard women's digital rights across America.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Courses Section */}
      <section id="courses" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Learn It</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive courses designed to protect and empower you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/online-privacy" className="block">
              <Card className="border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img src={privacyPaperImage} alt="Woman covering her face with paper representing online privacy protection" className="w-full h-full object-cover object-[center_99%]" />
                </div>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Online Privacy & Security</CardTitle>
                  <CardDescription>
                    🛡️ 1 in 3 women experience online harassment — we're here to change that.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learn to protect your digital footprint, secure your accounts, and maintain privacy online.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/public-safety" className="block">
              <Card className="border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img src={streetAwarenessImage} alt="Woman practicing situational awareness in public urban space" className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Public Safety & Awareness</CardTitle>
                  <CardDescription>
                    💪 Research shows awareness and education can reduce women's risk of violence by up to 50%.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our programs turn fear into preparedness — giving women the tools, training, and confidence to stay safe wherever they go.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/travel-safety" className="block">
              <Card className="border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img src={travelLuggageImage} alt="Confident woman traveler with luggage practicing safe travel habits" className="w-full h-full object-cover object-[center_99%]" />
                </div>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Plane className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Travel Safety</CardTitle>
                  <CardDescription>
                    ✈️ 1 in 4 female travelers say they've felt unsafe or threatened when traveling alone.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our workshops teach women how to identify danger before it starts — from rideshare red flags to hotel security checks.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Digital Advocacy Section */}
      <section id="advocacy" className="py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Digital Advocacy</h3>
            <p className="text-lg text-muted-foreground">
              Beyond education, we're taking action to protect women's digital rights through legislative advocacy and policy reform.
            </p>
          </div>

          <Link to="/digital-advocacy" className="block">
            <Card className="border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-64 overflow-hidden">
                <img src={advocacyImage} alt="Diverse group of women learning about digital advocacy and rights" className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent-foreground">Initiative</span>
                </div>
                <CardTitle className="text-2xl">Join Our Advocacy Movement</CardTitle>
                <CardDescription className="text-base">
                  Your medical records, home address, and even dating app data can be sold legally — because the U.S. still has no national privacy law protecting you. Source: Electronic Frontier Foundation (<a href="https://www.eff.org/deeplinks/2025/08/data-brokers-are-ignoring-privacy-law-we-deserve-better" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">link</a>)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Join us in advocating for comprehensive privacy legislation and stronger data protection laws in America. Together, we can fight for the digital rights and privacy protections women deserve.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Take Control?
          </h3>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of women who have strengthened their safety and privacy through our programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg">
              Enroll Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 text-white border-white/20" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card">
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
    </div>;
};
export default Index;