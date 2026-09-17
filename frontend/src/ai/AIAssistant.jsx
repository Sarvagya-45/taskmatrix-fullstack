import { useState } from "react";
import { Bot, Send, Sparkles, User, X } from "lucide-react";

import api from "../../services/api.js";

const AIAssistant = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm your AI productivity assistant. Ask me about task planning, prioritization, or breaking a large task into smaller steps.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===============================
  // SEND MESSAGE
  // ===============================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    setError("");

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((previous) => [...previous, userMessage]);

    setMessage("");

    try {
      setLoading(true);

      const response = await api.post("/ai", {
        message: trimmedMessage,
      });

      const aiResponse = response.data.data.response;

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: aiResponse,
        },
      ]);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Unable to get an AI response. Please try again.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // QUICK PROMPTS
  // ===============================

  const quickPrompts = [
    "Help me plan my tasks",
    "How should I prioritize my work?",
    "Break a large project into smaller tasks",
  ];

  const handleQuickPrompt = (prompt) => {
    setMessage(prompt);
  };

  return (
    <div className="ai-modal-backdrop">
      <div
        className="ai-assistant"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-title"
      >
        {/* HEADER */}

        <div className="ai-header">
          <div className="ai-header-left">
            <div className="ai-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <span className="section-label">PRODUCTIVITY AI</span>

              <h2 id="ai-title">AI Assistant</h2>
            </div>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close AI assistant"
          >
            <X size={20} />
          </button>
        </div>

        {/* MESSAGES */}

        <div className="ai-messages">
          {messages.map((item) => (
            <div
              key={item.id}
              className={`ai-message ${
                item.role === "user"
                  ? "ai-message-user"
                  : "ai-message-assistant"
              }`}
            >
              <div className="ai-message-avatar">
                {item.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>

              <div className="ai-message-content">
                <span className="ai-message-role">
                  {item.role === "user" ? "You" : "AI Assistant"}
                </span>

                <p>{item.content}</p>
              </div>
            </div>
          ))}

          {/* LOADING */}

          {loading && (
            <div className="ai-message ai-message-assistant">
              <div className="ai-message-avatar">
                <Bot size={16} />
              </div>

              <div className="ai-message-content">
                <span className="ai-message-role">AI Assistant</span>

                <div className="ai-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          {/* ERROR */}

          {error && <div className="ai-error">{error}</div>}
        </div>

        {/* QUICK PROMPTS */}

        {messages.length === 1 && (
          <div className="ai-quick-prompts">
            <span>Try asking:</span>

            <div>
              {quickPrompts.map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  onClick={() => handleQuickPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* INPUT */}

        <form className="ai-input-form" onSubmit={handleSubmit}>
          <div className="ai-input-wrapper">
            <input
              type="text"
              placeholder="Ask AI about your tasks..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={2000}
              disabled={loading}
              autoFocus
            />

            <button
              type="submit"
              disabled={loading || !message.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>

          <small>AI responses may not always be perfect.</small>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
