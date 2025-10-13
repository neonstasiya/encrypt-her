import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Users, BookOpen, AlertCircle, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import encryptherLogo from "@/assets/encrypther-logo.png";
import founderPhoto from "@/assets/founder-photo.png";
const About = () => {
  return <div className="min-h-screen bg-background">
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
                <Link to="/about" className="text-lg text-muted-foreground hover:text-foreground transition-colors">About</Link>
                <a href="/#classes" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Classes</a>
                <a href="/#contact" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                <Link to="/donate" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Donate</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">About EncryptHer</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Born from personal experience, built for women's empowerment
            </p>
          </div>
          
          {/* Founder's Story */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Founder Photo */}
            <div className="flex justify-center">
              <img src={founderPhoto} alt="EncryptHer Founder" className="w-64 h-64 rounded-2xl object-cover border-2 border-border shadow-lg" />
            </div>
            
            {/* Story & Mission */}
            <div className="space-y-6">
              <div>
                
                
              </div>
              
              <div className="border-l-4 border-primary pl-6 py-2">
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Our Mission</h3>
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
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Advocacy</CardTitle>
                  <CardDescription>
                    Fighting for women's digital rights and privacy protection through education and awareness
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <AlertCircle className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Awareness</CardTitle>
                  <CardDescription>
                    Raising consciousness about both digital threats and physical safety concerns women face daily
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>
                    Providing practical skills and actionable knowledge for digital safety and real-world protection
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
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
                <li><a href="/#classes" className="hover:text-foreground transition-colors">Advocacy</a></li>
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
    </div>;
};
export default About;