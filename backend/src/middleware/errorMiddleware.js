import logger from "../services/logger.js";

export const notFoundMiddleware = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);

  res.status(404);

  next(error);
};

export const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    res.statusCode >= 400 ? res.statusCode : err.statusCode || 500;

  logger.error(
    {
      err,
      method: req.method,
      url: req.originalUrl,
    },
    "Request error",
  );

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? "Internal server error" : err.message,
  });
};
