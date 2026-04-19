import { Link } from "react-router-dom";
import { 
  FileText, 
  MapPin, 
  MessageSquare, 
  Upload, 
  LogOut,
  Settings,
  ArrowRight,
  Edit
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminDashboard = () => {
  usePageMeta("Admin Dashboard | EncryptHer");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const adminLinks = [
    {
      title: "Edit Page Content",
      description: "Update text and content on website pages without editing code.",
      icon: Edit,
      link: "/admin/content",
      color: "primary"
    },
    {
      title: "Manage Blog Posts",
      description: "Create, edit, publish, and delete blog posts. Manage drafts and published articles.",
      icon: FileText,
      link: "/admin/blog",
      color: "primary"
    },
    {
      title: "Review Contributions",
      description: "Review and manage public blog story submissions from visitors.",
      icon: MessageSquare,
      link: "/admin/contributions",
      color: "accent"
    },
    {
      title: "Manage Resources",
      description: "Add, edit, and delete safety resources for the state-by-state directory.",
      icon: MapPin,
      link: "/admin/resources",
      color: "primary"
    },
    {
      title: "Upload Assets",
      description: "Upload images and assets for email signatures and other uses.",
      icon: Upload,
      link: "/admin/upload-assets",
      color: "accent"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content" className="flex-grow container mx-auto px-4 py-12" role="main">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Settings className="h-8 w-8 text-primary" aria-hidden="true" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Logged in as {user?.email}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="min-h-[44px]"
            >
              <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
              Sign Out
            </Button>
          </div>

          {/* Admin Links Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {adminLinks.map((item) => (
              <Card 
                key={item.title}
                className="border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <div 
                    className={`h-12 w-12 rounded-lg ${item.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'} flex items-center justify-center mb-3`}
                    aria-hidden="true"
                  >
                    <item.icon 
                      className={`h-6 w-6 ${item.color === 'primary' ? 'text-primary' : 'text-accent'}`} 
                      aria-hidden="true" 
                    />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full group min-h-[44px]">
                    <Link to={item.link}>
                      Go to {item.title.split(" ")[1]}
                      <ArrowRight 
                        className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" 
                        aria-hidden="true" 
                      />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" asChild className="min-h-[44px]">
                <Link to="/">View Website</Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="min-h-[44px]">
                <Link to="/blog">View Blog</Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="min-h-[44px]">
                <Link to="/resources-by-state">View Resources Directory</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default AdminDashboard;
