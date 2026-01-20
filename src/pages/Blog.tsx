import { SafetyGuidesHeader } from "@/components/SafetyGuidesHeader";
import { Card } from "@/components/ui/card";
import { Calendar, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import encryptherLogo from "@/assets/encrypther-logo.png";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { FooterResourcesDropdown } from "@/components/FooterResourcesDropdown";
import { usePageTitle } from "@/hooks/usePageTitle";

const Blog = () => {
  usePageTitle();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <SafetyGuidesHeader />
      
      <main id="main-content" role="main" className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights on digital privacy, safety, and empowerment
            </p>
          </header>

          <Card className="p-8 md:p-12">
            <article aria-labelledby="blog-article-heading">
              <header className="mb-8 border-b border-border pb-6">
                <h2 id="blog-article-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  The Growing Crisis: How Lack of Privacy Laws Puts Everyone at Risk
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime="2025-10-13">October 13, 2025</time>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" aria-hidden="true" />
                    <span>EncryptHer Team</span>
                  </div>
                </div>
              </header>

              <div className="prose prose-lg max-w-none space-y-6 text-foreground">
                <p className="text-xl text-muted-foreground italic">
                  In an era where our entire lives are increasingly digital, the absence of comprehensive privacy laws has created a dangerous vulnerability that affects us all—but disproportionately impacts women and marginalized communities.
                </p>

                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                  <CollapsibleTrigger 
                    className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold my-6 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Read Less" : "Read More"}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-6">
                    <h3 className="text-2xl font-bold mt-8 mb-4">The Current State of Privacy Protection</h3>
                    <p>
                      While the European Union has implemented GDPR and California has enacted CCPA, the United States lacks a federal privacy law that protects all citizens uniformly. This patchwork approach leaves massive gaps in protection, creating a digital Wild West where personal data is harvested, sold, and exploited with minimal oversight.
                    </p>

                    <h3 className="text-2xl font-bold mt-8 mb-4">Why This Matters for Women's Safety</h3>
                    <p>
                      The lack of robust privacy laws has particularly severe consequences for women:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Stalking and Harassment:</strong> Location data from apps and services can be purchased by anyone, including abusive partners or stalkers, enabling real-time tracking without consent.</li>
                      <li><strong>Reproductive Privacy:</strong> Period-tracking apps, health searches, and location data from clinic visits can be accessed by third parties, potentially used against women in states with restrictive laws.</li>
                      <li><strong>Intimate Image Abuse:</strong> Weak data protection laws make it easier for private photos to be shared, sold, or used for extortion without meaningful legal recourse.</li>
                      <li><strong>Workplace Discrimination:</strong> Personal health data, including pregnancy status or medical conditions, can be inferred from digital footprints and potentially used in hiring or promotion decisions.</li>
                    </ul>

                    <h3 className="text-2xl font-bold mt-8 mb-4">The Data Broker Industry's Invisible Threat</h3>
                    <p>
                      Few people realize that data brokers—companies that collect and sell personal information—operate largely unchecked. They compile detailed profiles including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Real-time location history</li>
                      <li>Shopping habits and financial information</li>
                      <li>Health conditions and medical searches</li>
                      <li>Social connections and relationship status</li>
                      <li>Employment history and income estimates</li>
                    </ul>
                    <p>
                      This information is packaged and sold to anyone willing to pay—including domestic abusers, stalkers, and predators. The lack of privacy laws means there's little to stop this billion-dollar industry from profiting off our most intimate data.
                    </p>

                    <h3 className="text-2xl font-bold mt-8 mb-4">Real Consequences of Inadequate Protection</h3>
                    <p>
                      The impact isn't theoretical. We've seen:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Survivors of domestic violence tracked through fitness apps and smart home devices</li>
                      <li>Women targeted with harassment campaigns based on purchased personal data</li>
                      <li>Reproductive health information used for targeted advertising that reveals private medical decisions</li>
                      <li>Data breaches exposing sensitive information with minimal consequences for companies</li>
                    </ul>

                    <h3 className="text-2xl font-bold mt-8 mb-4">What Comprehensive Privacy Laws Should Include</h3>
                    <p>
                      Effective privacy legislation must address:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Explicit Consent:</strong> Companies must obtain clear, informed consent before collecting personal data</li>
                      <li><strong>Data Minimization:</strong> Organizations should only collect data essential to their services</li>
                      <li><strong>Right to Deletion:</strong> Individuals must have the power to delete their data from company databases</li>
                      <li><strong>Broker Regulation:</strong> Data brokers should be required to register, face audits, and allow individuals to opt-out</li>
                      <li><strong>Sensitive Data Protection:</strong> Extra safeguards for health, location, and biometric information</li>
                      <li><strong>Strong Enforcement:</strong> Meaningful penalties for violations that actually deter bad behavior</li>
                    </ul>

                    <h3 className="text-2xl font-bold mt-8 mb-4">Taking Action While We Wait for Legislation</h3>
                    <p>
                      Until comprehensive privacy laws are enacted, we must protect ourselves:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Review and limit app permissions on your devices</li>
                      <li>Use privacy-focused browsers and search engines</li>
                      <li>Enable encryption for messaging and calls</li>
                      <li>Regularly review privacy settings on social media</li>
                      <li>Consider using VPNs to mask your location and browsing activity</li>
                      <li>Be cautious about what personal information you share online</li>
                    </ul>

                    <h3 className="text-2xl font-bold mt-8 mb-4">The Path Forward</h3>
                    <p>
                      The lack of comprehensive privacy laws isn't just a policy failure—it's a safety crisis. As technology advances, the gaps in protection grow wider and the potential for harm increases exponentially. We need federal privacy legislation that puts people over profits and recognizes that privacy is a fundamental right, not a luxury.
                    </p>
                    <p>
                      Women, in particular, bear a disproportionate burden of this regulatory failure. But by raising awareness, demanding better protections, and taking practical steps to secure our own data, we can push for the systemic change that's long overdue.
                    </p>
                    <p className="italic text-muted-foreground mt-8">
                      At EncryptHer, we believe that every woman deserves to feel safe—both in the physical world and online. Until privacy laws catch up with technology, we're here to provide the education and tools needed to protect yourself in an increasingly digital world.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </article>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer role="contentinfo" className="py-12 px-4 border-t border-border bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-0 mb-1">
                <img src={encryptherLogo} alt="" className="h-12 w-12" aria-hidden="true" />
                <span className="font-bold text-lg text-foreground">EncryptHer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering women through digital safety education and real-world protection strategies.
              </p>
            </div>
            
            <nav aria-label="Programs navigation">
              <h2 className="font-semibold mb-4 text-foreground text-base">Programs</h2>
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li><Link to="/online-privacy" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Online Privacy</Link></li>
                <li><Link to="/travel-safety" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Travel Safety</Link></li>
                <li><Link to="/digital-advocacy" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Advocacy</Link></li>
                <li><Link to="/public-safety" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Public Safety</Link></li>
              </ul>
            </nav>
            
            <nav aria-label="Resources navigation">
              <h2 className="font-semibold mb-4 text-foreground text-base">Resources</h2>
              <ul className="space-y-2 text-sm" role="list">
                <li><FooterResourcesDropdown /></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded" aria-current="page">Blog</Link></li>
                <li><Link to="/safety-guides" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Safety Guides</Link></li>
              </ul>
            </nav>
            
            <nav aria-label="Connect navigation">
              <h2 className="font-semibold mb-4 text-foreground text-base">Connect</h2>
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li><Link to="/about" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Contact</Link></li>
                <li><Link to="/newsletter" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Newsletter</Link></li>
                <li><Link to="/donate" className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">Donate</Link></li>
              </ul>
            </nav>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 EncryptHer. All rights reserved. A nonprofit organization dedicated to women's digital and physical safety.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
