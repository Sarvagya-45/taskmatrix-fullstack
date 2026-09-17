import app from "./app.js";
import env from "./config/env.js";
import connectDatabase from "./config/db.js";
import logger from "./services/logger.js";

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(env.port, () => {
      logger.info(`🚀 Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    logger.error(
      {
        err: error,
      },
      "Failed to start server",
    );

    process.exit(1);
  }
};

startServer();
