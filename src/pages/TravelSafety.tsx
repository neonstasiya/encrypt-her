import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Camera, Radio, Eye, Shield, AlertTriangle, CheckCircle, MapPin, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import travelSafetyImage from "@/assets/travel-safety.jpg";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageTitle } from "@/hooks/usePageTitle";

const TravelSafety = () => {
  usePageTitle("Travel Safety & Security | EncryptHer");
  
  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content">

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={travelSafetyImage} alt="Travel safety and security" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/90 to-accent/40" />
        </div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">Travel Safety & Security</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Travel with <span className="text-primary">Confidence & Privacy</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn essential techniques to detect hidden cameras, identify tracking devices, and protect your privacy while traveling anywhere in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">Enroll in Course</Button>
            <Button size="lg" variant="outline" className="text-lg">Travel Safety Guide</Button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What You'll Learn</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive training to ensure your safety and privacy while traveling
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Detect Hidden Cameras</CardTitle>
                <CardDescription>
                  Learn professional techniques to scan hotel rooms and Airbnbs for hidden surveillance devices
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Radio className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Identify Tracking Devices</CardTitle>
                <CardDescription>
                  Discover how to find GPS trackers, AirTags, and other tracking devices on your belongings
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Privacy Screen Protection</CardTitle>
                <CardDescription>
                  Master the use of privacy screens and other tools to prevent visual eavesdropping
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Secure Communication</CardTitle>
                <CardDescription>
                  Learn to communicate securely using public Wi-Fi and avoid network-based attacks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Device Security</CardTitle>
                <CardDescription>
                  Protect your devices from physical and digital threats while on the road
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Situational Awareness</CardTitle>
                <CardDescription>
                  Develop essential skills to recognize and avoid potential security threats
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Hidden Camera Detection Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Scanning for Hidden Cameras</h2>
            <p className="text-lg text-muted-foreground">
              Professional techniques to ensure your privacy in hotel rooms and rental properties
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
            <p className="text-lg">
              Hidden cameras have become increasingly small and difficult to detect. They can be disguised as everyday objects like smoke detectors, alarm clocks, USB chargers, and even picture frames. Our course teaches you systematic approaches to detect these devices.
            </p>
          </div>

          <Card className="border-border mb-8">
            <CardHeader>
              <CardTitle>Visual Inspection Techniques</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Check smoke detectors, clocks, and electronic devices for unusual features</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Look for small holes or reflective surfaces in unexpected places</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Inspect mirrors for two-way glass using the fingernail test</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Examine air vents, wall decorations, and power outlets</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Check behind picture frames, shelves, and furniture</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Detection Tools & Methods</CardTitle>
              <CardDescription>
                Equipment and techniques used by security professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>RF Detectors:</strong> Identify wireless cameras transmitting signals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Lens Detectors:</strong> Use infrared light to spot camera lenses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Smartphone Apps:</strong> Network scanning to find connected devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Flashlight Method:</strong> Shine light at angles to detect camera lenses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Physical Inspection:</strong> Checking for unusual wiring or modifications</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tracking Devices Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Detecting Tracking Devices</h2>
            <p className="text-lg text-muted-foreground">
              Protect yourself from unwanted surveillance and stalking
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="gps-trackers" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                GPS Trackers & Vehicle Tracking
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  GPS trackers can be hidden in vehicles, luggage, or personal belongings. Learn to identify and remove them:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Common hiding spots in vehicles (wheel wells, undercarriage, bumpers)</li>
                  <li>• Visual inspection techniques for rental cars and your own vehicle</li>
                  <li>• Using GPS tracker detectors and RF scanners</li>
                  <li>• Checking luggage, bags, and personal items for hidden trackers</li>
                  <li>• What to do if you find a tracking device</li>
                  <li>• Legal considerations when dealing with trackers</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="airtags" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                AirTags & Bluetooth Trackers
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  Apple AirTags and similar Bluetooth trackers are increasingly used for unwanted surveillance:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• How AirTags and Tile trackers work</li>
                  <li>• Using your iPhone or Android to detect unknown AirTags</li>
                  <li>• Manual searching techniques for physical trackers</li>
                  <li>• Common hiding spots in bags, clothing, and vehicles</li>
                  <li>• Steps to take if you're being tracked</li>
                  <li>• Disabling or removing trackers safely</li>
                  <li>• Reporting stalking and tracking to authorities</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="detection-tools" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Detection Tools & Equipment
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pt-2">
                <p>
                  Professional and consumer-grade tools to help detect tracking devices:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>RF Signal Detectors:</strong> Identify wireless transmissions</li>
                  <li>• <strong>Bug Sweeping Devices:</strong> Comprehensive multi-frequency scanners</li>
                  <li>• <strong>Smartphone Apps:</strong> Bluetooth and network scanning applications</li>
                  <li>• <strong>Visual Aids:</strong> Borescopes and inspection mirrors</li>
                  <li>• <strong>Metal Detectors:</strong> Finding hidden devices in luggage or vehicles</li>
                </ul>
                <p className="mt-3">
                  Our course includes recommendations for reliable equipment at various price points.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Privacy Screens & Additional Measures Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Privacy Screens & Visual Security</h2>
            <p className="text-lg text-muted-foreground">
              Prevent visual eavesdropping and shoulder surfing
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Privacy Screen Protection</CardTitle>
                <CardDescription>
                  Essential tools to protect your screen from prying eyes
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  Privacy screens use micro-louver technology to limit viewing angles, making your screen visible only to you while appearing black to anyone viewing from the side.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Choosing the right privacy screen for laptops, tablets, and phones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Installation and maintenance best practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>When and where to use privacy screens (planes, cafes, hotels)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Privacy screen effectiveness and limitations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Situational Awareness Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Position yourself with your back to a wall in public spaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Be aware of your surroundings when entering sensitive information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Use screen brightness and anti-glare settings appropriately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Minimize zoom and font size to reduce visibility distance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Lock your devices immediately when not in use</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Safety Topics Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Essential Travel Safety Topics</h2>
            <p className="text-lg text-muted-foreground">
              Additional security measures covered in our comprehensive course
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Secure Wi-Fi Usage</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• VPN setup and usage</li>
                  <li>• Avoiding public Wi-Fi risks</li>
                  <li>• Securing your mobile hotspot</li>
                  <li>• HTTPS and secure browsing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Physical Security</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Hotel room door security</li>
                  <li>• Portable door locks and alarms</li>
                  <li>• Safe usage and limitations</li>
                  <li>• Securing valuables while traveling</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Device Protection</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Full-disk encryption setup</li>
                  <li>• Strong authentication methods</li>
                  <li>• Remote wipe capabilities</li>
                  <li>• Backup strategies for travelers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Communication Security</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Encrypted messaging apps</li>
                  <li>• Secure phone calls</li>
                  <li>• Email security while traveling</li>
                  <li>• Avoiding SIM swap attacks</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Social Media Safety</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Location sharing risks</li>
                  <li>• Posting while traveling safely</li>
                  <li>• Privacy settings review</li>
                  <li>• Avoiding oversharing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Emergency Preparedness</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Emergency contact protocols</li>
                  <li>• Embassy and consulate information</li>
                  <li>• Travel insurance considerations</li>
                  <li>• Crisis management planning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Ready to Travel Safely?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our comprehensive Travel Safety course and learn professional security techniques to protect yourself wherever you go.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">Enroll Now</Button>
            <Button size="lg" variant="outline" className="text-lg">Download Free Guide</Button>
          </div>
        </div>
      </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default TravelSafety;
