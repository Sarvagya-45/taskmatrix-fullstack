import express from "express";

import { register, login, getMe } from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Register
router.post("/register", authLimiter, register);

// Login
router.post("/login", authLimiter, login);

// Current logged-in user
router.get("/me", authMiddleware, getMe);

export default router;
