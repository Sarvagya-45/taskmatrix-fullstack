import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorMessage = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <div className="error-message" role="alert">
      <div className="error-message-icon">
        <AlertCircle size={22} />
      </div>

      <div className="error-message-content">
        <strong>Something went wrong</strong>

        <p>{message}</p>

        {onRetry && (
          <button type="button" className="error-retry-btn" onClick={onRetry}>
            <RefreshCw size={16} />
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
