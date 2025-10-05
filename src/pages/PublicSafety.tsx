import { SafetyGuidesHeader } from "@/components/SafetyGuidesHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Eye, Shield, Heart, MapPin, Bus, Package, AlertCircle, Siren, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import publicSafetyImage from "@/assets/public-safety.jpg";
import encryptherLogo from "@/assets/encrypther-logo.png";

const PublicSafety = () => {
  return (
    <div className="min-h-screen bg-background">
      <SafetyGuidesHeader />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={publicSafetyImage} 
            alt="Woman practicing situational awareness in public" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/80 to-accent/40" />
        </div>
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">Your Safety in Every Situation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Public Safety & <span className="text-primary">Awareness</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practical strategies, tools, and techniques to stay safe and confident in public spaces and everyday situations.
          </p>
        </div>
      </section>

      {/* Situational Awareness Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Situational Awareness</h2>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Situational awareness is your first line of defense. Learning to read your environment and trust your instincts can prevent dangerous situations before they escalate.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">The OODA Loop</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">Observe:</strong> Constantly scan your surroundings</li>
                    <li><strong className="text-foreground">Orient:</strong> Process what you're seeing</li>
                    <li><strong className="text-foreground">Decide:</strong> Determine appropriate action</li>
                    <li><strong className="text-foreground">Act:</strong> Execute your decision quickly</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Trust Your Instincts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• If something feels wrong, it probably is</li>
                    <li>• Don't worry about appearing rude</li>
                    <li>• Remove yourself from uncomfortable situations</li>
                    <li>• Your safety comes first, always</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-xl">Recognizing Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Look for people watching you or following you</li>
                  <li>• Notice exits and escape routes wherever you go</li>
                  <li>• Be aware of isolated areas or blocked pathways</li>
                  <li>• Pay attention to unusual behavior patterns</li>
                  <li>• Keep your head up, not buried in your phone</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Self-Defense Basics Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Self-Defense Basics</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            While avoiding confrontation is always the best option, knowing basic self-defense techniques can give you confidence and tools to protect yourself if needed.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Verbal Defense</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Use a loud, firm voice</li>
                  <li>• Set clear boundaries</li>
                  <li>• Say "NO" forcefully</li>
                  <li>• Draw attention to yourself</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">De-escalation</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Stay calm and appear confident</li>
                  <li>• Create distance when possible</li>
                  <li>• Use your words to defuse tension</li>
                  <li>• Look for opportunities to leave</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Physical Defense</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Target vulnerable areas</li>
                  <li>• Use maximum force if needed</li>
                  <li>• Fight to escape, not to win</li>
                  <li>• Run to safety immediately</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">Legal Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Self-defense laws vary by location. Generally, you have the right to defend yourself when facing an immediate threat. However, the force used must be proportional to the threat. Always try to escape first, and only use physical defense as a last resort when you cannot safely leave the situation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Personal Safety Tools Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Personal Safety Tools & Equipment</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Having the right tools can provide an extra layer of protection. Here's what you should know about common personal safety devices.
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Pepper Spray / Mace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  One of the most effective and widely legal self-defense tools. Causes temporary blindness and intense burning sensation.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">How to use:</strong> Aim for the face, spray in a sweeping motion, then run</li>
                  <li><strong className="text-foreground">Range:</strong> Typically 8-12 feet</li>
                  <li><strong className="text-foreground">Considerations:</strong> Check expiration dates, practice with trainer spray, be aware of wind direction</li>
                  <li><strong className="text-foreground">Legal:</strong> Legal in most areas but check local laws (some states have restrictions on size/concentration)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Personal Alarms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Loud sound devices (120-140 decibels) that draw attention and startle attackers.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Benefits:</strong> Legal everywhere, no training needed, very effective</li>
                  <li><strong className="text-foreground">Types:</strong> Keychain alarms, wearable alarms, pull-pin alarms</li>
                  <li><strong className="text-foreground">Best for:</strong> Crowded areas where people can respond to the noise</li>
                  <li><strong className="text-foreground">Tip:</strong> Keep it easily accessible, test regularly</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Tactical Flashlights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  High-lumen flashlights that can temporarily blind and disorient attackers while serving multiple purposes.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Features:</strong> 500+ lumens, strobe mode, durable construction</li>
                  <li><strong className="text-foreground">Uses:</strong> Lighting dark areas, disorienting attackers, can be used as a striking tool</li>
                  <li><strong className="text-foreground">Advantages:</strong> Legal everywhere, dual-purpose, no special training needed</li>
                  <li><strong className="text-foreground">Recommended:</strong> Keep one in your car and one in your bag</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Self-Defense Keychains</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Discreet tools designed to enhance striking power and protect your hands.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Types:</strong> Kubotans, cat keychains, monkey fist, tactical pens</li>
                  <li><strong className="text-foreground">Usage:</strong> Pressure points, strikes, grip enhancement</li>
                  <li><strong className="text-foreground">Legal status:</strong> Generally legal but varies by location (some jurisdictions consider them weapons)</li>
                  <li><strong className="text-foreground">Important:</strong> Requires training to use effectively</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Stun Guns / Tasers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Electric shock devices that can temporarily incapacitate an attacker.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Effectiveness:</strong> Very effective at close range, causes muscle disruption</li>
                  <li><strong className="text-foreground">Requirements:</strong> Must make direct contact, requires close proximity</li>
                  <li><strong className="text-foreground">Legal status:</strong> <strong className="text-destructive">Restricted or illegal in many areas</strong> - check local laws carefully</li>
                  <li><strong className="text-foreground">Considerations:</strong> Requires training, battery maintenance, may not work through thick clothing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Whistles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Simple but effective attention-drawing tool.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Benefits:</strong> Extremely affordable, legal everywhere, no training needed</li>
                  <li><strong className="text-foreground">Best for:</strong> Outdoor activities, campus settings, anywhere people can respond</li>
                  <li><strong className="text-foreground">Tip:</strong> Attach to keychain or wear on lanyard</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">BB Guns / Airsoft</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-destructive">NOT RECOMMENDED for self-defense</strong> despite some online suggestions.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Problems:</strong> Insufficient stopping power, may escalate situation dangerously</li>
                  <li><strong className="text-foreground">Legal risks:</strong> May be mistaken for real firearms, creating legal liability</li>
                  <li><strong className="text-foreground">Better alternatives:</strong> Pepper spray, personal alarms, proper self-defense training</li>
                  <li><strong className="text-foreground">Note:</strong> If considering any projectile weapon, research firearms training and licensing instead</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Safety Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Modern technology for personal safety and emergency response.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Features:</strong> Location sharing, emergency contacts, automatic alerts</li>
                  <li><strong className="text-foreground">Popular options:</strong> Life360, bSafe, Noonlight, Circle of 6</li>
                  <li><strong className="text-foreground">Advantages:</strong> Free or low-cost, always with you, can alert multiple people instantly</li>
                  <li><strong className="text-foreground">Setup:</strong> Configure emergency contacts, test features, keep phone charged</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Important Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li><strong className="text-foreground">Legal research is essential:</strong> Laws vary significantly by state, county, and city. What's legal in one area may be restricted or illegal in another.</li>
                <li><strong className="text-foreground">Training matters:</strong> Having a tool is not enough. Take classes, practice regularly, and understand how to use your safety equipment effectively.</li>
                <li><strong className="text-foreground">Accessibility:</strong> Choose tools that fit your lifestyle, comfort level, and physical abilities. The best tool is one you'll actually carry and know how to use.</li>
                <li><strong className="text-foreground">Maintenance:</strong> Check expiration dates on pepper spray, replace batteries, test alarms regularly.</li>
                <li><strong className="text-foreground">De-escalation first:</strong> These tools are last resorts. Your primary goal should always be to avoid dangerous situations and escape safely.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Safe Dating Practices Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Safe Dating Practices</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Dating should be exciting, not dangerous. These practices help you stay safe while meeting new people.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Online Dating Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Don't share personal details too early</li>
                  <li>• Use the app's messaging system initially</li>
                  <li>• Video chat before meeting in person</li>
                  <li>• Research your date (reverse image search)</li>
                  <li>• Never send money or gift cards</li>
                  <li>• Trust your instincts about red flags</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">First Date Precautions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Always meet in a public place</li>
                  <li>• Provide your own transportation</li>
                  <li>• Share your location with a trusted friend</li>
                  <li>• Set up a check-in system</li>
                  <li>• Keep your phone charged</li>
                  <li>• Limit alcohol consumption</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Red Flags to Watch For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Pressuring you to meet privately</li>
                  <li>• Refusing to video chat first</li>
                  <li>• Love bombing or moving too fast</li>
                  <li>• Inconsistent stories or behavior</li>
                  <li>• Disrespecting your boundaries</li>
                  <li>• Excessive drinking or drug use</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Safety Tools for Dating</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Use location-sharing apps</li>
                  <li>• Set up emergency contacts</li>
                  <li>• Have a code word with friends</li>
                  <li>• Keep pepper spray accessible</li>
                  <li>• Save date details in multiple places</li>
                  <li>• Trust your gut and leave if uncomfortable</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Safety Resources Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Community Safety Resources</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">911:</strong> Emergency services (police, fire, medical)</li>
                  <li><strong className="text-foreground">988:</strong> Suicide & Crisis Lifeline</li>
                  <li><strong className="text-foreground">1-800-799-7233:</strong> National Domestic Violence Hotline</li>
                  <li><strong className="text-foreground">1-800-656-4673:</strong> National Sexual Assault Hotline (RAINN)</li>
                  <li><strong className="text-foreground">1-866-331-9474:</strong> National Trafficking Hotline</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Siren className="h-5 w-5" />
                  Local Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Women's shelters and safe houses</li>
                  <li>• Community self-defense classes</li>
                  <li>• Victim advocacy organizations</li>
                  <li>• Legal aid services</li>
                  <li>• Counseling and support groups</li>
                  <li>• Campus safety resources (for students)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-xl">Building a Safety Network</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Your personal safety network is crucial. This includes trusted friends, family members, neighbors, and coworkers who you can reach out to in emergencies or concerning situations.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Share your daily routine with trusted contacts</li>
                <li>• Establish check-in systems for dates or travel</li>
                <li>• Create emergency code words for different situations</li>
                <li>• Exchange contact information with neighbors</li>
                <li>• Join or create community safety groups</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Public Transportation Safety Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bus className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Public Transportation Safety</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Ride-Sharing Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Verify driver and vehicle details before getting in</li>
                  <li>• Sit in the back seat</li>
                  <li>• Share your trip details with a friend</li>
                  <li>• Keep your phone easily accessible</li>
                  <li>• Trust your instincts - cancel if uncomfortable</li>
                  <li>• Don't share personal information</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Public Transit Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Stay near the driver or in populated cars</li>
                  <li>• Avoid empty stations or platforms at night</li>
                  <li>• Keep bags close and zipped</li>
                  <li>• Stand away from platform edges</li>
                  <li>• Have your destination planned in advance</li>
                  <li>• Be aware of people around you</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Parking Lot Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Park in well-lit, visible areas</li>
                  <li>• Have your keys ready before walking to your car</li>
                  <li>• Check back seat before entering</li>
                  <li>• Lock doors immediately after getting in</li>
                  <li>• If threatened, honk horn and attract attention</li>
                  <li>• Trust your instincts - ask for escort if needed</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Walking Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Stay in well-lit, populated areas</li>
                  <li>• Walk confidently and purposefully</li>
                  <li>• Avoid distractions (phones, headphones)</li>
                  <li>• Vary your routine and routes</li>
                  <li>• Walk facing traffic when possible</li>
                  <li>• Have safety tools easily accessible</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What should I do if I'm being followed?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  First, trust your instincts. Do not go home. Instead, head to a well-lit, populated area like a store, restaurant, or police station. Call 911 if you feel threatened. Make four right or left turns to confirm you're being followed. Use your phone to call someone and let them know where you are. Consider entering a business and asking staff to call police.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Is pepper spray legal everywhere?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Pepper spray is legal in all 50 states, but regulations vary. Some states restrict the size, concentration, or where you can carry it. Massachusetts and New York have stricter regulations requiring permits or purchases through licensed dealers. Always check your local laws. Even where legal, pepper spray is typically prohibited in schools, government buildings, and on airplanes.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Should I take a self-defense class?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Absolutely! Self-defense classes provide practical skills, build confidence, and help you react effectively under stress. Look for classes specifically designed for women, such as Krav Maga, Brazilian Jiu-Jitsu, or programs like RAD (Rape Aggression Defense). Many community centers, gyms, and police departments offer free or low-cost classes. Regular practice is important to maintain skills.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What are the most important safety apps?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Essential safety apps include: Life360 for location sharing with family and friends; Noonlight which alerts emergency services when you release a button; bSafe with features like fake calls and location tracking; Citizen for real-time crime alerts in your area; and SafeTrek/Life360's emergency response features. Configure emergency contacts in all apps and test them to ensure they work when needed.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How can I stay safe while traveling alone?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Research your destination thoroughly before traveling. Share your itinerary with trusted contacts. Use accommodation booking sites with verified reviews. Keep copies of important documents separate from originals. Use hotel safes for valuables. Avoid displaying expensive items. Learn basic local phrases including how to ask for help. Trust your instincts about situations and people. Have emergency contacts saved in your phone including local emergency numbers, your country's embassy, and trusted contacts back home.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>What should be in my safety kit?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  A comprehensive personal safety kit should include: pepper spray or personal alarm, tactical flashlight, charged power bank, emergency contact card, small first aid kit, whistle, personal safety app on your phone, and some cash. Keep a kit in your car with additional items like a phone charger, water, emergency blanket, and basic tools. Regularly check and update your kit, especially expiration dates on pepper spray.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Stay Informed & Protected
          </h3>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join our newsletter for safety tips, resources, and updates on personal protection strategies.
          </p>
          <Link to="/newsletter">
            <Button size="lg" variant="secondary" className="text-lg">
              Subscribe to Newsletter
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-0 mb-1">
                <img src={encryptherLogo} alt="EncryptHer logo" className="h-12 w-12" />
                <span className="font-bold text-lg text-foreground">EncryptHer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering women through digital safety education and real-world protection strategies.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Programs</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/online-privacy" className="hover:text-foreground transition-colors">Online Privacy</Link></li>
                <li><Link to="/travel-safety" className="hover:text-foreground transition-colors">Travel Safety</Link></li>
                <li><Link to="/digital-advocacy" className="hover:text-foreground transition-colors">Advocacy</Link></li>
                <li><Link to="/public-safety" className="hover:text-foreground transition-colors">Public Safety</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><Link to="/safety-guides" className="hover:text-foreground transition-colors">Safety Guides</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><Link to="/newsletter" className="hover:text-foreground transition-colors">Newsletter</Link></li>
                <li><Link to="/donate" className="hover:text-foreground transition-colors">Donate</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 EncryptHer. All rights reserved. A nonprofit organization dedicated to women's safety in the digital and physical world.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicSafety;