import pino from "pino";
import env from "../config/env.js";

const logger = pino({
  level: env.nodeEnv === "production" ? "info" : "debug",

  transport:
    env.nodeEnv !== "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,

  base: {
    service: "fullstack-project-backend",
  },
});

export default logger;
