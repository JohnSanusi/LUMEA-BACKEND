import express from "express";
import cors from "cors";
import order from "./routes/order.js";
import contact from "./routes/contact.js";
import { PORT } from "./config/env.js";

const app = express();

const allowedOrigins = [
  "https://lumeax.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // 💥 THIS LINE IS MISSING
  })
);

app.use(express.json());
app.use("/api/order", order);
app.use("/api/contact", contact);

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
});
