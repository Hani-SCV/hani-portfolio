import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  try {
    const { email, message } = JSON.parse(event.body ?? "{}");

    if (!email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Email and message are required.",
        }),
      };
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["gim325901@gmail.com"],
      subject: "[Portfolio] New Contact",
      html: `
        <h2>새 문의</h2>
        <p><strong>Email</strong>: ${email}</p>
        <p><strong>Message</strong></p>
        <div>${message.replace(/\n/g, "<br />")}</div>
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
