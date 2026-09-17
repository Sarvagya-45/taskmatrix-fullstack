import { CheckCircle, X, XCircle } from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {
  if (!message) {
    return null;
  }

  const isError = type === "error";

  return (
    <div
      className={`toast ${isError ? "toast-error" : "toast-success"}`}
      role="alert"
    >
      <div className="toast-icon">
        {isError ? <XCircle size={20} /> : <CheckCircle size={20} />}
      </div>

      <span className="toast-message">{message}</span>

      {onClose && (
        <button
          type="button"
          className="toast-close"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
};

export default Toast;
