import { Heart, Baby, Stethoscope, Pill, ShieldCheck, Clock, Users, HandHeart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";

const GRANT_GOAL = 1200;
const GRANT_RAISED = 0;
const GRANT_PERCENT = Math.round((GRANT_RAISED / GRANT_GOAL) * 100);

const EmergencyGrant = () => {
  usePageMeta(
    "EncryptHer Emergency Grant – HerStory Spotlight",
    "Support women and mothers in developing countries through the EncryptHer Emergency Grant. Read real stories and donate to make a direct impact."
  );

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content" role="main">
        {/* Hero */}
        <section
          className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10"
          aria-labelledby="emergency-grant-heading"
        >
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
              <HandHeart className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary-foreground">Emergency Relief</span>
            </div>
            <h1
              id="emergency-grant-heading"
              className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
            >
              EncryptHer <span className="text-primary">Emergency Grant</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Immediate support for women and mothers in developing countries facing urgent hardship.
            </p>
          </div>
        </section>

        {/* HerStory Spotlight Intro */}
        <section className="py-16 px-4" aria-labelledby="herstory-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="herstory-heading" className="text-3xl md:text-4xl font-bold mb-6 text-foreground text-center">
              HerStory Spotlight
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-4">
              The HerStory Spotlight highlights real women facing urgent challenges. Through the EncryptHer Emergency Grant, we provide direct financial support to women and mothers experiencing crisis situations.
            </p>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              Every story featured here represents a real person in need. Donations go directly toward helping the woman or family highlighted on this page.
            </p>
          </div>
        </section>

        <Separator className="max-w-4xl mx-auto" />

        {/* Why We Created This */}
        <section className="py-16 px-4" aria-labelledby="why-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="why-heading" className="text-3xl font-bold mb-6 text-foreground">
              Why We Created the EncryptHer Emergency Grant
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                EncryptHer was founded to empower and protect women through education and digital safety. While this remains our core mission, we recognize that many women and mothers around the world face urgent challenges that cannot wait.
              </p>
              <p>
                The EncryptHer Emergency Grant provides short-term financial support to women and mothers in developing countries who are facing emergency situations such as medical needs, infant care expenses, or essential living costs.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4" role="list" aria-label="Types of support provided">
                {[
                  { icon: Baby, text: "Infant formula and baby supplies" },
                  { icon: Pill, text: "Medications and medical treatment" },
                  { icon: Stethoscope, text: "Doctor visits and hospital care" },
                  { icon: Heart, text: "Essential daily necessities" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50" role="listitem">
                    <Icon className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                    <span className="text-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator className="max-w-4xl mx-auto" />

        {/* How Funded */}
        <section className="py-16 px-4 bg-muted/30" aria-labelledby="funding-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="funding-heading" className="text-3xl font-bold mb-6 text-foreground">
              How This Program Is Funded
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                The EncryptHer Emergency Grant is supported through community donations and a portion of proceeds from EncryptHer classes and programs.
              </p>
              <p>
                A percentage of class revenue is allocated to provide emergency assistance to women and mothers in developing countries.
              </p>
              <p className="font-medium text-foreground">
                Donations made through this page go directly toward the current Emergency Grant recipient and future emergency cases.
              </p>
            </div>
          </div>
        </section>

        {/* Current Spotlight: Rhea */}
        <section className="py-16 px-4" aria-labelledby="rhea-heading">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 id="rhea-heading" className="text-3xl font-bold text-foreground">
                Current Spotlight: Rhea and Her Baby
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Story */}
              <div className="md:col-span-2 space-y-4 text-lg text-muted-foreground">
                <p>
                  Rhea is a young mother in the Philippines who spends every day doing what mothers do — making sure her baby is safe, fed, and loved. For nine months, she's poured everything she has into her child. But recently, things took a turn that no parent should have to face alone.
                </p>
                <p>
                  Her baby became seriously ill with a bacterial infection. The kind of sick where you don't sleep, where you hold your child in a hospital waiting room and pray that someone can help. The doctors prescribed treatment, but the medications and hospital visits started adding up fast — far more than Rhea can afford on her own.
                </p>
                <p>
                  What makes this harder is something Rhea doesn't talk about much. Since giving birth, she's been quietly struggling with her own health. Postpartum challenges have been weighing on her — physically and emotionally — but she's been pushing through it because her baby comes first. She needs to see a doctor. She needs medication. But right now, every peso she has goes toward keeping her child alive.
                </p>
                <p>
                  No mother should have to choose between her baby's health and her own. Through the EncryptHer Emergency Grant, we're raising funds so Rhea doesn't have to make that choice. Your support means her baby gets the treatment he needs — and Rhea finally gets the care she's been putting off.
                </p>

                <Card className="border-primary/20 bg-primary/5 mt-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Funds Will Help Cover</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-foreground" role="list">
                      <li className="flex items-center gap-2">
                        <Pill className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        Baby's medical treatment and medications
                      </li>
                      <li className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        Doctor and hospital visits
                      </li>
                      <li className="flex items-center gap-2">
                        <Baby className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        Baby formula and infant supplies
                      </li>
                      <li className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        Medical care and medication for Rhea's postpartum recovery
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <p className="text-sm text-muted-foreground italic pt-4 flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  This case has been reviewed and verified by EncryptHer. Funds will be distributed directly to Rhea as part of the EncryptHer Emergency Grant program.
                </p>
              </div>

              {/* Sidebar: details + progress */}
              <div className="space-y-6">
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Grant Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium text-foreground">Philippines</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Child's Age</span>
                      <span className="font-medium text-foreground">9 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goal</span>
                      <span className="font-medium text-foreground">${GRANT_GOAL.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Raised</span>
                      <span className="font-medium text-primary">${GRANT_RAISED.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground font-medium">{GRANT_PERCENT}%</span>
                      </div>
                      <Progress
                        value={GRANT_PERCENT}
                        aria-label={`Funding progress: ${GRANT_PERCENT}% of $${GRANT_GOAL.toLocaleString()} goal reached`}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Photo placeholders */}
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Photos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div
                      className="aspect-square rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm"
                      role="img"
                      aria-label="Photo of Rhea and her baby — coming soon"
                    >
                      Photo coming soon
                    </div>
                    <div
                      className="aspect-video rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm"
                      role="img"
                      aria-label="Additional photo — coming soon"
                    >
                      Additional photo
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Separator className="max-w-4xl mx-auto" />

        {/* Zeffy Donation Embed */}
        <section className="py-16 px-4 bg-muted/30" aria-labelledby="donate-heading">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 id="donate-heading" className="text-3xl font-bold mb-4 text-foreground">
              Support This Emergency Grant
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Donations are securely processed through EncryptHer using Zeffy. All contributions support the EncryptHer Emergency Grant and are used to provide direct assistance to women and mothers in urgent need.
            </p>

            {/* Replace the src below with your actual Zeffy campaign embed URL */}
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <div className="p-12 text-center text-muted-foreground space-y-4">
                <HandHeart className="h-12 w-12 mx-auto text-primary" aria-hidden="true" />
                <p className="text-lg font-medium text-foreground">Zeffy Donation Form</p>
                <p className="text-sm">
                  Replace this placeholder with your Zeffy campaign embed. Use an iframe with your Zeffy form URL.
                </p>
                <code className="block text-xs bg-muted p-3 rounded text-left overflow-x-auto">
                  {'<iframe src="YOUR_ZEFFY_FORM_URL" width="100%" height="600" title="Donate to EncryptHer Emergency Grant"></iframe>'}
                </code>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Donations are processed by EncryptHer and distributed as emergency assistance grants.
            </p>
          </div>
        </section>

        {/* Tax Status Disclaimer */}
        <section className="py-12 px-4" aria-labelledby="tax-heading">
          <div className="container mx-auto max-w-3xl">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg" id="tax-heading">Tax Deductibility Notice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  EncryptHer is currently in the process of applying for federal tax-exempt status under Section 501(c)(3) of the Internal Revenue Code.
                </p>
                <p>
                  Donations made at this time may become tax-deductible if approval is granted retroactively, as permitted by IRS regulations.
                </p>
                <p>
                  If EncryptHer receives 501(c)(3) approval, donors will receive written documentation for their records.
                </p>
                <p>
                  Donations are voluntary and are used to support EncryptHer programs and emergency assistance initiatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Updates */}
        <section className="py-16 px-4 bg-muted/30" aria-labelledby="updates-heading">
          <div className="container mx-auto max-w-3xl">
            <h2 id="updates-heading" className="text-3xl font-bold mb-8 text-foreground">
              Grant Updates
            </h2>
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <time dateTime="2026-03-03">March 3, 2026</time>
                  </div>
                  <CardTitle className="text-lg">Campaign Launched</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The EncryptHer Emergency Grant campaign for Rhea and her baby has been launched. We are raising funds to help cover medical expenses and essential care. Thank you to everyone who shares and donates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Transparency Commitment */}
        <section className="py-12 px-4" aria-labelledby="transparency-heading">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 id="transparency-heading" className="text-2xl font-bold mb-4 text-foreground">
              Our Commitment to Transparency
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              EncryptHer is committed to responsible use of all donated funds. Updates on the Emergency Grant recipient and use of funds will be posted on this page.
            </p>
            <p className="text-sm text-muted-foreground">
              EncryptHer Emergency Grants typically range from $300–$2,000 depending on the urgency and need.
            </p>
          </div>
        </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default EmergencyGrant;
