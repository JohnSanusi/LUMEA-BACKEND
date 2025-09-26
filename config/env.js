import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  BREVO_USER,
  BREVO_PASSWORD,
  ADMIN_RECEIVER,
} = process.env;
