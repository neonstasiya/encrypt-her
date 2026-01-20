import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accessibility, Mail, Phone, CheckCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageTitle } from "@/hooks/usePageTitle";

const AccessibilityStatement = () => {
  usePageTitle("Accessibility Statement | EncryptHer");
  
  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10" aria-labelledby="page-title">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
              <Accessibility className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary-foreground">Our Commitment</span>
            </div>
            <h1 id="page-title" className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Accessibility Statement
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              EncryptHer is committed to ensuring digital accessibility for people of all abilities. We continually work to improve the user experience for everyone.
            </p>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-16 px-4" aria-labelledby="commitment-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="commitment-heading" className="text-3xl font-bold mb-6 text-foreground">Our Commitment to Accessibility</h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                EncryptHer believes that the internet should be accessible to everyone. We are committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability.
              </p>
              <p>
                We strive to meet the <strong className="text-foreground">Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> standards, which define how to make web content more accessible to people with disabilities.
              </p>
              <p>
                Accessibility is an ongoing effort, and we are continuously working to improve the accessibility of our website to ensure we provide equal access to all users.
              </p>
            </div>
          </div>
        </section>

        {/* Standards Section */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="standards-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="standards-heading" className="text-3xl font-bold mb-8 text-foreground">Accessibility Standards We Follow</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                    WCAG 2.1 Level AA
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>We follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, the internationally recognized standard for web accessibility.</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                    ADA Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Our website is designed to comply with the Americans with Disabilities Act (ADA) requirements for digital accessibility.</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                    Section 508
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>We strive to meet Section 508 of the Rehabilitation Act standards for electronic and information technology.</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                    Continuous Testing
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>We regularly test our website using automated tools and manual testing to identify and fix accessibility issues.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Accessibility Features Section */}
        <section className="py-16 px-4" aria-labelledby="features-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="features-heading" className="text-3xl font-bold mb-8 text-foreground">Accessibility Features</h2>
            
            <p className="text-muted-foreground mb-6">
              Our website includes the following accessibility features:
            </p>

            <ul className="space-y-4 text-muted-foreground" role="list">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span><strong className="text-foreground">Keyboard Navigation:</strong> All functionality is accessible via keyboard, allowing users to navigate without a mouse.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span><strong className="text-foreground">Skip Links:</strong> Skip navigation links allow users to bypass repetitive content and go directly to main content.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span><strong className="text-foreground">Screen Reader Support:</strong> Our pages are structured with proper headings, landmarks, and ARIA labels for screen reader users.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span><strong className="text-foreground">Alternative Text:</strong> All meaningful images include descriptive alternative text for users who cannot see images.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span><strong className="text-foreground">Color Contrast:</strong> We ensure sufficient color contrast between text and backgrounds for readability.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span><strong className="text-foreground">Resizable Text:</strong> Text can be resized up to 200% without loss of content or functionality.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span><strong className="text-foreground">Focus Indicators:</strong> Visible focus indicators help keyboard users understand where they are on the page.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span><strong className="text-foreground">Form Labels:</strong> All form fields have associated labels to ensure they are accessible to assistive technologies.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Request Accommodations Section */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="accommodations-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="accommodations-heading" className="text-3xl font-bold mb-6 text-foreground">Request Accommodations</h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
              <p>
                We want everyone to be able to access and use our website and resources. If you experience any difficulty accessing any part of our website or need information in an alternative format, please contact us and we will work with you to provide the information you need.
              </p>
            </div>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Contact Our Accessibility Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you encounter accessibility barriers or would like to request accommodations, please reach out to us using any of the following methods:
                </p>
                
                <div className="space-y-3">
                  <a 
                    href="mailto:accessibility@encrypther.org" 
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded p-2 -ml-2"
                  >
                    <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span>accessibility@encrypther.org</span>
                  </a>
                  
                  <a 
                    href="tel:+1-555-ENCRYPT" 
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded p-2 -ml-2"
                  >
                    <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span>1-555-ENCRYPT (1-555-362-7978)</span>
                  </a>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  When contacting us, please include:
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>The web address (URL) of the content you're having difficulty with</li>
                  <li>A description of the accessibility problem you encountered</li>
                  <li>The type of assistive technology you use (if applicable)</li>
                  <li>Your preferred format for receiving information</li>
                </ul>

                <div className="pt-4">
                  <Button asChild>
                    <Link to="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Third-Party Content Section */}
        <section className="py-16 px-4" aria-labelledby="third-party-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="third-party-heading" className="text-3xl font-bold mb-6 text-foreground">Third-Party Content</h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Our website may contain links to third-party websites or embed content from external sources. While we strive to link only to accessible resources, we cannot guarantee the accessibility of third-party content.
              </p>
              <p>
                If you encounter accessibility issues with linked content, we encourage you to contact the respective website owners directly. If you would like us to provide the information in an accessible format, please contact us.
              </p>
            </div>
          </div>
        </section>

        {/* Continuous Improvement Section */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="improvement-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="improvement-heading" className="text-3xl font-bold mb-6 text-foreground">Continuous Improvement</h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Accessibility is an ongoing commitment. We regularly review our website for accessibility issues and work to resolve them promptly. Our efforts include:
              </p>
            </div>

            <ul className="mt-6 space-y-3 text-muted-foreground" role="list">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Regular automated accessibility testing using industry-standard tools</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Manual testing with screen readers and keyboard-only navigation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Training our team on accessibility best practices</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Incorporating accessibility into our development process</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Responding to user feedback and accessibility concerns</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 px-4" aria-labelledby="resources-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="resources-heading" className="text-3xl font-bold mb-6 text-foreground">Accessibility Resources</h2>
            
            <p className="text-muted-foreground mb-6">
              Learn more about web accessibility and your rights:
            </p>

            <ul className="space-y-3" role="list">
              <li>
                <a 
                  href="https://www.w3.org/WAI/standards-guidelines/wcag/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  Web Content Accessibility Guidelines (WCAG)
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ada.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  Americans with Disabilities Act (ADA)
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.section508.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  Section 508 Standards
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://webaim.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  WebAIM - Web Accessibility In Mind
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Last Updated */}
        <section className="py-8 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-sm text-muted-foreground">
              This accessibility statement was last updated on <time dateTime="2026-01-20">January 20, 2026</time>.
            </p>
          </div>
        </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default AccessibilityStatement;
