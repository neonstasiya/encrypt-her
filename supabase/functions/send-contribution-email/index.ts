import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(apiKey);
    const { name, email, topic, story }: ContributionPayload = await req.json();

    if (!name || !email || !topic) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, topic" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Sending contribution notification for: ${name} (${email}), topic: ${topic}`);

    const emailResponse = await resend.emails.send({
      from: "EncryptHer <noreply@encrypther.org>",
      to: ["socialmedia@encrypther.org"],
      subject: `New Blog Contribution: ${topic}`,
      html: `
        <h2>New Blog Contribution Submitted</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Name:</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Email:</td>
            <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Topic:</td>
            <td style="padding: 8px;">${topic}</td>
          </tr>
          ${story ? `<tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Story:</td>
            <td style="padding: 8px;">${story}</td>
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
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
