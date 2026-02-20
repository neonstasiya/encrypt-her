import { Shield, Mail } from "lucide-react";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";

const PrivacyPolicy = () => {
  usePageMeta();

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10" aria-labelledby="page-title">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
              <Shield className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary-foreground">Your Privacy Matters</span>
            </div>
            <h1 id="page-title" className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              EncryptHer is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="py-16 px-4" aria-labelledby="collect-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="collect-heading" className="text-3xl font-bold mb-6 text-foreground">Information We Collect</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>We collect information you voluntarily provide when you:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-foreground">Sign up for our newsletter</strong> — your email address and topic interests.</li>
                <li><strong className="text-foreground">Submit a contact form</strong> — your name, email address, and message.</li>
                <li><strong className="text-foreground">Make a donation</strong> — your name, email, and payment information (processed securely by our third-party payment provider).</li>
                <li><strong className="text-foreground">Contribute to our blog</strong> — your name, email address, chosen topic, and any story you share.</li>
                <li><strong className="text-foreground">Download safety guides</strong> — your email address.</li>
              </ul>
              <p>
                We may also automatically collect non-personal information such as browser type, device type, pages visited, and referring URLs through standard analytics tools.
              </p>
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="use-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="use-heading" className="text-3xl font-bold mb-6 text-foreground">How We Use Your Information</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Deliver our educational content, safety guides, and resources.</li>
                <li>Send newsletters and updates you have opted into.</li>
                <li>Respond to your inquiries and contact form submissions.</li>
                <li>Process donations securely.</li>
                <li>Review and publish blog contributions (with your permission).</li>
                <li>Improve our website, programs, and services.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Sharing */}
        <section className="py-16 px-4" aria-labelledby="sharing-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="sharing-heading" className="text-3xl font-bold mb-6 text-foreground">Data Sharing &amp; Third-Party Services</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                We do <strong className="text-foreground">not</strong> sell, rent, or trade your personal information to third parties.
              </p>
              <p>We may share limited information with trusted service providers who assist us in operating our website and programs, including:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Email delivery services (for newsletters and transactional emails).</li>
                <li>Payment processors (for donation processing — we never store your payment card details).</li>
                <li>Website hosting and analytics providers.</li>
              </ul>
              <p>
                These providers are contractually obligated to protect your data and use it only for the services they provide to us.
              </p>
            </div>
          </div>
        </section>

        {/* Cookies */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="cookies-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="cookies-heading" className="text-3xl font-bold mb-6 text-foreground">Cookies &amp; Analytics</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Our website may use cookies and similar technologies to enhance your browsing experience and collect anonymous usage data. These help us understand how visitors interact with our site so we can improve it.
              </p>
              <p>
                You can control cookie settings through your browser preferences. Disabling cookies may affect certain features of the website.
              </p>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="py-16 px-4" aria-labelledby="security-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="security-heading" className="text-3xl font-bold mb-6 text-foreground">Data Security</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                We implement industry-standard security measures to protect your personal information, including encryption in transit (HTTPS), secure data storage, and access controls. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="children-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="children-heading" className="text-3xl font-bold mb-6 text-foreground">Children's Privacy</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have inadvertently collected such information, we will take steps to delete it promptly.
              </p>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="py-16 px-4" aria-labelledby="rights-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="rights-heading" className="text-3xl font-bold mb-6 text-foreground">Your Rights</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-foreground">Access</strong> the personal information we hold about you.</li>
                <li><strong className="text-foreground">Correct</strong> any inaccurate or incomplete information.</li>
                <li><strong className="text-foreground">Delete</strong> your personal information, subject to legal requirements.</li>
                <li><strong className="text-foreground">Opt out</strong> of newsletter communications at any time.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:info@encrypther.org" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  info@encrypther.org
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="contact-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="contact-heading" className="text-3xl font-bold mb-6 text-foreground">Contact Us</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
              <a
                href="mailto:info@encrypther.org"
                className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded p-2"
              >
                <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>info@encrypther.org</span>
              </a>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <section className="py-8 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-sm text-muted-foreground">
              This privacy policy was last updated on <time dateTime="2026-02-19">February 19, 2026</time>.
            </p>
          </div>
        </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default PrivacyPolicy;
