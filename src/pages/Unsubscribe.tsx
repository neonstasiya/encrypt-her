import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, MailX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { SkipLink } from "@/components/SkipLink";

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "done" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    document.title = "Unsubscribe | EncryptHer";
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } }
        );
        const data = await res.json();
        if (data.valid) setState("valid");
        else if (data.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  const handleConfirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success || data?.reason === "already_unsubscribed") setState("done");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SkipLink />
      <AccessibleHeader />
      <main id="main-content" className="flex-1 flex items-center justify-center px-4 py-16">
        <Card className="max-w-md w-full p-8 text-center space-y-4">
          {state === "loading" && (
            <>
              <Loader2 className="h-10 w-10 mx-auto animate-spin text-primary" aria-hidden="true" />
              <h1 className="text-2xl font-bold">Checking your link…</h1>
            </>
          )}
          {state === "valid" && (
            <>
              <MailX className="h-12 w-12 mx-auto text-primary" aria-hidden="true" />
              <h1 className="text-2xl font-bold">Unsubscribe from EncryptHer updates?</h1>
              <p className="text-muted-foreground">
                You'll stop receiving the weekly content digest and any download notifications.
              </p>
              <Button size="lg" onClick={handleConfirm} className="w-full">
                Yes, unsubscribe me
              </Button>
            </>
          )}
          {state === "submitting" && (
            <>
              <Loader2 className="h-10 w-10 mx-auto animate-spin text-primary" aria-hidden="true" />
              <h1 className="text-2xl font-bold">Unsubscribing…</h1>
            </>
          )}
          {state === "done" && (
            <>
              <CheckCircle2 className="h-12 w-12 mx-auto text-primary" aria-hidden="true" />
              <h1 className="text-2xl font-bold">You're unsubscribed</h1>
              <p className="text-muted-foreground">
                We won't email you again. You can still browse all guides anytime at encrypther.org.
              </p>
            </>
          )}
          {state === "already" && (
            <>
              <CheckCircle2 className="h-12 w-12 mx-auto text-primary" aria-hidden="true" />
              <h1 className="text-2xl font-bold">Already unsubscribed</h1>
              <p className="text-muted-foreground">This email is no longer on our list.</p>
            </>
          )}
          {(state === "invalid" || state === "error") && (
            <>
              <XCircle className="h-12 w-12 mx-auto text-destructive" aria-hidden="true" />
              <h1 className="text-2xl font-bold">
                {state === "invalid" ? "Invalid link" : "Something went wrong"}
              </h1>
              <p className="text-muted-foreground">
                {state === "invalid"
                  ? "This unsubscribe link is missing or expired."
                  : "Please try again in a moment."}
              </p>
            </>
          )}
        </Card>
      </main>
      <AccessibleFooter />
    </div>
  );
};

export default Unsubscribe;
