import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, AlertCircle } from "lucide-react";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageTitle } from "@/hooks/usePageTitle";

const About = () => {
  usePageTitle();
  
  return <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />

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

      <AccessibleFooter />
    </div>;
};
export default About;