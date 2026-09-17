import helmet from "helmet";
import cors from "cors";
import env from "../config/env.js";

export const securityMiddleware = helmet();

export const corsMiddleware = cors({
  origin: env.frontendUrl,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
