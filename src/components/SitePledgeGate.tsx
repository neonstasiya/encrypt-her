import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Shield, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const STORAGE_KEY = "site_pledge_status"; // 'agreed' | 'skipped'
const EXCLUDED_PATHS = ["/auth", "/reset-password", "/unsubscribe"];

const emailSchema = z.string().trim().email().max(255).optional().or(z.literal(""));

export const SitePledgeGate = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (EXCLUDED_PATHS.some((p) => location.pathname.startsWith(p))) {
      setShow(false);
      return;
    }
    const status = localStorage.getItem(STORAGE_KEY);
    if (!status) setShow(true);
  }, [location.pathname]);

  const recordPledge = async (skipped: boolean, emailValue?: string) => {
    try {
      await supabase.from("site_pledges").insert({
        email: emailValue || null,
        skipped,
        user_agent: navigator.userAgent.slice(0, 500),
      });
    } catch {
      // Don't block the user if logging fails
    }
  };

  const handleAgree = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreed) {
      setError("Please check the box to agree before entering.");
      return;
    }

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError("Please enter a valid email or leave it blank.");
      return;
    }

    setSubmitting(true);
    await recordPledge(false, email.trim() || undefined);
    localStorage.setItem(STORAGE_KEY, "agreed");
    setShow(false);
    setSubmitting(false);
  };

  const handleSkip = async () => {
    await recordPledge(true);
    localStorage.setItem(STORAGE_KEY, "skipped");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pledge-title"
      aria-describedby="pledge-description"
    >
      <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6 sm:p-8 my-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <h2 id="pledge-title" className="text-2xl font-bold text-foreground">
            Before you enter
          </h2>
        </div>

        <p
          id="pledge-description"
          className="text-foreground leading-relaxed mb-6"
        >
          EncryptHer exists to protect women — many of whom face abuse,
          stalking, or surveillance every day. Before you enter, I pledge to
          use what I learn here to keep myself and others safer, and{" "}
          <strong>never to weaponize this knowledge against another person.</strong>
        </p>

        <form onSubmit={handleAgree} className="space-y-4">
          <div>
            <Label htmlFor="pledge-email" className="text-sm">
              Email <span className="text-muted-foreground font-normal">(optional — for safety updates)</span>
            </Label>
            <Input
              id="pledge-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              className="mt-1.5"
              disabled={submitting}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-ring cursor-pointer"
              disabled={submitting}
              aria-describedby="pledge-description"
            />
            <span className="text-sm text-foreground leading-relaxed">
              I agree to the pledge and will use this information responsibly.
            </span>
          </label>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={submitting}
          >
            {submitting ? "Entering..." : "Enter EncryptHer"}
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-border space-y-3 text-center">
          <a
            href="https://www.rainn.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-destructive hover:underline"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            In crisis right now? Call RAINN: 1-800-656-4673
          </a>
        </div>
      </div>
    </div>
  );
};

export default SitePledgeGate;
