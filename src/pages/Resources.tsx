import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Phone, Globe, MapPin, Shield, ChevronDown, Menu } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FooterResourcesDropdown } from "@/components/FooterResourcesDropdown";
import encryptherLogo from "@/assets/encrypther-logo.png";
import type { Tables } from "@/integrations/supabase/types";

type SafetyResource = Tables<"safety_resources">;

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"
];

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "police", label: "Police Departments" },
  { value: "gun_training", label: "Gun Training" },
  { value: "self_defense", label: "Self-Defense Classes" },
  { value: "victim_advocacy", label: "Victim Advocacy" },
  { value: "private_investigator", label: "Private Investigators" },
  { value: "legal_aid", label: "Legal Aid" },
  { value: "crisis_hotline", label: "Crisis Hotlines" },
  { value: "shelter", label: "Shelters" },
  { value: "other", label: "Other" },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    police: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    gun_training: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    self_defense: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    victim_advocacy: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    private_investigator: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    legal_aid: "bg-green-500/20 text-green-300 border-green-500/30",
    crisis_hotline: "bg-red-500/20 text-red-300 border-red-500/30",
    shelter: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    other: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  };
  return colors[category] || colors.other;
};

const getCategoryLabel = (category: string) => {
  return CATEGORIES.find(c => c.value === category)?.label || category;
};

const Resources = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState<SafetyResource[]>([]);
  const [loading, setLoading] = useState(true);
  
  const selectedState = searchParams.get("state") || "";
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      let query = supabase.from("safety_resources").select("*");
      
      if (selectedState) {
        query = query.or(`state.eq.${selectedState},is_national.eq.true`);
      }
      
      if (selectedCategory && selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }
      
      const { data, error } = await query.order("is_national", { ascending: false }).order("name");
      
      if (error) {
        console.error("Error fetching resources:", error);
      } else {
        setResources(data || []);
      }
      setLoading(false);
    };

    fetchResources();
  }, [selectedState, selectedCategory]);

  const handleStateChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("state");
    } else {
      params.set("state", value);
    }
    setSearchParams(params);
  };

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-px">
          <Link to="/" className="flex items-center gap-0">
            <img src={encryptherLogo} alt="EncryptHer logo" className="h-24 w-24" />
            <h1 className="text-2xl font-bold text-foreground">EncryptHer</h1>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <Link to="/" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Home</Link>
                <a href="/#classes" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Classes</a>
                <Link to="/safety-guides" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Safety Guides</Link>
                <Link to="/resources" className="text-lg text-primary hover:text-primary/80 transition-colors font-semibold">Resources</Link>
                <Link to="/blog" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
                <Link to="/about" className="text-lg text-muted-foreground hover:text-foreground transition-colors">About</Link>
                <Link to="/contact" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
                <Link to="/donate" className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors">Donate</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Safety Resources Directory</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find local resources to help keep you safe. From crisis hotlines to self-defense classes, 
            we've compiled essential contacts for women across the United States.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <Select value={selectedState || "all"} onValueChange={handleStateChange}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {US_STATES.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading resources...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No resources found for the selected filters.</p>
              <p className="text-sm text-muted-foreground">
                Try selecting a different state or category, or{" "}
                <Link to="/contact" className="text-primary hover:underline">contact us</Link>{" "}
                to suggest resources.
              </p>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-6 text-center">
                Showing {resources.length} resource{resources.length !== 1 ? "s" : ""}
                {selectedState && ` for ${selectedState}`}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                  <Card key={resource.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{resource.name}</CardTitle>
                        {resource.is_national && (
                          <Badge variant="outline" className="shrink-0 bg-primary/20 text-primary border-primary/30">
                            National
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge className={getCategoryColor(resource.category)}>
                          {getCategoryLabel(resource.category)}
                        </Badge>
                        {resource.is_verified && (
                          <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {resource.description && (
                        <CardDescription className="text-muted-foreground">
                          {resource.description}
                        </CardDescription>
                      )}
                      <div className="space-y-2 text-sm">
                        {resource.phone && (
                          <a 
                            href={`tel:${resource.phone.replace(/\D/g, '')}`}
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Phone className="h-4 w-4" />
                            {resource.phone}
                          </a>
                        )}
                        {resource.website && (
                          <a 
                            href={resource.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Globe className="h-4 w-4" />
                            Visit Website
                          </a>
                        )}
                        {(resource.address || resource.city) && (
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>
                              {resource.address && <span>{resource.address}, </span>}
                              {resource.city && <span>{resource.city}, </span>}
                              {resource.state}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Know a Resource We Should Add?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Help us build a more comprehensive directory by suggesting organizations in your area.
          </p>
          <Button asChild>
            <Link to="/contact">Submit a Resource</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={encryptherLogo} alt="EncryptHer" className="h-10 w-10" />
                <span className="font-bold text-lg">EncryptHer</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering women through digital safety education and advocacy.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/online-privacy" className="hover:text-foreground transition-colors">Online Privacy</Link></li>
                <li><Link to="/public-safety" className="hover:text-foreground transition-colors">Public Safety</Link></li>
                <li><Link to="/travel-safety" className="hover:text-foreground transition-colors">Travel Safety</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><FooterResourcesDropdown /></li>
                <li><Link to="/safety-guides" className="text-muted-foreground hover:text-foreground transition-colors">Safety Guides</Link></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link to="/donate" className="hover:text-foreground transition-colors">Donate</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} EncryptHer. Empowering women to protect themselves in the digital age.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Resources;
