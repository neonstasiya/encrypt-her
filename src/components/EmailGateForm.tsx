import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

interface EmailGateFormProps {
  onSuccess: () => void;
}

export const EmailGateForm = ({ onSuccess }: EmailGateFormProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      toast({
        title: "Invalid Email",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Store email in database
      const { error } = await supabase
        .from("safety_guide_emails")
        .insert({ email: email.trim().toLowerCase() });

      if (error) throw error;

      // Store in localStorage for persistence
      localStorage.setItem("safety_guide_access", "true");
      localStorage.setItem("safety_guide_email", email);

      toast({
        title: "Access Granted! 🎉",
        description: "Enjoy your complete safety guide.",
      });

      // Grant access
      onSuccess();
    } catch (error: any) {
      console.error("Error submitting email:", error);
      toast({
        title: "Submission Error",
        description: "There was an issue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="email-gate" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8 md:p-12 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 text-white shadow-elegant">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unlock Your Complete Safety Guide
            </h2>
            <p className="text-lg text-white/90">
              Enter your email to access all 12 keys to personal safety. We'll also send you the downloadable PDF guide.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-white text-foreground"
                required
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 bg-white text-purple-600 hover:bg-white/90 font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Unlocking..." : "Unlock Full Guide"}
            </Button>
          </form>

          <p className="text-sm text-white/70 text-center mt-4">
            We respect your privacy. Your email will only be used to send you valuable safety resources.
          </p>
        </Card>
      </div>
    </section>
  );
};
