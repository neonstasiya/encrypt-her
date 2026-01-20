import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Smartphone, Newspaper, MapPin, Focus, Sparkles, Users, TrendingUp, Zap, Heart, MessageCircle, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-privacy.jpg";
import transparentLogo from "@/assets/encrypther-logo.png";
import jsPDF from "jspdf";
import { EmailGateForm } from "@/components/EmailGateForm";
import { SafetyGuidesHeader } from "@/components/SafetyGuidesHeader";
import { Toaster } from "@/components/ui/toaster";
import { FooterResourcesDropdown } from "@/components/FooterResourcesDropdown";
import { SkipLink } from "@/components/SkipLink";
import { usePageTitle } from "@/hooks/usePageTitle";

const SafetyGuides = () => {
  usePageTitle("12 Keys to Personal Safety | EncryptHer");
  const [activeSection, setActiveSection] = useState(0);
  const [hasAccess, setHasAccess] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);

  // Check localStorage on mount for returning users
  useEffect(() => {
    const hasStoredAccess = localStorage.getItem("safety_guide_access");
    if (hasStoredAccess === "true") {
      setHasAccess(true);
    }
  }, []);
  
  const handleDiscoverKeys = () => {
    if (hasAccess) {
      // If already has access, scroll to content
      document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Show email gate
      setShowEmailGate(true);
      setTimeout(() => {
        document.getElementById('email-gate')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleEmailSuccess = () => {
    setHasAccess(true);
    setTimeout(() => {
      document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (2 * margin);
    let yPosition = margin;

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("12 Keys to Personal Safety", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 15;

    // Subtitle
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const subtitle = "Empower yourself with situational awareness. Your safety, your control, your confidence.";
    const subtitleLines = doc.splitTextToSize(subtitle, maxWidth);
    doc.text(subtitleLines, pageWidth / 2, yPosition, { align: "center" });
    yPosition += subtitleLines.length * 7 + 10;

    // Introduction
    doc.setFontSize(10);
    const intro = "Personal safety isn't about paranoia—it's about empowerment. When you develop strong situational awareness, you gain precious time: time to recognize potential threats, time to make smart decisions, and time to take action that keeps you safe. The most effective self-defense tool you possess isn't a weapon or a fighting technique—it's your ability to spot danger early and avoid it entirely.";
    const introLines = doc.splitTextToSize(intro, maxWidth);
    doc.text(introLines, margin, yPosition);
    yPosition += introLines.length * 5 + 10;

    // Keys
    keys.forEach((key, index) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${key.title}`, margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const descLines = doc.splitTextToSize(key.description, maxWidth);
      doc.text(descLines, margin, yPosition);
      yPosition += descLines.length * 5 + 5;

      const detailLines = doc.splitTextToSize(key.details, maxWidth);
      detailLines.forEach((line: string) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 10;
    });

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("© 2025 EncryptHer. Empowering women through awareness and education.", pageWidth / 2, pageHeight - 10, { align: "center" });

    doc.save("12-keys-personal-safety.pdf");
  };

  const keys = [
    {
      icon: Eye,
      title: "Active Observation",
      description: "Train yourself to notice details in your environment. Engage your mind consciously with what you see, hear, and sense around you. This heightened awareness becomes your first line of defense.",
      details: "Situational awareness begins with deliberate observation. When you enter any space, take a mental snapshot: Who's there? What's their demeanor? Where are the exits? What seems unusual? This isn't about being paranoid—it's about being present. Practice the 'Cooper Color Code' system: Condition White (unaware), Yellow (relaxed alertness—this is your baseline), Orange (focused attention on a potential threat), and Red (action required). Train yourself to operate in Condition Yellow as your default state. Notice people's hands, facial expressions, and where they're directing their attention. Pay attention to vehicles that seem out of place or people who appear to be loitering without purpose. The more you practice active observation, the more automatic it becomes, and the faster you'll detect when something isn't right.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Smartphone,
      title: "Eliminate Distractions",
      description: "Your phone can wait. When you're in public spaces, keep your attention on your surroundings rather than your screen. Your awareness is your superpower—don't let technology diminish it.",
      details: "In today's hyperconnected world, our phones have become one of the biggest threats to our personal safety—not because of who might contact us, but because of what we miss while we're looking down. Studies show that people absorbed in their phones walk more slowly, notice fewer details, and are perceived as easier targets. When you're walking to your car, moving through a parking lot, or in any public space, put your phone away. If you must use it, stop walking and position yourself with your back to a wall where you can see your surroundings. Earbuds are especially dangerous—they eliminate one of your primary senses for detecting threats. Save the podcast for when you're safely at your destination. Create a habit: phone down when you're moving through public spaces. Your messages and notifications will still be there when you arrive safely.",
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: Newspaper,
      title: "Stay Informed",
      description: "Knowledge is protection. Keep updated on local safety concerns, weather alerts, and community events. Understanding what's happening in your area helps you make informed decisions about your safety.",
      details: "Being informed isn't about living in fear—it's about making smart decisions based on current information. Follow local news, join neighborhood apps like Nextdoor, and pay attention to police bulletins about recent incidents in your area. Know which areas have experienced increased crime and what types of incidents are occurring. If there's been a series of car break-ins in parking garages downtown, you'll adjust your behavior accordingly. Weather awareness is equally important: knowing a storm is coming means you can avoid being caught unprepared. Sign up for emergency alerts on your phone. Follow local law enforcement social media accounts. Understand the difference between various emergency alerts and what actions each requires. Knowledge allows you to be proactive rather than reactive. When you know what's happening in your community, you can route your daily activities around potential risks, choose safer times to travel, and be mentally prepared for the types of situations you might encounter.",
      color: "from-purple-500 to-cyan-500"
    },
    {
      icon: MapPin,
      title: "Know Your Space",
      description: "Always locate exits and safe zones when entering any space. Make it a habit to identify at least three ways out of every location. Your escape plan should be automatic, not improvised.",
      details: "The moment you enter any building, venue, or public space, locate your exits. This should become as automatic as putting on your seatbelt. In restaurants, choose seating that gives you a view of entrances and clear access to exits. In shopping malls, note where the emergency exits are—not just the main entrances you came through. In office buildings, know the stairwells and alternative routes beyond the elevator. Don't just identify one exit; find at least three different ways to leave. Your primary exit might become blocked or compromised in an emergency. Also identify 'safe zones'—areas where you could take cover or find help if needed. Where are the security guards stationed? Where's the nearest police or fire station? In parking structures, note your parking location and the quickest route to well-lit, populated areas. When you're at events or concerts, understand where the emergency exits are before the show starts. This mental mapping takes only seconds but could save crucial time in an emergency. Make it a game with yourself: every time you enter a new space, count your exits.",
      color: "from-cyan-500 to-purple-500"
    },
    {
      icon: Focus,
      title: "Maintain Wide Awareness",
      description: "Don't get tunnel vision. What's happening behind you matters just as much as what's in front. Keep your personal bubble intact—distance equals reaction time equals safety.",
      details: "Tunnel vision is a natural human tendency—we focus on what's directly in front of us and lose peripheral awareness. Combat this by practicing 'soft focus,' where you take in your entire field of vision rather than staring at one point. Use reflective surfaces—car windows, store windows, your phone screen when it's dark—to see what's behind you without obviously turning around. Understand the concept of your 'reactionary gap': this is the distance between you and a potential threat that gives you time to react. Maintain at least 21 feet between yourself and anyone who makes you uncomfortable—research shows this is the minimum distance needed to react if someone charges at you. In confined spaces like elevators, position yourself near the control panel so you can exit first and control which floors are selected. On public transit, sit or stand where you can see the whole car. When walking, regularly cross the street or change direction to check if anyone matches your movements. Use your peripheral vision actively—train yourself to notice movement at the edges of your vision. Your personal space is sacred: if someone violates it without good reason, that's a warning sign. Trust that feeling and increase your distance immediately.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "Trust Your Instincts",
      description: "Your intuition is powerful. If something feels off, it probably is. Never dismiss that gut feeling for fear of seeming rude or paranoid. Your safety matters more than social comfort.",
      details: "Your subconscious mind processes thousands of data points that your conscious mind never registers. When you get that 'gut feeling' that something's wrong, your brain has detected a pattern or anomaly even if you can't articulate what it is. This is not paranoia—it's your survival instinct working exactly as it should. Women especially are socialized to be polite, to not make waves, to avoid seeming rude or suspicious. This social conditioning can be dangerous. If someone approaches you and your instincts scream 'danger,' listen. You don't owe anyone politeness when your safety is at stake. Trust that feeling and act on it immediately. Cross the street. Go into a busy store. Call someone. Get loud if you need to. Don't let embarrassment or social pressure override your instincts. The book 'The Gift of Fear' by Gavin de Becker documents countless cases where people ignored their intuition and later regretted it. Your gut isn't reacting to nothing—it's reacting to micro-signals of danger that your conscious mind hasn't caught up to yet. Practice listening to these feelings in low-stakes situations so you'll trust them when it matters most. If an elevator door opens and something feels wrong about the person inside, don't get in. Wait for the next one. Your instincts are your superpower—never apologize for using them.",
      color: "from-pink-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Read Body Language",
      description: "People communicate through more than words. Notice nervous behaviors, aggressive postures, or unusual attention patterns. These non-verbal cues often reveal intentions before actions happen.",
      details: "Body language speaks volumes before a single word is uttered. Learn to recognize pre-attack indicators: excessive sweating in cool weather, clenched fists, aggressive posturing, invading personal space without reason, inability to maintain normal eye contact (either staring too intensely or avoiding eye contact altogether), nervous fidgeting that seems out of context, scanning behavior (looking around as if checking for witnesses), or blocking your path. Notice hands—they're what will hurt you. Are they hidden? Clenched? Reaching for something? Pay attention to someone's baseline behavior, then watch for deviations. Someone who was calm but suddenly becomes agitated, or someone who seems overly interested in you without legitimate reason, should trigger your awareness. Watch for 'interview' tactics: someone approaching with an overly friendly demeanor, asking unnecessary questions, offering unsolicited help, or trying to establish false rapport ('We're from the same town!'). These are often tactics to get close to you or test your responsiveness. Notice clusters of concerning behaviors, not just individual signs. Also observe your own body language: stand tall, move with purpose, make brief eye contact to show awareness without challenging. Looking confident and aware makes you a less attractive target. Project awareness through your posture and movement—predators look for victims who seem distracted or vulnerable.",
      color: "from-cyan-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Recognize Patterns",
      description: "Notice what's normal, so you can spot what's not. Someone following you will change direction when you do. Trust the pattern—it rarely lies about someone's intentions.",
      details: "Pattern recognition is perhaps the most powerful tool in your awareness toolkit. When you understand what's normal for a given environment, anything abnormal immediately stands out. A person loitering in a parking garage at 2 AM is unusual. A vehicle driving slowly through a residential neighborhood multiple times is unusual. Someone who walks past you, then turns around and comes back is unusual. Train yourself to establish baselines: what does this place normally look like at this time? What are people usually doing here? Then notice deviations. If you suspect someone is following you, test it. Cross the street—do they cross too? Turn around and go back the way you came—do they follow? Go into a store—do they come in behind you? Make four right turns in a row while driving—you'll end up where you started, and anyone still behind you is definitely following. Pay attention to vehicles that appear multiple times in different locations—that's not coincidence. Notice if someone seems too interested in your routine: showing up at your coffee shop repeatedly, being at the gym at the same time consistently, or appearing in multiple places in your daily life. Some patterns are about timing: criminals often strike at shift changes, during busy periods when attention is divided, or during predictable routine moments. Understand the pattern of 'normal' for different locations and times, and your brain will automatically flag what doesn't fit.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Think Ahead",
      description: "Don't wait to see how a tense situation unfolds. When you sense danger developing, create distance immediately. Your safety plan should always include an early exit strategy.",
      details: "Proactive thinking means playing out scenarios in your mind before they happen. When you park your car, before you get out, scan the area. If something feels wrong, don't get out—drive to a different location. When you return to your car, have your keys ready before you leave the building. Look under and around your car as you approach. Don't wait until you're at your car door to start fumbling through your purse. Plan your routes: if you're walking to your car at night, choose well-lit paths even if they're longer. Know where the emergency call boxes are located. Have your phone accessible with emergency contacts on speed dial. Think through 'what if' scenarios: What would I do if someone tried to get in my car at a red light? Where would I drive? (Answer: to the nearest police or fire station, which you should know the location of). What would I do if I came home and my door was ajar? (Answer: don't go in—leave immediately and call police from a safe location). What would I do if I was in a store and heard gunshots? (Answer: run if you can see the exit, hide if you can't run, fight as a last resort). Mental rehearsal creates neural pathways that let you act faster in real emergencies. Don't wait to see if a situation gets worse—act on early warning signs. If you're in a parking lot and someone makes you uncomfortable, get back inside the building. If you're on a date that feels wrong, end it early. Your future self will thank you for leaving 'too soon' rather than staying too long.",
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: Heart,
      title: "Stay Composed",
      description: "Practice staying calm under pressure. Panic clouds judgment and slows reactions. Prepare mentally now for what you'd do in an emergency, so your mind has a plan to follow when adrenaline hits.",
      details: "In high-stress situations, your body dumps adrenaline into your system, triggering the fight-or-flight response. Your heart rate spikes, your vision narrows, fine motor skills deteriorate, and rational thinking becomes harder. You can't prevent this physiological response, but you can train yourself to function through it. Practice controlled breathing: box breathing (in for 4, hold for 4, out for 4, hold for 4) activates your parasympathetic nervous system and counters the panic response. Visualize emergency scenarios and mentally rehearse your response until it becomes almost automatic. This way, when adrenaline hits, you have a pre-programmed response rather than freezing or panicking. Understand the stress response phases: denial ('this isn't really happening'), fear (panic, freezing, feeling overwhelmed), and acceptance (engaging rational thought and taking action). Your goal is to move through the first two phases as quickly as possible. Train yourself with progressive exposure: if you're afraid of confrontation, practice assertive communication in low-stakes situations. If you're afraid of emergencies, take first aid courses where you practice scenarios. The more you expose yourself to controlled stress, the better you'll handle real stress. Remember: action defeats anxiety. Even small actions—moving toward an exit, calling for help, creating distance—will help you feel more in control and think more clearly. Your composure is contagious; if you stay calm, others around you are more likely to stay calm too, which can prevent mass panic in emergency situations.",
      color: "from-purple-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      title: "Communicate Clearly",
      description: "In emergencies, clear communication saves lives. Be specific, be direct, and assign responsibilities. 'You in the blue shirt, call 911' works better than 'someone call 911.'",
      details: "In emergencies, communication clarity can mean the difference between life and death. Bystander effect is real—when you say 'someone call 911,' everyone assumes someone else will do it, and often no one does. Instead, point to a specific person and give a specific instruction: 'You, in the red jacket, call 911 right now and tell them we have a medical emergency at [specific location].' Make eye contact, point, and assign clear tasks. When calling 911, give your exact location first—if the call drops, they can still send help. Use landmarks, cross streets, building names. State the nature of the emergency clearly. Answer questions directly and follow dispatcher instructions. If you're describing a suspect, provide specific details: height, weight, hair color, clothing, direction of travel, any distinguishing marks. 'Average height' doesn't help; '5'8\", approximately 180 pounds, wearing a black hoodie and jeans, heading north on foot' does. Practice describing people accurately and quickly. In group situations, designate roles: 'You stay with the victim, you call 911, you direct first responders when they arrive, you keep bystanders back.' Clear role assignment prevents chaos and ensures critical tasks get done. Use assertive language—this is not the time for politeness or hedging. 'I need help now' is more effective than 'I'm sorry to bother you but...' If you're the victim, be loud and specific: 'Call the police!' not 'Help!' Project your voice from your diaphragm. Short, loud, repeated commands cut through confusion and panic.",
      color: "from-cyan-500 to-purple-500"
    },
    {
      icon: RefreshCcw,
      title: "Constant Reassessment",
      description: "Awareness isn't a one-time check. Continuously scan and update your understanding of your environment. Situations change, and your awareness must adapt with them.",
      details: "Situational awareness is not a checkbox you mark once and forget—it's a continuous feedback loop. The situation when you arrived might be completely different ten minutes later. Make it a habit to regularly re-scan your environment. Every few minutes, do a quick 360-degree awareness check. Has anyone new entered the area? Has the crowd's mood changed? Have exits become blocked? Did someone who was across the room move closer? What's changed since your last mental snapshot? This is especially critical in fluid situations like concerts, protests, or large gatherings where dynamics can shift rapidly. A peaceful event can turn chaotic quickly. Notice early indicators of tension: raised voices, sudden movements, changes in crowd density, police activity, or people suddenly leaving. In your daily routines, reassess as circumstances change: the parking lot that was busy and well-lit when you entered the store might be nearly empty and dark when you leave. Adjust your awareness and your actions accordingly. In your own neighborhood, notice changes over time: new people, vehicles you don't recognize, patterns of activity. Don't assume that because you felt safe yesterday, you're safe today. Threats are dynamic, not static. Criminals, weather, mechanical failures, medical emergencies—dangers don't wait for convenient times. Your awareness must be equally dynamic. Make reassessment automatic: set mental triggers like 'every time I look up from my phone, I scan my environment' or 'every time I turn a corner, I check what's ahead and behind me.' Constant reassessment means you're never caught completely off guard because you're always updating your understanding of your situation.",
      color: "from-pink-500 to-cyan-500"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      let current = 0;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = index;
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <SafetyGuidesHeader />
      
      {/* Hero Section */}
      <main id="main-content">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-heading">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-cyan-600/20" aria-hidden="true" />
          
          {/* Logo positioned at top center over the hero image */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 pt-4">
            <img src={transparentLogo} alt="" className="h-24 w-auto" aria-hidden="true" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 id="hero-heading" className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent animate-fade-in">
              12 Keys to Personal Safety
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto">
              Empower yourself with situational awareness. Your safety, your control, your confidence.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 rounded-full shadow-elegant transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={handleDiscoverKeys}
            >
              Discover the Keys
            </Button>
          </div>
        </section>

      {/* Email Gate - Shows after clicking Discover the Keys */}
      {showEmailGate && !hasAccess && (
        <EmailGateForm onSuccess={handleEmailSuccess} />
      )}

      {/* Full Content - Only shown after email submission */}
      {hasAccess && (
        <>
          {/* Introduction */}
          <section id="content" className="py-20 bg-gradient-card" aria-labelledby="intro-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-2 border-purple-200/50 shadow-elegant">
            <h2 id="intro-heading" className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Safety Begins With Awareness
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
              Personal safety isn't about paranoia—it's about empowerment. When you develop strong situational awareness, you gain precious time: time to recognize potential threats, time to make smart decisions, and time to take action that keeps you safe.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
              The most effective self-defense tool you possess isn't a weapon or a fighting technique—it's your ability to spot danger early and avoid it entirely. Professional security experts know that if you're forced into a physical confrontation, prevention has already failed.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              These 12 keys will help you build a foundation of awareness that becomes second nature. You'll learn to trust your instincts, read your environment, and make choices that prioritize your wellbeing without living in fear.
            </p>
          </Card>
        </div>
      </section>

      {/* 12 Keys */}
      <section className="py-20" aria-labelledby="keys-heading">
        <h2 id="keys-heading" className="sr-only">The 12 Keys to Personal Safety</h2>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-24">
            {keys.map((key, index) => {
              const Icon = key.icon;
              return (
                <article
                  key={index}
                  data-section
                  className={`transition-all duration-700 ${
                    activeSection === index ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-4'
                  }`}
                >
                  <Card className={`p-8 md:p-12 bg-gradient-to-br ${key.color} text-white shadow-elegant hover:shadow-glow transition-smooth`}>
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-8 h-8" aria-hidden="true" />
                        </div>
                        <div className="text-6xl font-bold text-white/30 mt-2" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                          {key.title}
                        </h3>
                        <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-6 font-semibold">
                          {key.description}
                        </p>
                        <p className="text-base md:text-lg leading-relaxed text-white/80">
                          {key.details}
                        </p>
                      </div>
                    </div>
                  </Card>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 text-white" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold mb-6">
            Empowered. Aware. Protected.
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Start practicing these keys today. Awareness is a skill that grows stronger with every conscious choice you make to stay present and alert.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-elegant transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Learn More
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-lg px-8 py-6 rounded-full transition-smooth bg-white text-purple-600 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={handleDownloadPDF}
            >
              Download Guide
            </Button>
          </div>
        </div>
      </section>
      </>
      )}
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card" role="contentinfo">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-0 mb-1">
                <img src={transparentLogo} alt="" className="h-12 w-12" aria-hidden="true" />
                <span className="font-bold text-lg text-foreground">EncryptHer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering women through digital safety education and real-world protection strategies.
              </p>
            </div>
            
            <nav aria-label="Programs navigation">
              <h4 className="font-semibold mb-4 text-foreground">Programs</h4>
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li><Link to="/online-privacy" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Online Privacy</Link></li>
                <li><Link to="/travel-safety" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Travel Safety</Link></li>
                <li><Link to="/digital-advocacy" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Advocacy</Link></li>
                <li><Link to="/public-safety" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Public Safety</Link></li>
              </ul>
            </nav>
            
            <nav aria-label="Resources navigation">
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm" role="list">
                <li><FooterResourcesDropdown /></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Blog</Link></li>
                <li><Link to="/safety-guides" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Safety Guides</Link></li>
              </ul>
            </nav>
            
            <nav aria-label="Connect navigation">
              <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li><Link to="/about" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Contact</Link></li>
                <li><Link to="/newsletter" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Newsletter</Link></li>
                <li><Link to="/donate" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Donate</Link></li>
                <li><Link to="/accessibility" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">Accessibility</Link></li>
              </ul>
            </nav>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 EncryptHer. All rights reserved. A nonprofit organization dedicated to women's digital and physical safety.</p>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default SafetyGuides;
