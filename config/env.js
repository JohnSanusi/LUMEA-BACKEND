import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  BREVO_API_KEY,
  ADMIN_RECEIVER,
} = process.env;

