import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const handler: Handler = async (event) => {
  try {
    const { email, message } = JSON.parse(event.body ?? "{}");

    if (typeof email !== "string" || typeof message !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Invalid request.",
        }),
      };
    }

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Invalid email address.",
        }),
      };
    }

    if (trimmedMessage.length < 10 || trimmedMessage.length > 1000) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Message must be between 10 and 1000 characters.",
        }),
      };
    }

    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br />");

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["gim325901@gmail.com"],
      subject: "[Portfolio] New Contact",
      html: `
        <h2>새 문의</h2>
        <p><strong>Email</strong>: ${safeEmail}</p>
        <p><strong>Message</strong></p>
        <div>${safeMessage}</div>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
      }),
    };
  } catch (error) {
    console.error("Contact API Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Failed to send email.",
      }),
    };
  }
};
