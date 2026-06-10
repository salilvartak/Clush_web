// Supabase Edge Function: sends a waitlist confirmation email via Resend.
// Deploy with: supabase functions deploy send-waitlist-confirmation
// Requires the secret RESEND_API_KEY (and optionally RESEND_FROM_EMAIL) to be set:
//   supabase secrets set RESEND_API_KEY=re_xxx RESEND_FROM_EMAIL="Clush <hello@yourdomain.com>"

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") ?? "Clush <waitlist@clush.life>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Clush brand palette
const COLOR_CREAM = "#F5EFE6";
const COLOR_CARD = "#FFFFFF";
const COLOR_HEADING = "#2A2725";
const COLOR_INK = "#45413E";
const COLOR_INK_MUTED = "#756F68";
const COLOR_WINE = "#540F24";
const COLOR_BORDER = "#EAEAEE";

function buildEmailHtml(firstName: string, email: string) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>You're on the Clush waitlist</title>
  </head>
  <body style="margin:0; padding:0; background-color:${COLOR_CREAM}; font-family: Georgia, 'Times New Roman', serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLOR_CREAM}; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px;">

            <!-- Wordmark -->
            <tr>
              <td align="center" style="padding-bottom: 28px;">
                <span style="font-family: 'Trebuchet MS', Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 800; font-style: italic; letter-spacing: -0.02em; color: ${COLOR_WINE};">
                  Clush
                </span>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td style="background-color:${COLOR_CARD}; border: 1px solid ${COLOR_BORDER}; border-radius: 20px; padding: 40px 36px;">

                <h1 style="margin: 0 0 16px; font-family: 'Trebuchet MS', Helvetica, Arial, sans-serif; font-size: 26px; font-weight: 800; font-style: italic; letter-spacing: -0.02em; color: ${COLOR_HEADING}; text-align: center;">
                  You're on the list, ${escapeHtml(firstName)}.
                </h1>

                <p style="margin: 0 0 16px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.7; color: ${COLOR_INK}; text-align: center;">
                  Thanks for joining the <strong>Clush</strong> waitlist &mdash; a curated
                  community for intentional connection.
                </p>

                <p style="margin: 0 0 28px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.7; color: ${COLOR_INK}; text-align: center;">
                  We're opening spaces in small waves to make sure every member
                  gets the highest level of care. We'll email
                  <strong>${escapeHtml(email)}</strong> the moment a spot opens up for you.
                </p>

                <!-- Divider -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-top: 1px solid ${COLOR_BORDER}; padding-top: 24px;">
                      <p style="margin: 0 0 8px; font-family: Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: ${COLOR_WINE}; text-align: center;">
                        While you wait
                      </p>
                      <p style="margin: 0; font-family: Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.7; color: ${COLOR_INK_MUTED}; text-align: center;">
                        As a founding member, your feedback will directly shape the
                        Clush experience as we grow. Keep an eye on your inbox &mdash;
                        we'll be in touch soon.
                      </p>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 28px 16px 0;">
                <p style="margin: 0 0 4px; font-family: Helvetica, Arial, sans-serif; font-size: 13px; color: ${COLOR_INK_MUTED};">
                  With love, the Clush Team
                </p>
                <p style="margin: 0; font-family: Helvetica, Arial, sans-serif; font-size: 12px; color: ${COLOR_INK_MUTED};">
                  &copy; ${new Date().getFullYear()} Clush
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { name, email } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Missing email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const firstName = (name || "").trim().split(" ")[0] || "there";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: "You're on the Clush waitlist",
        html: buildEmailHtml(firstName, email),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ error: "Resend error", details: errText }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
