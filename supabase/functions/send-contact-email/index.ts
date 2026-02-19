import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot field
}

const subjectLabels: Record<string, string> = {
  general: "General Inquiry",
  support: "Support Request",
  partnership: "Partnership Opportunity",
  media: "Media Inquiry",
  other: "Other",
};

const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT = 5;
const RATE_WINDOW_SECONDS = 60;

async function isRateLimited(
  supabase: ReturnType<typeof createClient>,
  ip: string,
  functionName: string
): Promise<boolean> {
  // Clean up old entries periodically
  try {
    await supabase.rpc("cleanup_old_rate_limits");
  } catch {
    // Non-critical, continue
  }

  const windowStart = new Date(Date.now() - RATE_WINDOW_SECONDS * 1000).toISOString();

  const { count, error } = await supabase
    .from("edge_function_rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("ip_address", ip)
    .eq("function_name", functionName)
    .gte("created_at", windowStart);

  if (error) {
    console.error("Rate limit check error:", error.message);
    return false; // Fail open to not block legitimate users
  }

  if ((count ?? 0) >= RATE_LIMIT) {
    return true;
  }

  // Record this request
  await supabase.from("edge_function_rate_limits").insert({
    ip_address: ip,
    function_name: functionName,
  });

  return false;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Create Supabase client with service role for rate limiting
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Database-backed rate limiting (persistent across cold starts)
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (await isRateLimited(supabase, clientIp, "send-contact-email")) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(apiKey);
    const { name, email, subject, message, website }: ContactPayload = await req.json();

    // Honeypot: if the hidden "website" field is filled, it's a bot
    if (website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format server-side
    if (!EMAIL_REGEX.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate input lengths
    if (name.length > 100 || email.length > 255 || subject.length > 100 || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum length" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const subjectLabel = subjectLabels[subject] || escapeHtml(subject);

    console.log(`Sending contact notification from: ${escapeHtml(name)}, subject: ${subjectLabel}`);

    const emailResponse = await resend.emails.send({
      from: "EncryptHer <noreply@encrypther.org>",
      to: ["info@encrypther.org"],
      replyTo: email,
      subject: `Contact Form: ${subjectLabel} - ${escapeHtml(name)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Name:</td>
            <td style="padding: 8px;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Email:</td>
            <td style="padding: 8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Subject:</td>
            <td style="padding: 8px;">${subjectLabel}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 8px;">${escapeHtml(message)}</td>
          </tr>
        </table>
        <p style="margin-top: 16px; color: #666;">This message is also saved in the admin dashboard.</p>
      `,
    });

    console.log("Contact email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending contact email:", message);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
