import express from "express";
import nodemailer from "nodemailer";
import sendinblueTransport from "nodemailer-sendinblue-transport";
import { ADMIN_RECEIVER, BREVO_API_KEY } from "../config/env.js";

const router = express.Router();

// Use Brevo API transport instead of SMTP
const transporter = nodemailer.createTransport(
  sendinblueTransport({
    apiKey: BREVO_API_KEY, // put this in Render env
  })
);

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: "sanusijohn0@gmail.com", // must be a verified sender in Brevo
      to: ADMIN_RECEIVER,
      replyTo: email,
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <h2>📩 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-line;">${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("❌ Error sending contact message:", error);
    res.status(500).json({ error: "Failed to send contact message" });
  }
});

export default router;
