import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, AlertCircle } from "lucide-react";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";
import { usePageContent, PageContent } from "@/hooks/usePageContent";

// Default content fallbacks
const defaultContent = {
  header: {
    title: "About EncryptHer",
    tagline: "Born from personal experience, built for women's empowerment",
  },
  mission: {
    title: "Our Mission",
    paragraph1: "In a world where personal data has become a form of currency, EncryptHer exists to help women reclaim their digital power. We teach women how to protect themselves online and offline — from removing personal information off the internet, to building real-world situational awareness and digital confidence.",
    paragraph2: "Founded by cybersecurity analyst Anastasiya, EncryptHer bridges the gap between cybersecurity education, personal safety, and empowerment. We're here to make sure no woman ever feels exposed, unprotected, or powerless in the digital age.",
    paragraph3: "Our mission is to empower women through cybersecurity education, privacy awareness, and practical safety training — giving every woman the tools to protect her identity, her reputation, and her life.",
    paragraph4: "We provide digital privacy training, cyber safety workshops, and real-world safety skills through partnerships with law enforcement and security experts. We also build a supportive community of tech-savvy women who share knowledge, resources, and confidence to navigate today's digital world.",
    paragraph5: "Every day, women are targeted online — from harassment and stalking to scams and doxxing. EncryptHer exists to turn fear into skill, vulnerability into confidence, and silence into empowerment.",
    paragraph6: "Knowledge is protection, and protection is power. Together, we're creating a world where women don't just survive the digital landscape — they dominate it.",
  },
  values: {
    title: "Our Core Values",
    advocacy: "Fighting for women's digital rights and privacy protection through education and awareness",
    awareness: "Raising consciousness about both digital threats and physical safety concerns women face daily",
    education: "Providing practical skills and actionable knowledge for digital safety and real-world protection",
  },
};

const About = () => {
  usePageMeta();
  const { data: content } = usePageContent("about");
  
  // Helper to get content with fallback
  const getContent = (section: keyof typeof defaultContent, field: string): string => {
    const sectionContent = content?.[section] as PageContent | undefined;
    const value = sectionContent?.[field] as string | undefined;
    return value || (defaultContent[section] as Record<string, string>)[field];
  };
  
  return <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />

      {/* Main Content */}
      <main id="main-content" role="main">
        {/* About Section */}
        <section className="py-20 px-4" aria-labelledby="about-heading">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 id="about-heading" className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                {getContent("header", "title")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {getContent("header", "tagline")}
              </p>
            </div>
            
            {/* Founder's Story */}
            <div className="flex justify-center mb-16">
              {/* Story & Mission */}
              <div className="space-y-6 max-w-3xl">
                <div className="border-l-4 border-primary pl-6 py-2">
                  <h2 className="text-2xl font-semibold mb-3 text-foreground">
                    {getContent("mission", "title")}
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
                    <p>{getContent("mission", "paragraph1")}</p>
                    <p>{getContent("mission", "paragraph2")}</p>
                    <p>{getContent("mission", "paragraph3")}</p>
                    <p>{getContent("mission", "paragraph4")}</p>
                    <p>{getContent("mission", "paragraph5")}</p>
                    <p>{getContent("mission", "paragraph6")}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Core Values */}
            <section aria-labelledby="values-heading">
              <h2 id="values-heading" className="text-3xl font-bold text-center mb-8 text-foreground">
                {getContent("values", "title")}
              </h2>
              <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Core values">
                <Card className="border-border hover:shadow-lg transition-shadow" role="listitem">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4" aria-hidden="true">
                      <Users className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle>Advocacy</CardTitle>
                    <CardDescription>
                      {getContent("values", "advocacy")}
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
                      {getContent("values", "awareness")}
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
                      {getContent("values", "education")}
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
