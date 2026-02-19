import { Link } from "react-router-dom";
import encryptherLogo from "@/assets/encrypther-logo.png";
import { FooterResourcesDropdown } from "@/components/FooterResourcesDropdown";

export const AccessibleFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-4 border-t border-border bg-card" role="contentinfo">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-1 mb-4">
              <img src={encryptherLogo} alt="" className="h-12 w-12" aria-hidden="true" />
              <span className="font-bold text-lg text-foreground">EncryptHer</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering women through digital safety education and real-world protection strategies.
            </p>
          </div>
          
          <nav aria-label="Programs navigation">
            <h2 className="font-semibold mb-4 text-foreground text-base">Programs</h2>
            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
              <li>
                <Link to="/online-privacy" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Online Privacy
                </Link>
              </li>
              <li>
                <Link to="/travel-safety" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Travel Safety
                </Link>
              </li>
              <li>
                <Link to="/digital-advocacy" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Advocacy
                </Link>
              </li>
              <li>
                <Link to="/public-safety" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Public Safety
                </Link>
              </li>
            </ul>
          </nav>
          
          <nav aria-label="Resources navigation">
            <h2 className="font-semibold mb-4 text-foreground text-base">Resources</h2>
            <ul className="space-y-2 text-sm" role="list">
              <li><FooterResourcesDropdown /></li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/safety-guides" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Safety Guides
                </Link>
              </li>
            </ul>
          </nav>
          
          <nav aria-label="Connect navigation">
            <h2 className="font-semibold mb-4 text-foreground text-base">Connect</h2>
            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/newsletter" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} EncryptHer. All rights reserved. A nonprofit organization dedicated to women's digital and physical safety.
            <span className="mx-2">·</span>
            <Link to="/auth" className="hover:text-foreground transition-colors">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};