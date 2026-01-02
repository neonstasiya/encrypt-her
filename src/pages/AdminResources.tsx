import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, Edit2, Save, X, Menu } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import encryptherLogo from "@/assets/encrypther-logo.png";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

type SafetyResource = Tables<"safety_resources">;
type NewResource = TablesInsert<"safety_resources">;

const US_STATES = [
  "National", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
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

const emptyResource: Omit<NewResource, "id"> = {
  state: "",
  category: "other",
  name: "",
  description: "",
  phone: "",
  website: "",
  address: "",
  city: "",
  is_national: false,
  is_verified: false,
};

const AdminResources = () => {
  const [resources, setResources] = useState<SafetyResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<NewResource, "id">>(emptyResource);
  const [filterState, setFilterState] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchResources();
  }, [filterState]);

  const fetchResources = async () => {
    setLoading(true);
    let query = supabase.from("safety_resources").select("*");
    
    if (filterState && filterState !== "all") {
      query = query.eq("state", filterState);
    }
    
    const { data, error } = await query.order("state").order("name");
    
    if (error) {
      toast({ title: "Error", description: "Failed to fetch resources", variant: "destructive" });
    } else {
      setResources(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.state || !formData.category) {
      toast({ title: "Error", description: "Please fill in required fields", variant: "destructive" });
      return;
    }

    const resourceData = {
      ...formData,
      is_national: formData.state === "National" || formData.is_national,
    };

    if (editingId) {
      const { error } = await supabase
        .from("safety_resources")
        .update(resourceData)
        .eq("id", editingId);
      
      if (error) {
        toast({ title: "Error", description: "Failed to update resource", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Resource updated" });
        setEditingId(null);
        setFormData(emptyResource);
        setShowForm(false);
        fetchResources();
      }
    } else {
      const { error } = await supabase
        .from("safety_resources")
        .insert([resourceData]);
      
      if (error) {
        toast({ title: "Error", description: "Failed to add resource", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Resource added" });
        setFormData(emptyResource);
        setShowForm(false);
        fetchResources();
      }
    }
  };

  const handleEdit = (resource: SafetyResource) => {
    setFormData({
      state: resource.state,
      category: resource.category,
      name: resource.name,
      description: resource.description || "",
      phone: resource.phone || "",
      website: resource.website || "",
      address: resource.address || "",
      city: resource.city || "",
      is_national: resource.is_national || false,
      is_verified: resource.is_verified || false,
    });
    setEditingId(resource.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    
    const { error } = await supabase.from("safety_resources").delete().eq("id", id);
    
    if (error) {
      toast({ title: "Error", description: "Failed to delete resource", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Resource deleted" });
      fetchResources();
    }
  };

  const handleCancel = () => {
    setFormData(emptyResource);
    setEditingId(null);
    setShowForm(false);
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
                <Link to="/resources" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Resources</Link>
                <Link to="/admin/resources" className="text-lg text-primary hover:text-primary/80 transition-colors font-semibold">Admin Resources</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Manage Safety Resources</h1>
            <p className="text-muted-foreground mt-1">Add, edit, and manage resources for the directory</p>
          </div>
          <Button onClick={() => setShowForm(true)} disabled={showForm}>
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? "Edit Resource" : "Add New Resource"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Organization name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone || ""}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="1-800-XXX-XXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website || ""}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city || ""}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the organization"
                    rows={3}
                  />
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_national"
                      checked={formData.is_national || false}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_national: checked as boolean })}
                    />
                    <Label htmlFor="is_national">National Resource</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_verified"
                      checked={formData.is_verified || false}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_verified: checked as boolean })}
                    />
                    <Label htmlFor="is_verified">Verified</Label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    {editingId ? "Update" : "Save"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filter */}
        <div className="mb-6">
          <Select value={filterState} onValueChange={setFilterState}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {US_STATES.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Resources List */}
        {loading ? (
          <p className="text-muted-foreground">Loading resources...</p>
        ) : resources.length === 0 ? (
          <p className="text-muted-foreground">No resources found. Add your first resource above.</p>
        ) : (
          <div className="space-y-3">
            {resources.map((resource) => (
              <Card key={resource.id} className="bg-card">
                <CardContent className="py-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{resource.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded bg-muted">{resource.category}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-muted">{resource.state}</span>
                        {resource.is_national && (
                          <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">National</span>
                        )}
                        {resource.is_verified && (
                          <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">Verified</span>
                        )}
                      </div>
                      {resource.description && (
                        <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                      )}
                      <div className="text-sm text-muted-foreground mt-1">
                        {resource.phone && <span className="mr-4">📞 {resource.phone}</span>}
                        {resource.website && <span>🌐 {resource.website}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(resource)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(resource.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminResources;
