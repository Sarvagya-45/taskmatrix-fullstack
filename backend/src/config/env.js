import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = ["MONGODB_URI", "JWT_SECRET", "OPENAI_API_KEY"];

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    console.warn(`⚠️ Missing environment variable: ${variable}`);
  }
}

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,

  mongodbUri: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET,

  openaiApiKey: process.env.OPENAI_API_KEY,

  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};

export default env;
