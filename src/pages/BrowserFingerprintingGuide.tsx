import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Fingerprint,
  Eye,
  ShieldCheck,
  FlaskConical,
  Wrench,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";

const GUIDE_URL = "https://encrypther.org/guides/browser-fingerprinting";

interface Section {
  id: string;
  number: string;
  title: string;
  icon: React.ElementType;
}

const sections: Section[] = [
  { id: "what", number: "01", title: "What is browser fingerprinting?", icon: Fingerprint },
  { id: "how", number: "02", title: "How sites fingerprint you", icon: Eye },
  { id: "why", number: "03", title: "Why it matters for women's safety", icon: ShieldCheck },
  { id: "test", number: "04", title: "Test your own fingerprint", icon: FlaskConical },
  { id: "fix", number: "05", title: "Mitigation playbook", icon: Wrench },
  { id: "mistakes", number: "06", title: "Common mistakes", icon: AlertTriangle },
  { id: "faq", number: "07", title: "FAQ", icon: HelpCircle },
];

const fingerprintSignals = [
  { name: "Canvas & WebGL rendering", detail: "Subtle pixel-level differences in how your GPU renders text and 3D shapes." },
  { name: "Audio context", detail: "Your sound stack processes test tones with a unique numerical signature." },
  { name: "Installed fonts", detail: "The list of fonts your OS exposes narrows you down quickly." },
  { name: "Screen size, color depth, devicePixelRatio", detail: "Combined with window size, this is highly identifying." },
  { name: "User-Agent, languages, timezone", detail: "Browser, OS, regional settings — easy to read, hard to forge cleanly." },
  { name: "Hardware concurrency & device memory", detail: "Number of CPU cores and approximate RAM your browser reports." },
  { name: "WebRTC local IP leak", detail: "WebRTC can reveal your real IP even behind a VPN if not blocked." },
  { name: "Battery, sensors, media devices", detail: "Battery level, accelerometer, and audio/video device IDs add bits of entropy." },
];

const mitigations = [
  {
    title: "Use a hardened browser",
    detail:
      "Tor Browser and Mullvad Browser are designed so every user looks identical. Brave (Shields set to Strict) and LibreWolf are strong everyday alternatives. Plain Chrome with no extensions is the easiest to fingerprint.",
  },
  {
    title: "Turn on resistFingerprinting in Firefox",
    detail:
      'Open about:config, search for privacy.resistFingerprinting and set it to true. This standardizes screen size, timezone, fonts, and canvas output. Expect some sites to break minor features.',
  },
  {
    title: "Block third-party trackers",
    detail:
      "Install uBlock Origin (Firefox or Brave) and enable EasyPrivacy. Trackers that never load can't fingerprint you. Privacy Badger is a solid companion that learns over time.",
  },
  {
    title: "Stop WebRTC IP leaks",
    detail:
      "In Firefox, set media.peerconnection.enabled to false in about:config if you don't use video calls in-browser. Brave has a built-in WebRTC IP handling setting under Privacy & security.",
  },
  {
    title: "Use a trustworthy VPN — and know its limits",
    detail:
      "A VPN hides your IP but does nothing about canvas, fonts, or WebGL. Mullvad, Proton VPN, and IVPN are reputable. Pair a VPN with a hardened browser; don't rely on it alone.",
  },
  {
    title: "Disable JavaScript on untrusted sites",
    detail:
      "Most fingerprinting needs JavaScript. NoScript (Firefox/Tor) or uBlock Origin in advanced mode lets you allow scripts only where you need them.",
  },
  {
    title: "Be careful with extensions",
    detail:
      "Every extra extension makes your browser more unique. Stick to a small, well-known set (uBlock Origin, a password manager, and maybe Privacy Badger). Skip themes and 'privacy' extensions you can't vet.",
  },
  {
    title: "On mobile",
    detail:
      "On iOS, enable Lockdown Mode for high-risk situations and use Safari with cross-site tracking prevention on. On Android, Firefox with uBlock Origin or the DuckDuckGo browser are strong defaults. Tor Browser is also available on Android.",
  },
];

const faqs = [
  {
    q: "Can I be fingerprinted in incognito or private mode?",
    a: "Yes. Private mode only stops your browser from saving history and cookies locally. Your canvas, fonts, screen size, and other signals are still readable to sites you visit.",
  },
  {
    q: "Does clearing cookies stop fingerprinting?",
    a: "No. Fingerprinting was designed specifically to identify you without cookies. Clearing cookies helps with regular tracking, but a fingerprint follows you across sessions.",
  },
  {
    q: "Will a VPN make me anonymous?",
    a: "Not by itself. A VPN changes your IP address, which matters, but doesn't change the dozens of other signals that make up your fingerprint. Combine a VPN with a hardened browser.",
  },
  {
    q: "Is Tor Browser overkill for everyday use?",
    a: "It can be slow and breaks some sites, but it's the strongest anti-fingerprinting option that exists. Many people keep it installed for sensitive tasks (research, account recovery, anything involving an abuser) and use Brave or Firefox the rest of the time.",
  },
  {
    q: "I'm a journalist / activist / survivor — what should I do first?",
    a: "Install Tor Browser or Mullvad Browser for high-stakes browsing, lock down your everyday browser with uBlock Origin and resistFingerprinting, and pair both with a reputable VPN. If you suspect targeted surveillance, contact a digital safety organization before changing accounts.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Browser Fingerprinting: How to Protect Your Online Identity",
  description:
    "A plain-language guide to browser fingerprinting — what it is, how sites use it to track you, and step-by-step ways to defend against it.",
  author: { "@type": "Organization", name: "EncryptHer" },
  publisher: {
    "@type": "Organization",
    name: "EncryptHer",
    logo: { "@type": "ImageObject", url: "https://encrypther.org/favicon.png" },
  },
  mainEntityOfPage: GUIDE_URL,
};

const BrowserFingerprintingGuide = () => {
  usePageMeta(
    "Browser Fingerprinting Guide — Protect Your Privacy | EncryptHer",
    "Learn how browser fingerprinting tracks you across the web and the practical, ranked steps you can take to defend against it.",
    { ogType: "article", jsonLd }
  );

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
            <Badge variant="secondary" className="mb-4">Free Guide · 7 Sections</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Browser <span className="text-primary">Fingerprinting</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
              Websites can identify you without cookies, without logging in, and across sessions —
              just by looking at how your browser renders the web. Here's how that works, and
              exactly what to do about it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a href="#fix">Jump to the playbook</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contents">See what's inside</a>
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

        {/* Body */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-10">
            {/* 01 What */}
            <Card id="what" className="border-l-4 border-l-primary scroll-mt-24">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Fingerprint className="h-6 w-6 text-primary" aria-hidden="true" />
                  <span className="font-mono text-sm text-primary font-bold">01</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl">What is browser fingerprinting?</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground space-y-4 leading-relaxed">
                <p>
                  Browser fingerprinting is a tracking technique that builds a near-unique ID for
                  your device by combining dozens of small details your browser reveals — things
                  like your screen size, installed fonts, time zone, graphics card quirks, and the
                  way your audio stack rounds numbers.
                </p>
                <p>
                  Unlike cookies, fingerprints aren't stored on your machine, so you can't delete
                  them. Sites and ad networks regenerate them every visit. Studies by the Electronic
                  Frontier Foundation have shown that the typical browser is unique among hundreds
                  of thousands — enough to follow you across sites you've never logged into.
                </p>
              </CardContent>
            </Card>

            {/* 02 How */}
            <Card id="how" className="border-l-4 border-l-primary scroll-mt-24">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="h-6 w-6 text-primary" aria-hidden="true" />
                  <span className="font-mono text-sm text-primary font-bold">02</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl">How sites fingerprint you</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground leading-relaxed">
                <p className="mb-4">
                  No single signal identifies you — it's the combination that's nearly unique. The
                  most common signals:
                </p>
                <ul className="space-y-3" role="list">
                  {fingerprintSignals.map((s) => (
                    <li key={s.name} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                      <span>
                        <strong className="text-foreground">{s.name}.</strong>{" "}
                        <span className="text-muted-foreground">{s.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 03 Why */}
            <Card id="why" className="border-l-4 border-l-primary scroll-mt-24">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
                  <span className="font-mono text-sm text-primary font-bold">03</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl">Why it matters for women's safety</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground space-y-4 leading-relaxed">
                <p>
                  Fingerprinting isn't only an ad-tech problem. It's a tool that can be used to
                  re-identify someone who is trying to stay anonymous — a survivor researching a
                  shelter, a journalist reaching out to a source, an activist using a burner account.
                </p>
                <p>
                  Data brokers stitch fingerprints to identities they already have on file from
                  loyalty programs, public records, and breached datasets. The result is a profile
                  that follows you across devices and sessions, even when you've cleared cookies,
                  changed accounts, or opened a private window.
                </p>
                <p>
                  Reducing your fingerprint isn't about hiding — it's about making sure the people
                  who shouldn't be able to track you, can't.
                </p>
              </CardContent>
            </Card>

            {/* 04 Test */}
            <Card id="test" className="border-l-4 border-l-primary scroll-mt-24">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FlaskConical className="h-6 w-6 text-primary" aria-hidden="true" />
                  <span className="font-mono text-sm text-primary font-bold">04</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl">Test your own fingerprint</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground space-y-4 leading-relaxed">
                <p>
                  Two free tools show you what trackers see when you visit a page. Run them once now
                  and again after you've made changes from the playbook below:
                </p>
                <ul className="space-y-3" role="list">
                  <li>
                    <a
                      href="https://coveryourtracks.eff.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary underline underline-offset-2 hover:no-underline focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
                    >
                      EFF's Cover Your Tracks
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>{" "}
                    <span className="text-muted-foreground">— measures uniqueness and explains each signal.</span>
                  </li>
                  <li>
                    <a
                      href="https://amiunique.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary underline underline-offset-2 hover:no-underline focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
                    >
                      amiunique.org
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>{" "}
                    <span className="text-muted-foreground">— compares your fingerprint to a research database.</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  Both sites are reputable, ad-free, and run by privacy researchers.
                </p>
              </CardContent>
            </Card>

            {/* 05 Fix */}
            <Card id="fix" className="border-l-4 border-l-primary scroll-mt-24">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Wrench className="h-6 w-6 text-primary" aria-hidden="true" />
                  <span className="font-mono text-sm text-primary font-bold">05</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl">Mitigation playbook</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground leading-relaxed">
                <p className="mb-6">
                  Ranked from highest impact to lowest. Doing the first two does more than doing all
                  the rest.
                </p>
                <ol className="space-y-5" role="list">
                  {mitigations.map((m, i) => (
                    <li key={m.title} className="flex gap-4">
                      <span className="font-mono text-sm text-primary font-bold flex-shrink-0 w-8 pt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{m.title}</h3>
                        <p className="text-muted-foreground">{m.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* 06 Mistakes */}
            <Card id="mistakes" className="border-l-4 border-l-destructive scroll-mt-24">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
                  <span className="font-mono text-sm text-destructive font-bold">06</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl">Common mistakes</CardTitle>
              </CardHeader>
              <CardContent className="text-foreground space-y-4 leading-relaxed">
                <p>
                  <strong>Installing every privacy extension you can find.</strong> Each extra
                  extension adds entropy. Three well-chosen extensions are better than ten.
                </p>
                <p>
                  <strong>Setting a custom User-Agent string.</strong> A rare User-Agent makes you
                  more identifiable, not less. Leave it on the browser's default.
                </p>
                <p>
                  <strong>Mixing identities in the same browser profile.</strong> Logging into a
                  pseudonymous account in the same window where you're logged into your real one
                  links the two. Use separate browser profiles, or Tor Browser for the sensitive
                  identity.
                </p>
                <p>
                  <strong>Trusting "private" mode alone.</strong> It hides history from people who
                  share your device. It does almost nothing against fingerprinting.
                </p>
              </CardContent>
            </Card>

            {/* 07 FAQ */}
            <Card id="faq" className="border-l-4 border-l-primary scroll-mt-24">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <HelpCircle className="h-6 w-6 text-primary" aria-hidden="true" />
                  <span className="font-mono text-sm text-primary font-bold">07</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl">Frequently asked</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Keep going</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Fingerprinting is one layer. Pair this guide with our 10-step starter guide and the
                EncryptHer newsletter for new safety resources as they're published.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/guides/online-privacy-starter">Read the Privacy Starter Guide</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/newsletter">Join the newsletter</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default BrowserFingerprintingGuide;
