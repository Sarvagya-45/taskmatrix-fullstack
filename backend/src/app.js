import express from "express";
import pinoHttp from "pino-http";

import logger from "./services/logger.js";

import { securityMiddleware, corsMiddleware } from "./middleware/security.js";

import { apiLimiter } from "./middleware/rateLimiter.js";

import {
  notFoundMiddleware,
  errorMiddleware,
} from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// ===============================
// SECURITY
// ===============================

app.disable("x-powered-by");

app.use(securityMiddleware);

app.use(corsMiddleware);

// ===============================
// LOGGER
// ===============================

app.use(
  pinoHttp({
    logger,
  }),
);

// ===============================
// BODY PARSER
// ===============================

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  }),
);

// ===============================
// API RATE LIMITER
// ===============================

app.use("/api", apiLimiter);

// ===============================
// HEALTH CHECK
// ===============================

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend server is running",
    environment: process.env.NODE_ENV || "development",
  });
});

// ===============================
// AUTH ROUTES
// ===============================

app.use("/api/auth", authRoutes);

// ===============================
// TASK ROUTES
// ===============================

app.use("/api/tasks", taskRoutes);

// ===============================
// AI ROUTES
// ===============================

app.use("/api/ai", aiRoutes);

// ===============================
// 404 HANDLER
// ===============================

app.use(notFoundMiddleware);

// ===============================
// GLOBAL ERROR HANDLER
// ===============================

app.use(errorMiddleware);

export default app;
