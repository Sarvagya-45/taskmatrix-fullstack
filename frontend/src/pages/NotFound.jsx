import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-icon">
          <SearchX size={30} />
        </div>

        <span className="not-found-code">ERROR 404</span>

        <h1>Page not found</h1>

        <p>The page you're looking for doesn't exist or may have been moved.</p>

        <div className="not-found-actions">
          <Link to="/dashboard" className="primary-action">
            <Home size={17} />
            Go to dashboard
          </Link>

          <button
            type="button"
            className="secondary-action"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={17} />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
