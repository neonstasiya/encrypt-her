import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Plane, Users, BookOpen, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-privacy.jpg";
import encryptherLogo from "@/assets/encrypther-logo.png";
import onlineSecurityImage from "@/assets/online-security.jpg";
import travelSafetyImage from "@/assets/travel-safety.jpg";
import advocacyImage from "@/assets/advocacy.jpg";
import publicSafetyImage from "@/assets/public-safety.jpg";
const Index = () => {
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-px">
          <div className="flex items-center gap-0">
            <img src={encryptherLogo} alt="EncryptHer logo" className="h-24 w-24" />
            <h1 className="text-2xl font-bold text-foreground">EncryptHer</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <a href="#classes" className="text-muted-foreground hover:text-foreground transition-colors">Classes</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
          <Button>Get Started</Button>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">Explore Classes</Button>
            <Button size="lg" variant="outline" className="text-lg">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="classes" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Classes</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive courses designed to protect and empower you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/online-privacy" className="block">
              <Card className="border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img src={onlineSecurityImage} alt="Woman using digital security tools and password management" className="w-full h-full object-cover object-[center_50%]" />
                </div>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Online Privacy & Security</CardTitle>
                  <CardDescription>
                    Learn to protect your digital footprint, secure your accounts, and maintain privacy online
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Password management & encryption</li>
                    <li>• Social media privacy settings</li>
                    <li>• VPNs and secure browsing</li>
                    <li>• Recognizing online threats</li>
                    <li>• Removing personal data from data brokers</li>
                    <li>• Hiding your digital footprint & online presence</li>
                    <li>• Deleting old accounts and profiles</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link to="/travel-safety" className="block">
              <Card className="border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img src={travelSafetyImage} alt="Confident woman traveler in airport with safe travel practices" className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Plane className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Travel Safety</CardTitle>
                  <CardDescription>
                    Essential safety strategies for traveling and navigating public spaces with confidence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Personal security awareness</li>
                    <li>• Safe travel planning</li>
                    <li>• Emergency response strategies</li>
                    <li>• Cultural awareness & adaptation</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link to="/digital-advocacy" className="block">
              <Card className="border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img src={advocacyImage} alt="Diverse group of women learning about digital advocacy and rights" className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Digital Advocacy</CardTitle>
                  <CardDescription>
                    Join us in advocating for comprehensive privacy legislation and stronger data protection laws in America
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Legislative advocacy for federal privacy laws</li>
                    <li>• Coalition building with privacy organizations</li>
                    <li>• Resources to contact your representatives</li>
                    <li>• Fighting for comprehensive data protection</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Card className="border-border overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img src={publicSafetyImage} alt="Woman practicing situational awareness in public urban space" className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Public Safety & Awareness</CardTitle>
                <CardDescription>
                  Practical strategies for staying safe in public and everyday situations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Situational awareness techniques</li>
                  <li>• Self-defense basics</li>
                  <li>• Safe dating practices</li>
                  <li>• Community safety resources</li>
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
            Ready to Take Control?
          </h3>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of women who have strengthened their safety and privacy through our programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg">
              Enroll Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 text-white border-white/20">
              Contact Us
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
            <p>© 2025 EncryptHer. All rights reserved. A nonprofit organization dedicated to women's digital and physical world.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;