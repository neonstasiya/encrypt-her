import { Heart, Baby, Stethoscope, Pill, ShieldCheck, Clock, Users, HandHeart, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const GRANT_GOAL = 1200;
const GRANT_RAISED = 0;
const GRANT_PERCENT = Math.round((GRANT_RAISED / GRANT_GOAL) * 100);

const RedGrant = ({ text = "EncryptHer Emergency Grant" }: { text?: string }) => (
  <span className="text-destructive font-semibold">{text}</span>
);

const EmergencyGrant = () => {
  usePageMeta(
    "EncryptHer Emergency Grant – HerStory Spotlight",
    "Support women and mothers in developing countries through the EncryptHer Emergency Grant. Read real stories and donate to make a direct impact."
  );

  const { data: grantMedia = [] } = useQuery({
    queryKey: ["emergency-grant-media-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("emergency_grant_media")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

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
              EncryptHer <span className="text-destructive">Emergency Grant</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Immediate support for women and mothers in developing countries facing urgent hardship.
            </p>
            <a
              href="#about-program"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Learn about this program
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
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
                  Rhea is a young mother in the Philippines who has spent the last nine months doing everything in her power to protect her child. But today, she is facing a crisis that no parent should have to navigate alone.
                </p>
                <p>
                  Her baby has been hospitalized with severe pneumonia, a bacterial infection that requires urgent — and expensive — medical intervention. As the bills for medications and hospital stays climb, Rhea is being forced into a heartbreaking position. She is also battling severe postpartum depression, a condition that requires professional care and antidepressants she simply cannot afford.
                </p>
                <p>
                  Right now, every peso Rhea has is going toward her son's survival, leaving her own health in a dangerous decline. At the <RedGrant />, we believe a mother shouldn't have to choose between her baby's life and her own mental health. Your support will provide the life-saving treatment her baby needs and the psychiatric care Rhea urgently requires to be the mother she wants to be.
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
                  This case has been reviewed and verified by EncryptHer. Funds will be distributed directly to Rhea as part of the <RedGrant text="EncryptHer Emergency Grant program" />.
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

                {/* Photos & Videos */}
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Photos &amp; Videos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {grantMedia.length === 0 ? (
                      <div
                        className="aspect-square rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm"
                        role="img"
                        aria-label="Photo coming soon"
                      >
                        Photo coming soon
                      </div>
                    ) : (
                      grantMedia.map((item) =>
                        item.media_type === "video" ? (
                          <div key={item.id} className="space-y-1">
                            <video
                              src={item.file_url}
                              controls
                              className="w-full rounded-lg"
                              aria-label={item.caption || "Grant video"}
                            />
                            {item.caption && (
                              <p className="text-xs text-muted-foreground">{item.caption}</p>
                            )}
                          </div>
                        ) : (
                          <div key={item.id} className="space-y-1">
                            <img
                              src={item.file_url}
                              alt={item.caption || "Grant photo"}
                              className="w-full rounded-lg object-cover"
                              loading="lazy"
                            />
                            {item.caption && (
                              <p className="text-xs text-muted-foreground">{item.caption}</p>
                            )}
                          </div>
                        )
                      )
                    )}
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
              Donations are securely processed through EncryptHer using Zeffy. All contributions support the <RedGrant /> and are used to provide direct assistance to women and mothers in urgent need.
            </p>

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
                <p>EncryptHer is currently in the process of applying for federal tax-exempt status under Section 501(c)(3) of the Internal Revenue Code.</p>
                <p>Donations made at this time may become tax-deductible if approval is granted retroactively, as permitted by IRS regulations.</p>
                <p>If EncryptHer receives 501(c)(3) approval, donors will receive written documentation for their records.</p>
                <p>Donations are voluntary and are used to support EncryptHer programs and emergency assistance initiatives.</p>
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
                    The <RedGrant /> campaign for Rhea and her baby has been launched. We are raising funds to help cover medical expenses and essential care. Thank you to everyone who shares and donates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="max-w-4xl mx-auto" />

        {/* About This Program */}
        <section className="py-16 px-4" id="about-program" aria-labelledby="about-program-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="about-program-heading" className="text-3xl font-bold mb-6 text-foreground">
              About This Program
            </h2>

            <div className="space-y-8">
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  The <strong className="text-foreground">HerStory Spotlight</strong> highlights real women facing urgent challenges. Each story represents a real person in need — donations go directly toward helping the woman or family featured on this page.
                </p>
                <p>
                  EncryptHer was founded to empower and protect women through education and digital safety. The <RedGrant /> extends that mission by providing short-term financial support to women and mothers in developing countries facing emergency situations — medical needs, infant care, or essential living costs.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4" role="list" aria-label="Types of support provided">
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

              <div className="space-y-3 text-lg text-muted-foreground border-t border-border pt-8">
                <h3 className="text-xl font-semibold text-foreground">How This Program Is Funded</h3>
                <p>
                  The Emergency Grant is supported through community donations and a portion of proceeds from EncryptHer classes and programs. Donations made through this page go directly toward the current recipient and future emergency cases.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency Commitment */}
        <section className="py-12 px-4 bg-muted/30" aria-labelledby="transparency-heading">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 id="transparency-heading" className="text-2xl font-bold mb-4 text-foreground">
              Our Commitment to Transparency
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              EncryptHer is committed to responsible use of all donated funds. Updates on the Emergency Grant recipient and use of funds will be posted on this page.
            </p>
            <p className="text-sm text-muted-foreground">
              <RedGrant text="EncryptHer Emergency Grants" /> typically range from $300–$2,000 depending on the urgency and need.
            </p>
          </div>
        </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default EmergencyGrant;
