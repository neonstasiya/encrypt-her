import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, BookOpen, Users } from "lucide-react";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useId } from "react";

const Donate = () => {
  usePageMeta();
  const formId = useId();

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />

      {/* Main Content */}
      <main id="main-content" role="main">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10" aria-labelledby="donate-heading">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
              <Heart className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary-foreground">Support Women's Safety</span>
            </div>
            <h1 id="donate-heading" className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Help Us Empower Women <span className="text-primary">Everywhere</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your donation helps us provide essential safety education and resources to women who need it most.
            </p>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 px-4" aria-labelledby="impact-heading">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 id="impact-heading" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Your Impact</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every donation directly supports women's safety education and empowerment
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16" role="list" aria-label="Impact areas">
              <Card className="border-border" role="listitem">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4" aria-hidden="true">
                    <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle>Education Programs</CardTitle>
                  <CardDescription>
                    Fund comprehensive safety courses covering online privacy, travel safety, and personal security
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border" role="listitem">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4" aria-hidden="true">
                    <Shield className="h-6 w-6 text-accent" aria-hidden="true" />
                  </div>
                  <CardTitle>Resource Development</CardTitle>
                  <CardDescription>
                    Support the creation of guides, tools, and materials that help women protect themselves
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border" role="listitem">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4" aria-hidden="true">
                    <Users className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle>Community Support</CardTitle>
                  <CardDescription>
                    Build safe spaces and networks where women can learn, share, and support each other
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Donation Tiers */}
            <section aria-labelledby="ways-to-give-heading" className="mb-12">
              <h3 id="ways-to-give-heading" className="text-2xl font-bold text-center mb-8 text-foreground">Ways to Give</h3>
              <div className="grid md:grid-cols-3 gap-6" role="list" aria-label="Donation options">
                <Card className="border-border hover:shadow-lg transition-shadow" role="listitem">
                  <CardHeader>
                    <CardTitle className="text-2xl">Supporter</CardTitle>
                    <div className="text-3xl font-bold text-primary">$25</div>
                    <CardDescription>Help us reach more women with essential safety resources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" aria-label="Donate 25 dollars as a Supporter">Donate $25</Button>
                  </CardContent>
                </Card>

                <Card className="border-primary border-2 hover:shadow-lg transition-shadow relative overflow-hidden" role="listitem">
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">Advocate</CardTitle>
                    <div className="text-3xl font-bold text-primary">$50</div>
                    <CardDescription>Sponsor a complete safety course for a woman in need</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" aria-label="Donate 50 dollars as an Advocate - most popular option">Donate $50</Button>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-lg transition-shadow" role="listitem">
                  <CardHeader>
                    <CardTitle className="text-2xl">Champion</CardTitle>
                    <div className="text-3xl font-bold text-primary">$100</div>
                    <CardDescription>Fund comprehensive safety education and ongoing support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" aria-label="Donate 100 dollars as a Champion">Donate $100</Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Custom Amount */}
            <Card className="border-border max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle>Custom Amount</CardTitle>
                <CardDescription>Choose any amount that works for you</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex-1">
                  <label htmlFor={`${formId}-custom-amount`} className="sr-only">Enter custom donation amount in dollars</label>
                  <input
                    id={`${formId}-custom-amount`}
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1"
                    aria-describedby={`${formId}-custom-help`}
                  />
                  <span id={`${formId}-custom-help`} className="sr-only">Enter any dollar amount you wish to donate</span>
                </div>
                <Button size="lg">Donate Now</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Donate Section */}
        <section className="py-20 px-4 bg-muted/50" aria-labelledby="why-donate-heading">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 id="why-donate-heading" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why Your Donation Matters</h2>
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
                EncryptHer is a nonprofit organization
              </p>
              <p className="text-center text-sm text-muted-foreground">
                We are currently awaiting 501(c)(3) status from the IRS. Once approved, donations will be tax-deductible to the extent allowed by law.
              </p>
            </div>
          </div>
        </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default Donate;
