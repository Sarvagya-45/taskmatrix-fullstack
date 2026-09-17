import { useEffect, useState } from "react";
import { Plus, RefreshCw, Search, Trash2 } from "lucide-react";

import api from "../services/api.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Toast from "../components/Toast.jsx";

import TaskCard from "../features/tasks/TaskCard.jsx";
import TaskForm from "../features/tasks/TaskForm.jsx";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // ===============================
  // FETCH TASKS
  // ===============================

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/tasks");

      setTasks(response.data.data.tasks || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ===============================
  // CREATE / UPDATE TASK
  // ===============================

  const handleSubmitTask = async (formData) => {
    try {
      setFormLoading(true);
      setError("");

      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, formData);

        setToast("Task updated successfully.");
      } else {
        await api.post("/tasks", formData);

        setToast("Task created successfully.");
      }

      setShowForm(false);
      setEditingTask(null);

      await fetchTasks();

      setTimeout(() => {
        setToast("");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save task.");
    } finally {
      setFormLoading(false);
    }
  };

  // ===============================
  // DELETE TASK
  // ===============================

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/tasks/${taskId}`);

      setToast("Task deleted successfully.");

      await fetchTasks();

      setTimeout(() => {
        setToast("");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete task.");
    }
  };

  // ===============================
  // EDIT TASK
  // ===============================

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // ===============================
  // FILTER TASKS
  // ===============================

  const filteredTasks = tasks.filter((task) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      task.title.toLowerCase().includes(searchValue) ||
      task.description?.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return <Loader text="Loading tasks..." />;
  }

  return (
    <div className="tasks-page">
      {/* TOAST */}

      {toast && <Toast message={toast} onClose={() => setToast("")} />}

      {/* HEADER */}

      <section className="tasks-header">
        <div>
          <span className="dashboard-eyebrow">WORKSPACE</span>

          <h1>Tasks</h1>

          <p>Create, organize and manage all your tasks from one place.</p>
        </div>

        <button
          type="button"
          className="primary-action"
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
        >
          <Plus size={18} />
          New task
        </button>
      </section>

      {/* ERROR */}

      {error && <ErrorMessage message={error} onRetry={fetchTasks} />}

      {/* FILTER BAR */}

      <section className="task-toolbar">
        <div className="task-search">
          <Search size={18} />

          <input
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">All statuses</option>

          <option value="todo">To Do</option>

          <option value="in-progress">In Progress</option>

          <option value="completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
        >
          <option value="all">All priorities</option>

          <option value="low">Low</option>

          <option value="medium">Medium</option>

          <option value="high">High</option>
        </select>

        <button
          type="button"
          className="refresh-btn"
          onClick={fetchTasks}
          title="Refresh tasks"
        >
          <RefreshCw size={18} />
        </button>
      </section>

      {/* TASK COUNT */}

      <div className="task-result-info">
        <span>
          Showing <strong>{filteredTasks.length}</strong> of{" "}
          <strong>{tasks.length}</strong> tasks
        </span>

        {(search || statusFilter !== "all" || priorityFilter !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setPriorityFilter("all");
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* TASK LIST */}

      {filteredTasks.length === 0 ? (
        <div className="empty-state tasks-empty">
          <div className="empty-icon">
            {tasks.length === 0 ? <Plus size={24} /> : <Search size={24} />}
          </div>

          <h3>{tasks.length === 0 ? "No tasks yet" : "No matching tasks"}</h3>

          <p>
            {tasks.length === 0
              ? "Create your first task to get started."
              : "Try changing your search or filters."}
          </p>

          {tasks.length === 0 && (
            <button
              type="button"
              className="primary-action"
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
            >
              <Plus size={18} />
              Create task
            </button>
          )}
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRefresh={fetchTasks}
            />
          ))}
        </div>
      )}

      {/* TASK FORM */}

      {showForm && (
        <TaskForm
          task={editingTask}
          loading={formLoading}
          onSubmit={handleSubmitTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Tasks;
