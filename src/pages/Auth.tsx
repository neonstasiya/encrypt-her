import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { SkipLink } from "@/components/SkipLink";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Lock, Mail } from "lucide-react";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormValues = z.infer<typeof authSchema>;

const Auth = () => {
  usePageTitle("Sign In | EncryptHer");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signUp, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user && !authLoading) {
      navigate(from, { replace: true });
    }
  }, [user, authLoading, navigate, from]);

  const handleSignIn = async (values: AuthFormValues) => {
    setIsSubmitting(true);
    const { error } = await signIn(values.email, values.password);
    setIsSubmitting(false);

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Please confirm your email before signing in.");
      } else {
        toast.error(error.message);
      }
      return;
    }

    toast.success("Welcome back!");
  };

  const handleSignUp = async (values: AuthFormValues) => {
    setIsSubmitting(true);
    const { error } = await signUp(values.email, values.password);
    setIsSubmitting(false);

    if (error) {
      if (error.message.includes("User already registered")) {
        toast.error("An account with this email already exists. Please sign in instead.");
        setActiveTab("signin");
      } else {
        toast.error(error.message);
      }
      return;
    }

    toast.success("Account created! You can now sign in.");
    setActiveTab("signin");
    form.reset();
  };

  const onSubmit = async (values: AuthFormValues) => {
    if (activeTab === "signin") {
      await handleSignIn(values);
    } else {
      await handleSignUp(values);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content" className="flex-grow flex items-center justify-center px-4 py-16" role="main">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <CardTitle className="text-2xl">Welcome to EncryptHer</CardTitle>
            <CardDescription>
              Sign in to access admin features or create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "signin" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              className="pl-10 min-h-[44px]"
                              autoComplete="email"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage role="alert" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-10 min-h-[44px]"
                              autoComplete={activeTab === "signin" ? "current-password" : "new-password"}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage role="alert" />
                      </FormItem>
                    )}
                  />

                  <TabsContent value="signin" className="mt-0 pt-2">
                    <Button
                      type="submit"
                      className="w-full min-h-[44px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="signup" className="mt-0 pt-2">
                    <Button
                      type="submit"
                      className="w-full min-h-[44px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </TabsContent>
                </form>
              </Form>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default Auth;
