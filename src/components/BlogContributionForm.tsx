import { useState } from "react";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const contributionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  topic: z.string().trim().min(5, "Topic must be at least 5 characters").max(200, "Topic must be less than 200 characters"),
  story: z.string().trim().max(2000, "Story must be less than 2000 characters").optional(),
});

type ContributionFormData = z.infer<typeof contributionSchema>;

const BlogContributionForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<ContributionFormData>({
    name: '',
    email: '',
    topic: '',
    story: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContributionFormData, string>>>({});

  const handleChange = (field: keyof ContributionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const result = contributionSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContributionFormData, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof ContributionFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirm(true);
    }
  };

  const handleConfirmedSubmit = async () => {
    setShowConfirm(false);
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('blog_contributions')
        .insert([{
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          topic: formData.topic.trim(),
          story: formData.story?.trim() || null,
        }]);

      if (error) throw error;

      // Fire-and-forget email notification (with honeypot)
      const honeypotField = document.getElementById('contribution-website') as HTMLInputElement;
      const honeypotValue = honeypotField?.value || '';
      try {
        await supabase.functions.invoke('send-contribution-email', {
          body: {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            topic: formData.topic.trim(),
            story: formData.story?.trim() || undefined,
            website: honeypotValue,
          },
        });
      } catch (emailError) {
        console.error('Email notification failed (non-blocking):', emailError);
      }

      toast({
        title: "Thank you for your submission!",
        description: "We'll review your idea and be in touch soon.",
      });

      // Reset form
      setFormData({ name: '', email: '', topic: '', story: '' });
    } catch (error) {
      console.error('Contribution submission error:', error);
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      aria-labelledby="contribute-heading"
      className="bg-card border border-border rounded-lg p-6 md:p-8"
    >
      <h2 
        id="contribute-heading" 
        className="text-2xl font-bold text-foreground mb-2"
      >
        Share Your Story
      </h2>
      <p className="text-muted-foreground mb-6">
        Would you like to contribute and be featured on our blog? Share your topic or story idea with us, and we'll be in touch!
        You can also email your contribution directly to{" "}
        <a
          href="mailto:socialmedia@encrypther.org"
          className="text-primary underline hover:text-primary/80"
        >
          socialmedia@encrypther.org
        </a>.
      </p>

      <form onSubmit={handleSubmitClick} noValidate className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="contribution-name">
              Name <span className="text-destructive" aria-hidden="true">*</span>
            </Label>
            <Input
              id="contribution-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Your name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="min-h-[44px]"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contribution-email">
              Email <span className="text-destructive" aria-hidden="true">*</span>
            </Label>
            <Input
              id="contribution-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your.email@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="min-h-[44px]"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contribution-topic">
            Topic/Title <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Input
            id="contribution-topic"
            type="text"
            value={formData.topic}
            onChange={(e) => handleChange('topic', e.target.value)}
            placeholder="What would you like to write about?"
            aria-required="true"
            aria-invalid={!!errors.topic}
            aria-describedby={errors.topic ? "topic-error" : undefined}
            className="min-h-[44px]"
            disabled={isSubmitting}
          />
          {errors.topic && (
            <p id="topic-error" className="text-sm text-destructive" role="alert">
              {errors.topic}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contribution-story">
            Your Story (Optional)
          </Label>
          <Textarea
            id="contribution-story"
            value={formData.story}
            onChange={(e) => handleChange('story', e.target.value)}
            placeholder="Tell us more about your idea or share your story..."
            rows={4}
            aria-invalid={!!errors.story}
            aria-describedby={errors.story ? "story-error" : "story-hint"}
            className="min-h-[132px]"
            disabled={isSubmitting}
          />
          <p id="story-hint" className="text-sm text-muted-foreground">
            Maximum 2000 characters
          </p>
          {errors.story && (
            <p id="story-error" className="text-sm text-destructive" role="alert">
              {errors.story}
            </p>
          )}
        </div>

        {/* Honeypot field - hidden from real users */}
        <div className="absolute opacity-0 -z-10" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
          <label htmlFor="contribution-website">Website</label>
          <input
            id="contribution-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="min-h-[44px] w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" aria-hidden="true" />
              Submit Contribution
            </>
          )}
        </Button>
      </form>

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="Submit Your Contribution?"
        description="You're about to submit your blog contribution idea. We'll review it and get back to you at the email address you provided."
        confirmText="Submit"
        onConfirm={handleConfirmedSubmit}
      />
    </section>
  );
};

export default BlogContributionForm;
