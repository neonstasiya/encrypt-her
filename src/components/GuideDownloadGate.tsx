import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255),
});

interface GuideDownloadGateProps {
  pdfUrl: string;
  pdfFilename?: string;
  guideName: string;
  /** Render as the trigger button. If omitted, default Download PDF button is rendered. */
  triggerLabel?: string;
  triggerVariant?: "default" | "outline" | "secondary" | "ghost";
  triggerSize?: "default" | "sm" | "lg";
  triggerClassName?: string;
}

export const GuideDownloadGate = ({
  pdfUrl,
  pdfFilename,
  guideName,
  triggerLabel = "Download PDF",
  triggerVariant = "default",
  triggerSize = "lg",
  triggerClassName,
}: GuideDownloadGateProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeUpdates, setSubscribeUpdates] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    if (pdfFilename) link.download = pdfFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase
        .from("safety_guide_emails")
        .insert({
          email: parsed.data.email.toLowerCase(),
          source: "safety_guide",
          interests: subscribeUpdates ? ["content_updates", guideName] : [guideName],
        });

      // Ignore duplicate-email errors so users can re-download
      if (dbError && !dbError.message.toLowerCase().includes("duplicate")) {
        throw dbError;
      }

      toast({
        title: "Thanks! Your download is starting.",
        description: subscribeUpdates
          ? "We'll email you when new guides and content are published."
          : "Enjoy the guide.",
      });

      triggerDownload();
      setOpen(false);
      setEmail("");
    } catch (err) {
      console.error("Guide gate error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size={triggerSize} className={triggerClassName}>
          <Download className="mr-2 h-5 w-5" aria-hidden="true" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
            Get the {guideName}
          </DialogTitle>
          <DialogDescription>
            Enter your email to download the PDF. We'll only use it to send updates
            about new safety content if you opt in.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="guide-gate-email">Email address</Label>
            <Input
              id="guide-gate-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              required
              disabled={submitting}
              aria-invalid={!!error}
              aria-describedby={error ? "guide-gate-error" : undefined}
            />
            {error && (
              <p id="guide-gate-error" className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-start gap-3 rounded-md border border-border bg-muted/30 p-3">
            <Checkbox
              id="guide-gate-updates"
              checked={subscribeUpdates}
              onCheckedChange={(v) => setSubscribeUpdates(v === true)}
              disabled={submitting}
              className="mt-0.5"
            />
            <Label
              htmlFor="guide-gate-updates"
              className="text-sm font-normal leading-snug cursor-pointer"
            >
              Email me when new guides and safety content are added to the site.
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Preparing download…
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Send & Download
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            🔒 We respect your privacy. Unsubscribe any time.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
