import { useMemo, useState } from "react";
import { Shield, AlertTriangle, Plane, Luggage } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageTitle } from "@/hooks/usePageTitle";

type StateLaw = {
  state: string;
  statute?: string;
  status: string;
  restrictions: string[];
};

const LAWS: StateLaw[] = [
  { state: "Alabama", statute: "Alabama Code § 13A-6-27", status: "Legal for self-defense use by individuals aged 18+.", restrictions: ["Use strictly limited to lawful self-defense.", "Criminal misuse (during a crime or against on-duty officers) is a Class C felony (§ 13A-6-27(a)-(b)).", "No state-level limits on size or OC strength."] },
  { state: "Arizona", statute: "ARS § 13-3101.7", status: "Legal for self-defense for individuals 18+ who have not been convicted of a felony.", restrictions: ["Self-defense use only. Misuse (including during a crime or against law enforcement) is prohibited.", "No state-level limits on size or OC strength; not classified as a prohibited weapon."] },
  { state: "Arkansas", statute: "Arkansas Code § 5-73-124", status: "Legal for self-defense for individuals 18+.", restrictions: ["Possession/use limited to lawful self-defense; otherwise can be a Class A misdemeanor.", "Size limit: container may not exceed 300 mL (~10.1 oz) (§ 5-73-124(a)(2)(B))."] },
  { state: "California", statute: "California Penal Code § 22810", status: "Legal for self-defense for individuals 18+ who are not convicted felons or narcotics addicts (§ 22810(a)–(b)).", restrictions: ["Self-defense use only; misuse (including against peace officers) is punishable (§ 22810(g)(1)–(2)).", "Minors under 18 are prohibited (§ 22810(c)–(d)).", "Size/packaging: container ≤ 2.5 oz net weight aerosol; required warnings, expiration, instructions, first-aid (§ 22810(e)–(f))."] },
  { state: "Colorado", status: "Legal for civilians 18+; no permit required.", restrictions: ["Self-defense use only; misuse may constitute assault (see § 18-1-704 and related statutes).", "POWPO and age/felony status may affect possession.", "No specific limits on size or OC strength in statute."] },
  { state: "Connecticut", statute: "CT Code § 53a-19", status: "Legal for self-defense for individuals 18+.", restrictions: ["Use must be justified self-defense; misuse can lead to assault charges (§ 53a-19; § 53a-3).", "No statutory limits on size or concentration at the state level."] },
  { state: "Delaware", statute: "11 Del. C. § 222(7)", status: "Disabling chemical sprays (including OC) are legal for defensive use.", restrictions: ["Self-defense only; misuse addressed with felony-level penalties (§ 222(7)–(8)).", "No state-level size/strength limits specified."] },
  { state: "District of Columbia", statute: "D.C. Code § 7-2502.13", status: "Legal for 18+ or 14+ with parent/guardian consent.", restrictions: ["Self-defense use only.", "Must be aerosol-propelled and labeled with expiration/usage instructions (§ 7-2502.13(a)-(b)); certain types prohibited (§ 7-2502.12–13(b))."] },
  { state: "Florida", statute: "Fla. Stat. § 790.001", status: "Recognized as “self-defense chemical spray”; adults 18+ may carry openly or concealed without a permit (§ 790.001(2)(b)).", restrictions: ["Self-defense use only; misuse against law enforcement or during crimes is a felony (§ 790.054).", "Size: compact personal spray (≤ 2 oz) (§ 790.001(3)(b))."] },
  { state: "Georgia", statute: "O.C.G.A. § 16-11-127.1", status: "Legal for self-defense for individuals 18+; not considered a firearm.", restrictions: ["Self-defense use only.", "Prohibited in school safety zones and at school functions (§ 16-11-127.1).", "No size/concentration statute."] },
  { state: "Hawaii", statute: "HRS § 703-304; Honolulu Code § 41-37.3", status: "Legal statewide for lawful self-defense.", restrictions: ["Honolulu County: ≤ 2 oz; requires safety mechanisms; sales licensing; no sales to minors or in alcohol-serving venues (§ 41-37.3, § 41-37.4).", "No general statewide size/concentration limits beyond local rules."] },
  { state: "Idaho", statute: "Idaho Code § 18-3302", status: "Legal self-defense device for individuals 18+; not a “deadly weapon” when carried lawfully.", restrictions: ["No state limits on container size or concentration; no license required."] },
  { state: "Illinois", statute: "720 ILCS 5/24-1(a)(3)(C)", status: "Legal for self-defense for persons 18+ without disqualifying convictions.", restrictions: ["Expressly permitted as a non-lethal noxious liquid/gas; misuse can trigger other offenses.", "Chicago: prohibited use in enclosed spaces with 20+ people (misdemeanor)."] },
  { state: "Indiana", statute: "IC Title 35, Ch. 47", status: "Legal for self-defense; no statewide restriction on possession/use.", restrictions: ["Prohibited only when used unlawfully; not classified as a weapon unless misused."] },
  { state: "Iowa", statute: "Iowa Code § 702.7", status: "Legal for personal defense; specifically authorized non-lethal sprays.", restrictions: ["No statutory size/concentration caps; justified self-defense required (Ch. 704).", "Local ordinances may vary."] },
  { state: "Kansas", statute: "K.S.A. § 21-5422", status: "Legal for self-defense purposes.", restrictions: ["Not classified as a weapon when used appropriately; no state size/concentration caps."] },
  { state: "Kentucky", statute: "KRS § 527.010", status: "Legal for self-defense; not listed as a regulated weapon.", restrictions: ["Misuse can constitute assault; no state size/concentration limits."] },
  { state: "Louisiana", statute: "La. R.S. § 14:22", status: "Legal for lawful self-defense.", restrictions: ["Reasonable force standard; offensive use can be charged; no size/strength caps in code."] },
  { state: "Maine", statute: "17 M.R.S. § 1002", status: "Legal for self-defense.", restrictions: ["Misuse is a Class D crime; defensive use permitted; no statutory size/strength caps."] },
  { state: "Massachusetts", statute: "M.G.L. c.140 § 122C–D", status: "Legal for 18+ (classified as “self-defense spray”).", restrictions: ["Must be purchased from a licensed firearms dealer (§ 122C).", "Under 18 requires permit; unauthorized sale/possession carries fines/penalties (§ 122D).", "No statutory size/concentration caps."] },
  { state: "Michigan", statute: "MCL § 750.226e", status: "Legal for 18+ for lawful self-defense.", restrictions: ["Misuse prohibited under assault statutes; no explicit container size/OC caps specified."] },
  { state: "Minnesota", statute: "Minn. Stat. § 299C.50", status: "Legal for 18+ for self-defense.", restrictions: ["Justified self-defense only; schools restrict except emergencies; no size/strength caps in statute."] },
  { state: "Mississippi", statute: "Miss. Code § 97-37-1", status: "Legal for personal self-defense (no age limit stated in statute).", restrictions: ["Misuse may lead to charges; no state size/concentration limits."] },
  { state: "Missouri", statute: "Mo. Rev. Stat. § 563.031", status: "Legal for 18+ for self-defense.", restrictions: ["Misuse can breach assault statutes; not considered a firearm; no size/strength caps specified."] },
  { state: "Montana", statute: "Mont. Code § 45-8-322", status: "Legal for self-defense (no age restriction stated here).", restrictions: ["Justified self-defense only; selling/providing to minors may be restricted by other laws; no state size/strength caps."] },
  { state: "Nebraska", statute: "Neb. Rev. Stat. § 28-1409", status: "Legal for self-defense.", restrictions: ["Use permitted only in lawful self-defense; no statutory size/strength caps."] },
  { state: "Nevada", statute: "NRS § 193.302; § 202.370", status: "Legal for 18+ for self-defense.", restrictions: ["Size: aerosol sprays must not exceed 2 fl oz (~59 mL) per § 202.370.", "Misuse may result in assault/battery charges."] },
  { state: "New Hampshire", statute: "RSA § 159:20; § 159:23", status: "Legal with no permit required.", restrictions: ["Self-defense only; misuse can be prosecuted; no state size/strength caps."] },
  { state: "New Jersey", statute: "N.J.S.A. § 2C:39-6i", status: "Legal for self-defense for 18+ without disqualifying convictions.", restrictions: ["Volume: only one container ≤ 0.75 oz (~21 mL) permitted."] },
  { state: "New Mexico", statute: "N.M. Stat. § 30-1-12; § 30-7-2", status: "Legal for self-defense; no license required.", restrictions: ["Use must be justified; no state size/strength caps."] },
  { state: "New York", statute: "Penal Law § 270.05; § 265.20", status: "Legal when used for lawful self-defense and properly labeled/manufactured as OC spray.", restrictions: ["Unlawful possession/sale prohibited (§ 270.05); legitimate self-defense use exempted (§ 265.20).", "Additional NYC/venue rules; purchase/sales channel restrictions apply."] },
  { state: "North Carolina", statute: "G.S. § 14-401.6", status: "Legal for 18+ not convicted of felonies.", restrictions: ["Self-defense only; misuse is a Class 2 misdemeanor.", "Size: spray containers ≤ 150 cc (~5 oz); cartridges ≤ 50 cc."] },
  { state: "North Dakota", status: "Legal for self-defense.", restrictions: ["Self-defense only; no state size/strength caps."] },
  { state: "Ohio", status: "Legal for personal self-defense; generally not considered a weapon.", restrictions: ["Self-defense use only; no state size/strength caps."] },
  { state: "Oklahoma", status: "Legal for adult self-defense; no explicit statewide ban/limit.", restrictions: ["Self-defense only; misuse (e.g., against officers) prosecutable; no size/strength caps in statute."] },
  { state: "Oregon", statute: "ORS § 163.212–213", status: "Legal for self-defense; no licensing required.", restrictions: ["Reckless discharge is a Class A misdemeanor; discharge against protected classes (e.g., on-duty LEO) is a Class C felony.", "No size/strength caps in statute."] },
  { state: "Pennsylvania", statute: "18 Pa.C.S. § 908.1", status: "Legal for self-defense; excluded from “weapon” definition.", restrictions: ["Justified self-defense only; no state size/strength caps."] },
  { state: "Rhode Island", statute: "R.I. Gen. Laws § 11-47-57", status: "Legal for 18+ for self-protection.", restrictions: ["Self-defense only; unauthorized use punishable by fine up to $25; no state size/strength caps specified."] },
  { state: "South Carolina", statute: "S.C. Code § 16-23-470", status: "Legal for 18+ for protective purposes.", restrictions: ["Size: containers must not exceed 50 cc (~1.7 oz)."] },
  { state: "South Dakota", statute: "SDCL § 13-39A-43; § 22-18-4.8", status: "Legal for self-defense; available without permit.", restrictions: ["Must align with justified self-defense; prohibited on school grounds; no state size/strength caps."] },
  { state: "Tennessee", statute: "T.C.A. § 39-17-1309; 2024 Laken Riley Act", status: "Pepper spray, mace, and similar devices are legal; public colleges cannot prohibit adult self-defense items.", restrictions: ["Self-defense only; misuse punishable under general statutes; no size/strength caps in statute."] },
  { state: "Texas", statute: "Texas Penal Code § 46.05", status: "Legal for 18+ for self-defense; not a firearm; may be carried concealed or openly without a license.", restrictions: ["Self-defense only; restricted zones apply (e.g., courthouses, schools, airports) (§ 46.03; § 46.05); no state size/strength caps."] },
  { state: "Utah", statute: "Utah Code § 76-2-402", status: "Legal; no state-level prohibitions against civilian possession.", restrictions: ["Use must align with justified self-defense; no state size/strength caps specified."] },
  { state: "Vermont", status: "Generally legal for self-defense; no statewide restriction or licensing requirement.", restrictions: ["Self-defense only; no statutory size/strength caps."] },
  { state: "Virginia", statute: "Va. Code § 18.2-312", status: "Legal for self-defense; permits broadly allowed when used to protect life or property; public colleges cannot prohibit adult self-defense items.", restrictions: ["Malicious/unlawful deployment is a Class 6 felony; injury elevates to Class 3 felony; no size/strength caps in statute."] },
  { state: "Washington", statute: "RCW § 9.91.160", status: "Legal for 18+; 14–17 with parental consent.", restrictions: ["Municipalities may not prohibit lawful adult possession; no statewide size/strength caps."] },
  { state: "West Virginia", statute: "W. Va. Code § 61-7-2", status: "Defined as a temporarily disabling aerosol for lawful self-defense.", restrictions: ["Municipalities may restrict possession in certain public facilities; on Capitol Complex grounds, canisters over 1 oz are prohibited; no general size/strength caps elsewhere."] },
  { state: "Wisconsin", statute: "2013 Wis. Act 77", status: "Legal for self-defense; regulated standards for OC products and consumer safety.", restrictions: ["Purchasers 18+; must not be camouflaged/mispackaged; labeling requirements apply.", "OC concentration capped at 10%; total content and performance parameters specified by Act 77."] },
  { state: "Wyoming", status: "Legal for civilian self-defense; not explicitly restricted by state law.", restrictions: ["General criminal statutes apply to misuse; no statewide caps on size or OC concentration."] },
];

const PepperSprayLaws = () => {
  usePageTitle("Pepper Spray Laws by State");
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LAWS.filter((l) => {
      if (stateFilter !== "all" && l.state !== stateFilter) return false;
      if (!q) return true;
      return (
        l.state.toLowerCase().includes(q) ||
        l.status.toLowerCase().includes(q) ||
        l.restrictions.join(" ").toLowerCase().includes(q) ||
        (l.statute?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [query, stateFilter]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content" className="flex-1 container mx-auto max-w-5xl px-4 py-12">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-8 w-8 text-primary" aria-hidden="true" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Pepper Spray Laws by State
            </h1>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            A clear, state-by-state overview of where pepper spray is legal, what
            restrictions apply, and how to carry safely within the law. Pepper spray
            is permitted in all 50 states, but limits on canister size, OC strength,
            age, and sales channels vary. Always check your local regulations.
          </p>

          <div
            role="note"
            className="mt-4 flex gap-3 rounded-md border border-border bg-card p-4 text-sm text-muted-foreground"
          >
            <AlertTriangle className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p>
              <strong className="text-foreground">Educational purposes only.</strong>{" "}
              This information is not legal advice. Laws change — verify current
              statutes with your state or a licensed attorney before purchasing or
              carrying any defense spray.
            </p>
          </div>
        </header>

        <section aria-labelledby="travel-heading" className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Plane className="h-7 w-7 text-primary" aria-hidden="true" />
            <h2 id="travel-heading" className="text-2xl md:text-3xl font-bold text-foreground">
              Airline &amp; Travel Restrictions
            </h2>
          </div>
          <p className="text-muted-foreground max-w-3xl mb-5">
            Pepper spray is tightly regulated when you fly. Federal rules generally allow it in checked baggage only,
            with size and safety-cap requirements, but it is never allowed in carry-on bags. Individual airlines may add
            their own conditions, so confirm with your carrier before departure.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Luggage className="h-5 w-5 text-primary" aria-hidden="true" />
                  TSA Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Carry-on:</strong> Not permitted.
                </p>
                <p>
                  <strong className="text-foreground">Checked baggage:</strong> One container up to 4 fl. oz. (118 mL)
                  is allowed if it has a safety mechanism to prevent accidental discharge.
                </p>
                <p>
                  Sprays containing more than 2% by mass of tear gas (CS or CN) are prohibited in checked baggage.
                </p>
                <p className="pt-2">
                  <a
                    href="https://www.tsa.gov/travel/security-screening/whatcanibring/items/pepper-spray"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    TSA: What Can I Bring? — Pepper Spray
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Major Airline Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="https://www.aa.com/web/i18n/travel-info/baggage/restricted-items.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      American Airlines — Restricted Items
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.delta.com/us/en/baggage/prohibited-or-restricted-items/overview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      Delta Air Lines — Prohibited or Restricted Items
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.united.com/en/us/fly/baggage/dangerous-items.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      United Airlines — Dangerous Items
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.southwest.com/helpcenter/s/article/Self-defense-sprays"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      Southwest Airlines — Self-Defense Sprays
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div
            role="note"
            className="flex gap-3 rounded-md border border-border bg-card p-4 text-sm text-muted-foreground"
          >
            <AlertTriangle className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p>
              <strong className="text-foreground">International travel:</strong> Pepper spray rules vary widely
              outside the U.S. Some countries prohibit import or possession entirely. Check destination and transit
              country regulations before packing it in any luggage.
            </p>
          </div>
        </section>

        <section aria-labelledby="state-laws-heading" className="mb-6">
          <h2 id="state-laws-heading" className="sr-only">
            State Laws
          </h2>
          <Input
            type="search"
            placeholder="Search by state, statute, or keyword…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search pepper spray laws"
          />
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger aria-label="Filter by state">
              <SelectValue placeholder="All states" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All states</SelectItem>
              {LAWS.map((l) => (
                <SelectItem key={l.state} value={l.state}>
                  {l.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        <p className="text-sm text-muted-foreground mb-4" aria-live="polite">
          Showing {filtered.length} of {LAWS.length} states
        </p>

        <ul className="grid gap-4" role="list">
          {filtered.map((law) => (
            <li key={law.state}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {law.state}
                    {law.statute && (
                      <span className="block text-sm font-normal text-muted-foreground mt-1">
                        {law.statute}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">Legal status: </span>
                    <span className="text-muted-foreground">{law.status}</span>
                  </p>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      Restrictions
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {law.restrictions.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs text-muted-foreground">
          Summaries adapted from publicly available statutory references. Last
          reviewed: April 2026.
        </p>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default PepperSprayLaws;
