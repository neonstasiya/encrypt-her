import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkipLink } from "@/components/SkipLink";
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
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminAssetUpload from "./pages/AdminAssetUpload";
import Resources from "./pages/Resources";
import AdminResources from "./pages/AdminResources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SkipLink />
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/admin/upload-assets" element={<AdminAssetUpload />} />
          <Route path="/admin/resources" element={<AdminResources />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
