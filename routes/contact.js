import express from "express";
import { ADMIN_RECEIVER, BREVO_API_KEY } from "../config/env.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { email: "sanusijohn0@gmail.com", name: "John Sanusi" },
        to: [{ email: ADMIN_RECEIVER }],
        replyTo: { email, name },
        subject: `New Contact Form Message: ${subject}`,
        htmlContent: `
          <h2>📩 New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong></p> ${subject}
          <p><strong>Message:</strong></p> <p style="white-space: pre-line;">${message}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Brevo API error: ${response.status} ${errorText}`);
    }

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("❌ Error sending contact message:", error);
    res.status(500).json({ error: "Failed to send contact message" });
  }
});

export default router;

