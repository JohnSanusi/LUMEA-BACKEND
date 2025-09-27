import express from "express";
import nodemailer from "nodemailer";
import { BREVO_USER, BREVO_PASSWORD, ADMIN_RECEIVER } from "../config/env.js";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: BREVO_USER,
    pass: BREVO_PASSWORD,
  },
});

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: `"Lumea Form bot" <sanusijohn0@gmail.com>`,
      to: ADMIN_RECEIVER,
      replyTo: email, // admin can reply directly to user
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
    console.error("Error sending contact message:", error);
    res.status(500).json({ error: "Failed to send contact message" });
  }
});


export default router;








