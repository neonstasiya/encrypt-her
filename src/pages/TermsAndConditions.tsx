import { FileText, Mail } from "lucide-react";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";

const TermsAndConditions = () => {
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
              <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary-foreground">Legal</span>
            </div>
            <h1 id="page-title" className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Terms &amp; Conditions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using the EncryptHer website and services.
            </p>
          </div>
        </section>

        {/* Acceptance of Terms */}
        <section className="py-16 px-4" aria-labelledby="acceptance-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="acceptance-heading" className="text-3xl font-bold mb-6 text-foreground">Acceptance of Terms</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                By accessing and using the EncryptHer website (encrypther.org), you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, please do not use our website.
              </p>
              <p>
                We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the revised terms.
              </p>
            </div>
          </div>
        </section>

        {/* Use of Content */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="content-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="content-heading" className="text-3xl font-bold mb-6 text-foreground">Use of Educational Content &amp; Resources</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                EncryptHer provides educational content, safety guides, and resources related to women's digital and physical safety. This content is intended for <strong className="text-foreground">informational and educational purposes only</strong> and should not be considered professional legal, security, or medical advice.
              </p>
              <p>
                You may access, download, and share our resources for personal, non-commercial use, provided you give appropriate credit to EncryptHer and do not modify the content without permission.
              </p>
            </div>
          </div>
        </section>

        {/* User-Submitted Content */}
        <section className="py-16 px-4" aria-labelledby="user-content-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="user-content-heading" className="text-3xl font-bold mb-6 text-foreground">User-Submitted Content</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                When you submit content to EncryptHer (such as blog contributions or stories), you grant us a non-exclusive, royalty-free license to use, edit, and publish that content on our website and related platforms.
              </p>
              <p>
                You represent that any content you submit is your own original work and does not infringe on the rights of any third party. We reserve the right to review, edit, or decline any submitted content at our discretion.
              </p>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="ip-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="ip-heading" className="text-3xl font-bold mb-6 text-foreground">Intellectual Property</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                All original content on this website — including text, graphics, logos, images, and software — is the property of EncryptHer and is protected by applicable intellectual property laws. Unauthorized reproduction, distribution, or modification of our content is prohibited.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-16 px-4" aria-labelledby="disclaimer-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="disclaimer-heading" className="text-3xl font-bold mb-6 text-foreground">Disclaimer of Warranties</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                The information provided on this website is offered "as is" without warranties of any kind, either express or implied. EncryptHer does not warrant that the website will be uninterrupted, error-free, or free of harmful components.
              </p>
              <p>
                Our educational content is <strong className="text-foreground">not a substitute for professional advice</strong>. If you are in immediate danger, please contact local emergency services. For legal, medical, or cybersecurity concerns, consult a qualified professional.
              </p>
            </div>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="liability-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="liability-heading" className="text-3xl font-bold mb-6 text-foreground">Limitation of Liability</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                To the fullest extent permitted by law, EncryptHer shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, this website or its content.
              </p>
            </div>
          </div>
        </section>

        {/* Donations */}
        <section className="py-16 px-4" aria-labelledby="donations-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="donations-heading" className="text-3xl font-bold mb-6 text-foreground">Donations</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                EncryptHer is currently awaiting 501(c)(3) nonprofit status. Tax-deductibility of donations is pending IRS approval. All donations are used to support our mission of empowering women through digital safety education and resources.
              </p>
              <p>
                Donations are voluntary and non-refundable unless otherwise required by law.
              </p>
            </div>
          </div>
        </section>

        {/* Changes to Terms */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="changes-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="changes-heading" className="text-3xl font-bold mb-6 text-foreground">Changes to These Terms</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                We may revise these Terms &amp; Conditions from time to time. When we do, we will update the "last updated" date at the bottom of this page. We encourage you to review these terms periodically.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-4" aria-labelledby="contact-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="contact-heading" className="text-3xl font-bold mb-6 text-foreground">Contact Us</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>If you have any questions about these Terms &amp; Conditions, please contact us:</p>
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
              These terms &amp; conditions were last updated on <time dateTime="2026-02-19">February 19, 2026</time>.
            </p>
          </div>
        </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default TermsAndConditions;
