import express from "express";
import {  BREVO_API_KEY } from "../config/env.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/account", {
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY, // make sure this is the API key, not SMTP
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Brevo test failed:", error);
    res.status(500).json({ error: "Failed to connect to Brevo" });
  }
});

export default router;
