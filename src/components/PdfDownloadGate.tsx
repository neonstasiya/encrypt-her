import { useState, useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255),
});

interface PdfDownloadGateProps {
  pdfUrl: string;
  pdfFilename: string;
  guideTitle: string;
  source: string;
  triggerLabel?: string;
  triggerSize?: "default" | "sm" | "lg";
  triggerVariant?: "default" | "outline" | "secondary" | "ghost";
  triggerClassName?: string;
}

export const PdfDownloadGate = ({
  pdfUrl,
  pdfFilename,
  guideTitle,
  source,
  triggerLabel = "Download PDF",
  triggerSize = "lg",
  triggerVariant = "default",
  triggerClassName,
}: PdfDownloadGateProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formId = useId();
  const errorId = useId();

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      const msg = validation.error.errors[0].message;
      setError(msg);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from("safety_guide_emails")
        .insert({
          email: email.trim().toLowerCase(),
          source: "safety_guide",
          interests: {
            guide: source,
            guide_title: guideTitle,
            subscribed_to_updates: subscribe,
          },
        });

      // Ignore unique-violation errors silently — still let them download
      if (dbError && !dbError.message.toLowerCase().includes("duplicate")) {
        console.error("Email signup error:", dbError);
      }

      toast({
        title: "Thanks! Your download is starting 📥",
        description: subscribe
          ? "We'll email you when new guides and resources are published."
          : "Enjoy the guide!",
      });

      triggerDownload();
      setOpen(false);
      setEmail("");
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={triggerSize} variant={triggerVariant} className={triggerClassName}>
          <Download className="mr-2 h-5 w-5" aria-hidden="true" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get your free PDF</DialogTitle>
          <DialogDescription>
            Enter your email to download <strong>{guideTitle}</strong>. We'll send the
            PDF straight to your inbox and (optionally) keep you posted on new resources.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2" noValidate>
          <div className="space-y-2">
            <Label htmlFor={`${formId}-email`}>Email address</Label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id={`${formId}-email`}
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                className="pl-9 h-11"
                required
                disabled={isSubmitting}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? errorId : undefined}
                autoComplete="email"
              />
            </div>
            {error && (
              <p id={errorId} className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3">
            <Checkbox
              id={`${formId}-subscribe`}
              checked={subscribe}
              onCheckedChange={(v) => setSubscribe(v === true)}
              disabled={isSubmitting}
              className="mt-0.5"
            />
            <Label
              htmlFor={`${formId}-subscribe`}
              className="text-sm font-normal leading-relaxed cursor-pointer"
            >
              Notify me when new guides, courses, and safety resources are added to
              EncryptHer. (You can unsubscribe anytime.)
            </Label>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Preparing your download...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Send & Download PDF
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            🔒 We respect your privacy. Your email is only used for safety resources.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
