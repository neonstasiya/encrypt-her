import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContributionPayload {
  name: string;
  email: string;
  topic: string;
  story?: string;
  website?: string; // honeypot field
}

const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_ANON = 3;
const RATE_LIMIT_AUTH = 10;
const RATE_WINDOW_SECONDS = 60;

async function isRateLimited(
  supabase: ReturnType<typeof createClient>,
  ip: string,
  functionName: string,
  limit: number
): Promise<boolean> {
  try {
    await supabase.rpc("cleanup_old_rate_limits");
  } catch {
    // Non-critical
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
    return false;
  }

  if ((count ?? 0) >= limit) {
    return true;
  }

  await supabase.from("edge_function_rate_limits").insert({
    ip_address: ip,
    function_name: functionName,
  });

  return false;
}

/**
 * Validate JWT from Authorization header.
 * Returns user ID if valid, null if anonymous/invalid.
 */
async function validateAuth(req: Request): Promise<{ userId: string | null; isAuthenticated: boolean }> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { userId: null, isAuthenticated: false };
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const anonClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data, error } = await anonClient.auth.getUser(token);

    if (error || !data?.user) {
      return { userId: null, isAuthenticated: false };
    }

    return { userId: data.user.id, isAuthenticated: true };
  } catch {
    return { userId: null, isAuthenticated: false };
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Validate JWT - authenticated users get higher rate limits
  const { isAuthenticated } = await validateAuth(req);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateLimit = isAuthenticated ? RATE_LIMIT_AUTH : RATE_LIMIT_ANON;

  if (await isRateLimited(supabase, clientIp, "send-contribution-email", rateLimit)) {
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
    const { name, email, topic, story, website }: ContributionPayload = await req.json();

    // Honeypot: if the hidden "website" field is filled, it's a bot
    if (website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!name || !email || !topic) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, topic" }),
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
    if (name.length > 100 || email.length > 255 || topic.length > 200 || (story && story.length > 2000)) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum length" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Sending contribution notification for: ${escapeHtml(name)}, topic: ${escapeHtml(topic)}, authenticated: ${isAuthenticated}`);

    const emailResponse = await resend.emails.send({
      from: "EncryptHer <noreply@encrypther.org>",
      to: ["socialmedia@encrypther.org"],
      subject: `New Blog Contribution: ${escapeHtml(topic)}`,
      html: `
        <h2>New Blog Contribution Submitted</h2>
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
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Topic:</td>
            <td style="padding: 8px;">${escapeHtml(topic)}</td>
          </tr>
          ${story ? `<tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Story:</td>
            <td style="padding: 8px;">${escapeHtml(story)}</td>
          </tr>` : ""}
        </table>
        <p style="margin-top: 16px; color: #666;">This submission is also saved in the admin dashboard.</p>
      `,
    });

    console.log("Contribution email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending contribution email:", message);
    return new Response(
      JSON.stringify({ error: "Failed to send submission. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
