import { useState, useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { VisuallyHidden } from "@/components/VisuallyHidden";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

interface EmailGateFormProps {
  onSuccess: () => void;
}

export const EmailGateForm = ({ onSuccess }: EmailGateFormProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formId = useId();
  const errorId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate email
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      const errorMessage = validation.error.errors[0].message;
      setError(errorMessage);
      toast({
        title: "Invalid Email",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Store email in database
      const { error: dbError } = await supabase
        .from("safety_guide_emails")
        .insert({ email: email.trim().toLowerCase() });

      if (dbError) throw dbError;

      // Store in localStorage for persistence
      localStorage.setItem("safety_guide_access", "true");
      localStorage.setItem("safety_guide_email", email);

      toast({
        title: "Access Granted! 🎉",
        description: "Enjoy your complete safety guide.",
      });

      // Grant access
      onSuccess();
    } catch (err: any) {
      console.error("Error submitting email:", err);
      const errorMessage = "There was an issue. Please try again.";
      setError(errorMessage);
      toast({
        title: "Submission Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="email-gate" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50" aria-labelledby={`${formId}-heading`}>
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8 md:p-12 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 text-white shadow-elegant">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4" aria-hidden="true">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 id={`${formId}-heading`} className="text-3xl md:text-4xl font-bold mb-4">
              Unlock Your Complete Safety Guide
            </h2>
            <p id={`${formId}-desc`} className="text-lg text-white/90">
              Enter your email to access all 12 keys to personal safety. We'll also send you the downloadable PDF guide.
            </p>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            aria-describedby={`${formId}-desc`}
            noValidate
          >
            {/* Status announcer for screen readers */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {isSubmitting ? "Submitting your email..." : ""}
            </div>
            
            <div className="relative">
              <label htmlFor={`${formId}-email`} className="sr-only">
                Email address
              </label>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <Input
                id={`${formId}-email`}
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                className="pl-10 h-12 bg-white text-foreground"
                required
                disabled={isSubmitting}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? errorId : undefined}
                autoComplete="email"
              />
              {error && (
                <p id={errorId} className="text-sm text-yellow-200 mt-2" role="alert">
                  {error}
                </p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 bg-white text-purple-600 hover:bg-white/90 font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Unlocking...</span>
                  <VisuallyHidden>Please wait</VisuallyHidden>
                </>
              ) : (
                "Unlock Full Guide"
              )}
            </Button>
          </form>

          <p className="text-sm text-white/70 text-center mt-4">
            <span aria-hidden="true">🔒</span> We respect your privacy. Your email will only be used to send you valuable safety resources.
          </p>
        </Card>
      </div>
    </section>
  );
};
