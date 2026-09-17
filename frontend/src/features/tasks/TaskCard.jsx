import { CalendarDays, Check, Clock3, Edit3, Trash2 } from "lucide-react";

import api from "../../services/api.js";

const TaskCard = ({ task, onEdit, onDelete, onRefresh }) => {
  // ===============================
  // CHANGE STATUS
  // ===============================

  const handleStatusChange = async (status) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        status,
      });

      await onRefresh();
    } catch (error) {
      console.error("Unable to update task:", error);
    }
  };

  // ===============================
  // FORMAT DATE
  // ===============================

  const formatDate = (date) => {
    if (!date) {
      return "No due date";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const statusLabel = {
    todo: "To Do",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <article
      className={`task-card ${
        task.status === "completed" ? "task-completed" : ""
      }`}
    >
      {/* TOP */}

      <div className="task-card-top">
        <div className="task-status">
          <span className={`status-dot status-${task.status}`} />

          <span>{statusLabel[task.status] || task.status}</span>
        </div>

        <div className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </div>
      </div>

      {/* CONTENT */}

      <div className="task-card-content">
        <h3>{task.title}</h3>

        {task.description && <p>{task.description}</p>}
      </div>

      {/* DATE */}

      <div className="task-card-date">
        <CalendarDays size={16} />

        <span>{formatDate(task.dueDate)}</span>
      </div>

      {/* ACTIONS */}

      <div className="task-card-actions">
        <select
          value={task.status}
          onChange={(event) => handleStatusChange(event.target.value)}
          aria-label="Change task status"
        >
          <option value="todo">To Do</option>

          <option value="in-progress">In Progress</option>

          <option value="completed">Completed</option>
        </select>

        <button
          type="button"
          className="task-action-btn"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          <Edit3 size={16} />
        </button>

        <button
          type="button"
          className="task-action-btn task-delete-btn"
          onClick={() => onDelete(task._id)}
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* COMPLETED INDICATOR */}

      {task.status === "completed" && (
        <div className="task-completed-indicator">
          <Check size={14} />
          Completed
        </div>
      )}
    </article>
  );
};

export default TaskCard;
