import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useId } from "react";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  usePageMeta();
  const formId = useId();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Get honeypot value
      const honeypotField = document.getElementById(`${formId}-website`) as HTMLInputElement;
      const honeypotValue = honeypotField?.value || '';

      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
          },
        ]);

      if (error) throw error;

      // Fire-and-forget email notification (with honeypot)
      try {
        await supabase.functions.invoke('send-contact-email', {
          body: {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            website: honeypotValue,
          },
        });
      } catch (emailError) {
        console.error('Contact email notification failed (non-blocking):', emailError);
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10" aria-labelledby="contact-heading">
          <div className="max-w-4xl mx-auto text-center">
            <h1 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or want to get involved? We'd love to hear from you. 
              Reach out through any of the channels below.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 px-4" aria-label="Contact information and form">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-16" role="list" aria-label="Contact methods">
              <Card role="listitem">
                <CardHeader>
                  <Mail className="w-8 h-8 text-primary mb-2" aria-hidden="true" />
                  <h2 className="text-2xl font-semibold leading-none tracking-tight">General Inquiries</h2>
                </CardHeader>
                <CardContent>
                  <a href="mailto:info@encrypther.org" className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded">
                    info@encrypther.org
                  </a>
                </CardContent>
              </Card>

              <Card role="listitem">
                <CardHeader>
                  <Mail className="w-8 h-8 text-primary mb-2" aria-hidden="true" />
                  <h2 className="text-2xl font-semibold leading-none tracking-tight">Support</h2>
                </CardHeader>
                <CardContent>
                  <a href="mailto:support@encrypther.org" className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded">
                    support@encrypther.org
                  </a>
                </CardContent>
              </Card>

              <Card role="listitem">
                <CardHeader>
                  <Mail className="w-8 h-8 text-primary mb-2" aria-hidden="true" />
                  <h2 className="text-2xl font-semibold leading-none tracking-tight">Media &amp; Press</h2>
                </CardHeader>
                <CardContent>
                  <a href="mailto:media@encrypther.org" className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded">
                    media@encrypther.org
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 id={`${formId}-title`} className="text-3xl font-bold mb-4">Send Us a Message</h2>
                <p id={`${formId}-desc`} className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24-48 hours.
                </p>
                
                <form 
                  onSubmit={handleSubmit(onSubmit)} 
                  className="space-y-6"
                  aria-labelledby={`${formId}-title`}
                  aria-describedby={`${formId}-desc`}
                  noValidate
                >
                  {/* Live region for form status */}
                  <div aria-live="polite" aria-atomic="true" className="sr-only">
                    {isSubmitting ? "Sending your message..." : ""}
                  </div>
                  
                  <div>
                    <label htmlFor={`${formId}-name`} className="block text-sm font-medium mb-2">
                      Name <span aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <Input
                      id={`${formId}-name`}
                      {...register("name")}
                      placeholder="Your full name"
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                    />
                    {errors.name && (
                      <p id={`${formId}-name-error`} className="text-sm text-destructive mt-1" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                </div>

                  <div>
                    <label htmlFor={`${formId}-email`} className="block text-sm font-medium mb-2">
                      Email <span aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <Input
                      id={`${formId}-email`}
                      type="email"
                      {...register("email")}
                      placeholder="your.email@example.com"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p id={`${formId}-email-error`} className="text-sm text-destructive mt-1" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={`${formId}-subject`} className="block text-sm font-medium mb-2">
                      Subject <span aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <select
                      id={`${formId}-subject`}
                      {...register("subject")}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={errors.subject ? `${formId}-subject-error` : undefined}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Support Request</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="media">Media Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p id={`${formId}-subject-error`} className="text-sm text-destructive mt-1" role="alert">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={`${formId}-message`} className="block text-sm font-medium mb-2">
                      Message <span aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <Textarea
                      id={`${formId}-message`}
                      {...register("message")}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                    />
                    {errors.message && (
                      <p id={`${formId}-message-error`} className="text-sm text-destructive mt-1" role="alert">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Honeypot field - hidden from real users */}
                  <div className="absolute opacity-0 -z-10" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
                    <label htmlFor={`${formId}-website`}>Website</label>
                    <input
                      id={`${formId}-website`}
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <Clock className="w-8 h-8 text-primary mb-2" aria-hidden="true" />
                    <h2 className="text-2xl font-semibold leading-none tracking-tight">Response Time</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We typically respond to all inquiries within 24-48 hours during business days. 
                      For urgent safety concerns, please contact the emergency resources listed below.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-semibold leading-none tracking-tight">Frequently Asked Questions</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Looking for quick answers? Check out our FAQ section for common questions about 
                      our programs, resources, and services.
                    </p>
                    <Link to="/safety-guides">
                      <Button variant="outline" className="w-full">Visit Safety Guides</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-destructive/5 border-destructive/20" role="region" aria-label="Emergency contact information">
                  <CardHeader>
                    <Phone className="w-8 h-8 text-destructive mb-2" aria-hidden="true" />
                    <h2 className="text-2xl font-semibold leading-none tracking-tight">Emergency Resources</h2>
                    <CardDescription>If you're in immediate danger, contact emergency services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2" role="list">
                      <li><strong>Emergency:</strong> <a href="tel:911" className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded">911</a></li>
                      <li><strong>National Domestic Violence Hotline:</strong> <a href="tel:1-800-799-7233" className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded">1-800-799-7233</a></li>
                      <li><strong>National Sexual Assault Hotline:</strong> <a href="tel:1-800-656-4673" className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded">1-800-656-4673</a></li>
                      <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default Contact;
