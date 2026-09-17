import { useEffect, useState } from "react";
import { CalendarDays, X } from "lucide-react";

const TaskForm = ({ task, loading, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
  });

  const [error, setError] = useState("");

  // ===============================
  // LOAD TASK FOR EDITING
  // ===============================

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: "",
      });
    }

    setError("");
  }, [task]);

  // ===============================
  // INPUT CHANGE
  // ===============================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // ===============================
  // SUBMIT
  // ===============================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = formData.title.trim();

    if (!title) {
      setError("Task title is required.");
      return;
    }

    if (title.length > 150) {
      setError("Task title must be 150 characters or less.");
      return;
    }

    await onSubmit({
      title,
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate || null,
    });
  };

  // ===============================
  // CLOSE ON BACKDROP CLICK
  // ===============================

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={handleBackdropClick}>
      <div
        className="task-form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        {/* HEADER */}

        <div className="task-form-header">
          <div>
            <span className="section-label">
              {task ? "EDIT TASK" : "NEW TASK"}
            </span>

            <h2 id="task-form-title">
              {task ? "Update task" : "Create a task"}
            </h2>

            <p>Add the details and keep your work organized.</p>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* ERROR */}

        {error && <div className="form-error">{error}</div>}

        {/* FORM */}

        <form className="task-form" onSubmit={handleSubmit}>
          {/* TITLE */}

          <div className="form-group">
            <label htmlFor="task-title">Task title</label>

            <input
              id="task-title"
              name="title"
              type="text"
              placeholder="e.g. Complete internship project"
              value={formData.title}
              onChange={handleChange}
              maxLength={150}
              autoFocus
              required
            />
          </div>

          {/* DESCRIPTION */}

          <div className="form-group">
            <label htmlFor="task-description">Description</label>

            <textarea
              id="task-description"
              name="description"
              placeholder="Add more details about this task..."
              value={formData.description}
              onChange={handleChange}
              maxLength={1000}
              rows={5}
            />

            <small>{formData.description.length}/1000</small>
          </div>

          {/* TWO COLUMNS */}

          <div className="form-row">
            {/* STATUS */}

            <div className="form-group">
              <label htmlFor="task-status">Status</label>

              <select
                id="task-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="todo">To Do</option>

                <option value="in-progress">In Progress</option>

                <option value="completed">Completed</option>
              </select>
            </div>

            {/* PRIORITY */}

            <div className="form-group">
              <label htmlFor="task-priority">Priority</label>

              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>

                <option value="medium">Medium</option>

                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* DUE DATE */}

          <div className="form-group">
            <label htmlFor="task-due-date">Due date</label>

            <div className="date-input-wrapper">
              <CalendarDays size={18} />

              <input
                id="task-due-date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ACTIONS */}

          <div className="task-form-actions">
            <button
              type="button"
              className="secondary-action"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button type="submit" className="primary-action" disabled={loading}>
              {loading ? "Saving..." : task ? "Update task" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
