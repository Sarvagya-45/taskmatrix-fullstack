import { generateAIResponse } from "../services/aiService.js";

// ===============================
// AI ASSISTANT
// ===============================

export const askAI = async (req, res, next) => {
  try {
    const { message } = req.body;

    // Validate message
    if (!message || !message.trim()) {
      res.status(400);
      throw new Error("Message is required");
    }

    // Limit message length
    if (message.trim().length > 2000) {
      res.status(400);
      throw new Error("Message must be 2000 characters or less");
    }

    // Send request to AI service
    const response = await generateAIResponse({
      message: message.trim(),
      user: req.user,
    });

    res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: {
        response,
      },
    });
  } catch (error) {
    next(error);
  }
};
