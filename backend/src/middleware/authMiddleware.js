import jwt from "jsonwebtoken";

import User from "../models/User.js";
import env from "../config/env.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Authentication required");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Authentication token is missing");
    }

    const decoded = jwt.verify(token, env.jwtSecret);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User no longer exists");
    }

    req.user = user;

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      res.status(401);
      return next(new Error("Invalid or expired authentication token"));
    }

    next(error);
  }
};

export default authMiddleware;
