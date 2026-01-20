import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Loader2 } from "lucide-react";
import { VisuallyHidden } from "@/components/VisuallyHidden";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  interests: z.array(z.string()).min(1, { message: "Please select at least one interest" })
});

type FormData = z.infer<typeof formSchema>;

const interestOptions = [
  { id: "classes", label: "📚 New Classes & Workshops" },
  { id: "guides", label: "📖 Safety Guides & Resources" },
  { id: "news", label: "📰 Community News & Updates" },
  { id: "tips", label: "🎯 Exclusive Tips & Tutorials" }
];

export const NewsletterForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formId = useId();
  const statusId = useId();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      interests: []
    }
  });

  const onSubmit = async (data: FormData) => {
    // Check localStorage to prevent duplicate signups
    const hasSignedUp = localStorage.getItem("newsletter_signup");
    if (hasSignedUp) {
      toast({
        title: "Already subscribed",
        description: "You're already on our newsletter list!",
        variant: "default"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("safety_guide_emails")
        .insert({
          email: data.email.toLowerCase().trim(),
          source: "newsletter",
          interests: data.interests,
          subscribed_at: new Date().toISOString(),
          active: true
        });

      if (error) {
        // Handle duplicate email error gracefully
        if (error.code === "23505") {
          toast({
            title: "Already subscribed",
            description: "This email is already on our newsletter list!",
            variant: "default"
          });
          localStorage.setItem("newsletter_signup", "true");
          setIsSubmitted(true);
        } else {
          throw error;
        }
      } else {
        localStorage.setItem("newsletter_signup", "true");
        setIsSubmitted(true);
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for joining the EncryptHer community.",
        });
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      toast({
        title: "Subscription failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-border bg-card/50 backdrop-blur-sm" role="status" aria-live="polite">
        <CardContent className="pt-6">
          <div className="text-center py-8 animate-fade-in">
            <div className="mb-4 flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-foreground">Welcome to EncryptHer!</h3>
            <p className="text-muted-foreground">
              Thank you for subscribing. Check your inbox for a confirmation email.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl" id={`${formId}-title`}>Subscribe to Our Newsletter</CardTitle>
        <CardDescription id={`${formId}-desc`}>
          Choose what you'd like to receive and we'll keep you updated
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-6"
            aria-labelledby={`${formId}-title`}
            aria-describedby={`${formId}-desc`}
          >
            {/* Status announcer for screen readers */}
            <div aria-live="polite" aria-atomic="true" className="sr-only" id={statusId}>
              {isLoading ? "Submitting your subscription..." : ""}
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <FormLabel>I'm interested in:</FormLabel>
                  <div className="space-y-3">
                    {interestOptions.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, option.id]
                                    : field.value.filter((value) => value !== option.id);
                                  field.onChange(newValue);
                                }}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
                aria-describedby={isLoading ? statusId : undefined}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Subscribing...</span>
                    <VisuallyHidden>Please wait</VisuallyHidden>
                  </>
                ) : (
                  "Subscribe to Newsletter"
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center" aria-hidden="true">
              🔒 We respect your privacy. Unsubscribe anytime. No spam, ever.
            </p>
            <VisuallyHidden>
              We respect your privacy. You can unsubscribe anytime. We never send spam.
            </VisuallyHidden>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
