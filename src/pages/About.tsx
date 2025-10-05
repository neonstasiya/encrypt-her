import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import encryptherLogo from "@/assets/encrypther-logo.png";

const About = () => {
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
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/about" className="text-foreground font-medium">About</Link>
            <a href="/#classes" className="text-muted-foreground hover:text-foreground transition-colors">Classes</a>
            <a href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
          <Button>Get Started</Button>
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
            {/* Photo Placeholder */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-border">
                <div className="text-center text-muted-foreground">
                  <Users className="h-16 w-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Founder Photo</p>
                  <p className="text-xs">(To be added)</p>
                </div>
              </div>
            </div>
            
            {/* Story & Mission */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Why EncryptHer Exists</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    As a cybersecurity professional, I understand the technical side of digital safety. But as a single woman who has experienced stalking after dates, harassment while walking downtown, and the constant vigilance required to feel safe in public spaces, I understand something even more important—the urgent need for comprehensive safety education.
                  </p>
                  <p>
                    After one too many unsettling experiences, I realized that too many women lack access to the knowledge and resources that could protect them. We're told to "be careful," but rarely given the practical tools to actually defend ourselves in our increasingly connected world.
                  </p>
                </div>
              </div>
              
              <div className="border-l-4 border-primary pl-6 py-2">
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  EncryptHer was born from this reality—a platform dedicated to empowering women with the tools, knowledge, and confidence to defend themselves in every aspect of their lives. Whether you're traveling solo, buying your first home, creating social media profiles, navigating the dating world, or simply walking downtown, we provide comprehensive safety resources tailored to your needs. Because every woman deserves to move through the world—both online and offline—with confidence, security, and peace of mind.
                </p>
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
                <li><a href="/#classes" className="hover:text-foreground transition-colors">Online Privacy</a></li>
                <li><a href="/#classes" className="hover:text-foreground transition-colors">Travel Safety</a></li>
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
                <li><a href="#" className="hover:text-foreground transition-colors">Donate</a></li>
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

export default About;
