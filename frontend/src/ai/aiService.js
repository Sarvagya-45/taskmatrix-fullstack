import api from "../../services/api.js";

// ===============================
// ASK AI
// ===============================

export const askAI = async (message) => {
  if (!message || !message.trim()) {
    throw new Error("Message is required");
  }

  const response = await api.post("/ai", {
    message: message.trim(),
  });

  return response.data.data.response;
};

export default {
  askAI,
};
