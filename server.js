import express from "express";
import cors from "cors";
import payment from "./routes/payment.js";
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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/payment", payment);
app.use("/api/contact", contact);

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
});
