import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkipLink } from "@/components/SkipLink";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Donate from "./pages/Donate";
import OnlinePrivacy from "./pages/OnlinePrivacy";
import TravelSafety from "./pages/TravelSafety";
import DigitalAdvocacy from "./pages/DigitalAdvocacy";
import SafetyGuides from "./pages/SafetyGuides";
import Newsletter from "./pages/Newsletter";
import PublicSafety from "./pages/PublicSafety";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminAssetUpload from "./pages/AdminAssetUpload";
import Resources from "./pages/Resources";
import ResourcesByState from "./pages/ResourcesByState";
import AdminResources from "./pages/AdminResources";
import AdminBlog from "./pages/AdminBlog";
import AdminBlogEditor from "./pages/AdminBlogEditor";
import AdminContributions from "./pages/AdminContributions";
import AdminDashboard from "./pages/AdminDashboard";
import AdminContent from "./pages/AdminContent";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import ComingSoon from "./pages/ComingSoon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SkipLink />
          {/* WCAG 2.1.4 (A) - Keyboard Shortcuts with discoverable help */}
          <KeyboardShortcuts />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/online-privacy" element={<OnlinePrivacy />} />
            <Route path="/travel-safety" element={<TravelSafety />} />
            <Route path="/digital-advocacy" element={<DigitalAdvocacy />} />
            <Route path="/safety-guides" element={<SafetyGuides />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/public-safety" element={<PublicSafety />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources-by-state" element={<ResourcesByState />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/accessibility" element={<AccessibilityStatement />} />
            <Route path="/accessibility" element={<AccessibilityStatement />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/content" element={
              <ProtectedRoute requireAdmin>
                <AdminContent />
              </ProtectedRoute>
            } />
            <Route path="/admin/upload-assets" element={
              <ProtectedRoute requireAdmin>
                <AdminAssetUpload />
              </ProtectedRoute>
            } />
            <Route path="/admin/resources" element={
              <ProtectedRoute requireAdmin>
                <AdminResources />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog" element={
              <ProtectedRoute requireAdmin>
                <AdminBlog />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog/new" element={
              <ProtectedRoute requireAdmin>
                <AdminBlogEditor />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog/edit/:id" element={
              <ProtectedRoute requireAdmin>
                <AdminBlogEditor />
              </ProtectedRoute>
            } />
            <Route path="/admin/contributions" element={
              <ProtectedRoute requireAdmin>
                <AdminContributions />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
