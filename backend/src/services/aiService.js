import OpenAI from "openai";

import env from "../config/env.js";
import logger from "./logger.js";

// ===============================
// OPENAI CLIENT
// ===============================

const openai = new OpenAI({
  apiKey: env.openaiApiKey,
});

// ===============================
// AI RESPONSE
// ===============================

export const generateAIResponse = async ({ message, user }) => {
  try {
    if (!env.openaiApiKey) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",

      instructions: `
You are an AI productivity assistant inside a task management application.

Help users with:
- Task planning
- Breaking large tasks into smaller tasks
- Prioritization
- Productivity suggestions
- Time management
- Writing clear task descriptions

Keep responses practical, concise and easy to understand.

The user's name is:
${user?.name || "User"}
      `,

      input: message,

      max_output_tokens: 500,
    });

    const output = response.output_text?.trim();

    if (!output) {
      throw new Error("AI returned an empty response");
    }

    return output;
  } catch (error) {
    logger.error(
      {
        err: error,
      },
      "OpenAI request failed",
    );

    throw new Error("Unable to generate AI response. Please try again later.");
  }
};
