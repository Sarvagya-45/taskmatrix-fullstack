import express from "express";

import { askAI } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ===============================
// AI ROUTES
// ===============================

// All AI requests require authentication
router.use(authMiddleware);

// Ask AI
router.post("/", askAI);

export default router;
