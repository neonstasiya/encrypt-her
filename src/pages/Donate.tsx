import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import encryptherLogo from "@/assets/encrypther-logo.png";

const Donate = () => {
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
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <a href="/#classes" className="text-muted-foreground hover:text-foreground transition-colors">Classes</a>
            <a href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
          <Button>Get Started</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">Support Women's Safety</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Help Us Empower Women <span className="text-primary">Everywhere</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your donation helps us provide essential safety education and resources to women who need it most.
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Your Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every donation directly supports women's safety education and empowerment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Education Programs</CardTitle>
                <CardDescription>
                  Fund comprehensive safety courses covering online privacy, travel safety, and personal security
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Resource Development</CardTitle>
                <CardDescription>
                  Support the creation of guides, tools, and materials that help women protect themselves
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community Support</CardTitle>
                <CardDescription>
                  Build safe spaces and networks where women can learn, share, and support each other
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Donation Tiers */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Ways to Give</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">Supporter</CardTitle>
                  <div className="text-3xl font-bold text-primary">$25</div>
                  <CardDescription>Help us reach more women with essential safety resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Donate $25</Button>
                </CardContent>
              </Card>

              <Card className="border-primary border-2 hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Advocate</CardTitle>
                  <div className="text-3xl font-bold text-primary">$50</div>
                  <CardDescription>Sponsor a complete safety course for a woman in need</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Donate $50</Button>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">Champion</CardTitle>
                  <div className="text-3xl font-bold text-primary">$100</div>
                  <CardDescription>Fund comprehensive safety education and ongoing support</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Donate $100</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Custom Amount */}
          <Card className="border-border max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Custom Amount</CardTitle>
              <CardDescription>Choose any amount that works for you</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="1"
                />
              </div>
              <Button size="lg">Donate Now</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why Your Donation Matters</h2>
          </div>
          
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg">
              As a nonprofit organization, EncryptHer relies on the generosity of supporters like you to continue our mission of empowering women with essential safety knowledge and resources.
            </p>
            <p className="text-lg">
              Every woman deserves to feel safe—whether she's walking downtown, traveling abroad, creating online profiles, or simply living her daily life. Your donation helps us provide free or low-cost education to women who might not otherwise have access to this critical information.
            </p>
            <p className="text-lg">
              Together, we're building a world where women can move through digital and physical spaces with confidence, knowledge, and the tools to protect themselves.
            </p>
          </div>

          <div className="mt-12 p-8 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-center text-foreground font-semibold mb-2">
              EncryptHer is a registered nonprofit organization
            </p>
            <p className="text-center text-sm text-muted-foreground">
              All donations are tax-deductible to the extent allowed by law
            </p>
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

export default Donate;
