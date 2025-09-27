import express from "express";
import nodemailer from "nodemailer";
import sendinblueTransport from "nodemailer-sendinblue-transport";
import { ADMIN_RECEIVER, BREVO_API_KEY } from "../config/env.js";

const router = express.Router();

// Use Brevo API transport (no SMTP wahala)
const transporter = nodemailer.createTransport(
  sendinblueTransport({
    apiKey: BREVO_API_KEY, // make sure this is set in Render env
  })
);

router.post("/", async (req, res) => {
  try {
    const { phone, items, totalItems } = req.body;

    if (!phone || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required order details" });
    }

    // Format HTML table for the order
    const tableRows = items
      .map(
        (item, index) => `
        <tr>
          <td style="text-align:center; padding:8px; border:1px solid #ddd;">${index + 1}</td>
          <td style="padding:8px; border:1px solid #ddd;">
            <img src="${item.image}" alt="Product" width="60" height="60" style="object-fit:cover; border-radius:6px;" />
          </td>
          <td style="padding:8px; border:1px solid #ddd;">${item.category}</td>
          <td style="padding:8px; border:1px solid #ddd;">${item.quantity}</td>
        </tr>
      `
      )
      .join("");

    const htmlBody = `
      <h2>🛒 New Order from Lumea</h2>
      <p><b>Phone Number:</b> ${phone}</p>
      <p><b>Total Items:</b> ${totalItems}</p>

      <table style="border-collapse:collapse; width:100%; font-family:sans-serif; margin-top:16px;">
        <thead>
          <tr style="background:#f4f4f4;">
            <th style="padding:8px; border:1px solid #ddd;">#</th>
            <th style="padding:8px; border:1px solid #ddd;">Image</th>
            <th style="padding:8px; border:1px solid #ddd;">Category</th>
            <th style="padding:8px; border:1px solid #ddd;">Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;

    const mailOptions = {
      from: "sanusijohn0@gmail.com", // must be verified in Brevo
      to: ADMIN_RECEIVER,
      subject: "🛒 New Lumea Order",
      html: htmlBody,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Order sent successfully" });
  } catch (error) {
    console.error("❌ Error sending order:", error);
    res.status(500).json({ error: "Failed to send order" });
  }
});

export default router;
