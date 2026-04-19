import { Link } from "react-router-dom";
import {
  Download,
  ArrowLeft,
  Search,
  KeyRound,
  ShieldCheck,
  Users,
  Globe,
  Mail,
  Smartphone,
  Wifi,
  UserX,
  ListChecks,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { SkipLink } from "@/components/SkipLink";
import { GuideDownloadGate } from "@/components/GuideDownloadGate";
import { usePageMeta } from "@/hooks/usePageMeta";

const PDF_URL = "/guides/online-privacy-starter-guide.pdf";
const PDF_FILENAME = "online-privacy-starter-guide.pdf";
const GUIDE_NAME = "Online Privacy Starter Guide";

interface Section {
  id: string;
  number: string;
  title: string;
  intro: string;
  icon: React.ElementType;
  items: { bold: string; rest: string }[];
}

const sections: Section[] = [
  {
    id: "audit",
    number: "01",
    title: "Audit your digital footprint",
    intro: "Before you can protect your data, you need to know what's already out there.",
    icon: Search,
    items: [
      { bold: "Google yourself.", rest: "Search your full name, name + city, name + employer, and common usernames. Note what shows up." },
      { bold: "Check images.", rest: "Run the same searches on Google Images. Old photos and tagged pictures often surface here." },
      { bold: "Search data broker sites.", rest: "Look up your name on Spokeo, BeenVerified, Whitepages, and Radaris." },
      { bold: "Check breach exposure.", rest: "Visit haveibeenpwned.com and enter your email addresses. Note every breach so you can change those passwords." },
    ],
  },
  {
    id: "passwords",
    number: "02",
    title: "Strong passwords & password managers",
    intro: "Reusing passwords is the single biggest risk most people have. A password manager fixes this in one step.",
    icon: KeyRound,
    items: [
      { bold: "Pick a manager.", rest: "Bitwarden (free, open source), 1Password, or Proton Pass are all solid choices." },
      { bold: "Create one strong master password.", rest: "Use a passphrase of 4–5 random words. Store it somewhere physically safe until memorized." },
      { bold: "Let the manager generate the rest.", rest: "Every site gets a unique 16+ character random password." },
      { bold: "Replace your worst passwords first.", rest: "Email, banking, and identity-linked accounts are top priority." },
    ],
  },
  {
    id: "2fa",
    number: "03",
    title: "Enable two-factor authentication (2FA)",
    intro: "Even if a password leaks, 2FA stops attackers from getting in.",
    icon: ShieldCheck,
    items: [
      { bold: "Use an authenticator app, not SMS.", rest: "Aegis, Raivo, 2FAS, or Authy. SIM-swap attacks make text-message codes risky." },
      { bold: "Enable 2FA first on:", rest: "primary email, banking, password manager, social media, and cloud storage." },
      { bold: "Save your backup codes.", rest: "Store them in your password manager or print and keep them somewhere safe." },
    ],
  },
  {
    id: "social",
    number: "04",
    title: "Lock down social media privacy",
    intro: "Default settings on social platforms are designed for visibility, not safety.",
    icon: Users,
    items: [
      { bold: "Set accounts to private", rest: "on Instagram, TikTok, Facebook, and X if you don't need a public presence." },
      { bold: "Hide your friends/follower lists.", rest: "These are commonly used to build profiles on you." },
      { bold: "Strip location data.", rest: "Turn off location tagging in posts and stories." },
      { bold: "Audit old posts.", rest: "Use platform activity logs to delete content you no longer want public." },
      { bold: "Review connected apps.", rest: "Revoke access for any app you don't actively use." },
    ],
  },
  {
    id: "browser",
    number: "05",
    title: "Secure your browser",
    intro: "Your browser is where most tracking happens. Small changes go a long way.",
    icon: Globe,
    items: [
      { bold: "Switch to a privacy-respecting browser.", rest: "Firefox or Brave block trackers by default." },
      { bold: "Install uBlock Origin.", rest: "The single most effective privacy extension you can install." },
      { bold: "Use a private search engine.", rest: "DuckDuckGo, Brave Search, or Startpage don't profile you." },
      { bold: "Clear cookies regularly,", rest: "or set your browser to clear them on close for untrusted sites." },
      { bold: "Disable third-party cookies", rest: "in your browser settings." },
    ],
  },
  {
    id: "email",
    number: "06",
    title: "Email privacy basics",
    intro: "Email is your most sensitive account — it's the recovery key to everything else.",
    icon: Mail,
    items: [
      { bold: "Use email aliases.", rest: "SimpleLogin, Firefox Relay, or Apple's Hide My Email create unique addresses for each signup." },
      { bold: "Separate accounts by purpose:", rest: "one email for banking and identity, one for shopping, one for newsletters." },
      { bold: "Be skeptical of links.", rest: "Hover before clicking. Type bank URLs by hand instead of using emailed links." },
      { bold: "Consider Proton Mail or Tutanota", rest: "for sensitive correspondence." },
    ],
  },
  {
    id: "mobile",
    number: "07",
    title: "Mobile device privacy",
    intro: "Your phone knows more about you than any other device. Tighten it up.",
    icon: Smartphone,
    items: [
      { bold: "Audit app permissions.", rest: "Revoke location, camera, microphone, and contacts access from apps that don't need them." },
      { bold: "Turn off ad tracking.", rest: "iOS: Settings → Privacy → Tracking. Android: Settings → Privacy → Ads." },
      { bold: "Disable location history", rest: "in Google and Apple Maps unless you actively use it." },
      { bold: "Use a strong device passcode", rest: "— 6+ digits or alphanumeric. Disable biometrics at borders or protests." },
      { bold: "Encrypt backups", rest: "in iCloud or on your computer." },
    ],
  },
  {
    id: "wifi",
    number: "08",
    title: "Public Wi-Fi & VPN safety",
    intro: "Open networks at airports, cafes, and hotels can expose your traffic.",
    icon: Wifi,
    items: [
      { bold: "Use a reputable VPN", rest: "on public Wi-Fi: Mullvad, Proton VPN, or IVPN are trustworthy." },
      { bold: "Avoid logging into sensitive accounts", rest: "on networks you don't control." },
      { bold: "Forget networks after use", rest: "so your device doesn't auto-reconnect to spoofed hotspots." },
      { bold: "Tether to your phone", rest: "for sensitive tasks if you're unsure about the local network." },
    ],
  },
  {
    id: "brokers",
    number: "09",
    title: "Remove yourself from data brokers",
    intro: "This is the highest-impact step for reducing stalking and harassment risk.",
    icon: UserX,
    items: [
      { bold: "Start with the big ones:", rest: "Spokeo, Whitepages, BeenVerified, Radaris, MyLife, PeopleFinder, Intelius." },
      { bold: "Each site has an opt-out page.", rest: "Search \"[site name] opt out\" — usually 2–5 minutes per site." },
      { bold: "Consider a removal service", rest: "like DeleteMe, Optery, or Kanary for ongoing removal." },
      { bold: "Re-check every 6 months.", rest: "Brokers often re-add your data from new sources." },
    ],
  },
  {
    id: "checklist",
    number: "10",
    title: "Quick checklist & next steps",
    intro: "If you do nothing else this month, do these five things:",
    icon: ListChecks,
    items: [
      { bold: "Install a password manager", rest: "and change your email password." },
      { bold: "Turn on 2FA", rest: "for email, banking, and social media." },
      { bold: "Set social accounts to private", rest: "and review connected apps." },
      { bold: "Install uBlock Origin", rest: "and switch to DuckDuckGo or Brave Search." },
      { bold: "Opt out of the top five data broker sites.", rest: "" },
    ],
  },
];

const OnlinePrivacyStarterGuide = () => {
  usePageMeta();

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content" role="main">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background border-b border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link to="/resources">
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                Back to Resources
              </Link>
            </Button>
            <Badge variant="secondary" className="mb-4">Free Guide · 10 Steps</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Online Privacy <span className="text-primary">Starter Guide</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
              Essential steps to protect your digital footprint and secure your online accounts.
              A practical 10-step playbook you can complete in a weekend.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <GuideDownloadGate
                pdfUrl={PDF_URL}
                pdfFilename={PDF_FILENAME}
                guideName={GUIDE_NAME}
              />
              <Button size="lg" variant="outline" asChild>
                <a href="#contents">Jump to contents</a>
              </Button>
            </div>
          </div>
        </section>

        {/* TOC */}
        <section id="contents" className="py-12 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">What's inside</h2>
            <ol className="grid sm:grid-cols-2 gap-3" role="list">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <span className="font-mono text-sm text-primary font-bold w-8">{s.number}</span>
                    <span className="font-medium">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            {sections.map((s) => (
              <Card key={s.id} id={s.id} className="border-l-4 border-l-primary scroll-mt-24">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <s.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-sm text-primary font-bold mb-1">STEP {s.number}</div>
                      <CardTitle className="text-2xl">{s.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-5">{s.intro}</p>
                  <ul className="space-y-3" role="list">
                    {s.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>
                          <strong className="text-foreground">{item.bold}</strong>
                          {item.rest && <span className="text-muted-foreground"> {item.rest}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Take it offline</h2>
            <p className="text-muted-foreground mb-8">
              Download the printable PDF version to keep on your devices or share with a friend who needs it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GuideDownloadGate
                pdfUrl={PDF_URL}
                pdfFilename={PDF_FILENAME}
                guideName={GUIDE_NAME}
              />
              <Button size="lg" variant="outline" asChild>
                <Link to="/resources">Browse more resources</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default OnlinePrivacyStarterGuide;
