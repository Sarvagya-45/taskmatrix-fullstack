import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  ListTodo,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import api from "../services/api.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Toast from "../components/Toast.jsx";
import AIAssistant from "../features/ai/AIAssistant.jsx";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [showAI, setShowAI] = useState(false);

  // ===============================
  // FETCH TASKS
  // ===============================

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/tasks");

      setTasks(response.data.data.tasks || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load your tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ===============================
  // TASK STATS
  // ===============================

  const stats = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.status === "completed",
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === "in-progress",
    ).length;

    const todo = tasks.filter((task) => task.status === "todo").length;

    return {
      total,
      completed,
      inProgress,
      todo,
    };
  }, [tasks]);

  // ===============================
  // COMPLETE TASK
  // ===============================

  const handleComplete = async (task) => {
    try {
      await api.put(`/api/tasks/${task._id}`, {
        status: task.status === "completed" ? "todo" : "completed",
      });

      setToast(
        task.status === "completed"
          ? "Task moved back to To Do."
          : "Task completed successfully.",
      );

      await fetchTasks();

      setTimeout(() => {
        setToast("");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update task.");
    }
  };

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <div className="dashboard-page">
      {/* TOAST */}

      {toast && <Toast message={toast} onClose={() => setToast("")} />}

      {/* HEADER */}

      <section className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">YOUR WORKSPACE</span>

          <h1>Dashboard</h1>

          <p>Track your progress and keep your work moving forward.</p>
        </div>

        <button
          type="button"
          className="ai-open-btn"
          onClick={() => setShowAI(true)}
        >
          <Sparkles size={18} />
          Ask AI
        </button>
      </section>

      {/* ERROR */}

      {error && <ErrorMessage message={error} onRetry={fetchTasks} />}

      {/* STATS */}

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <ListTodo size={22} />
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{stats.total}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock3 size={22} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{stats.inProgress}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={22} />
          </div>

          <div>
            <span>Remaining</span>
            <strong>{stats.todo}</strong>
          </div>
        </div>
      </section>

      {/* QUICK ACTION */}

      <section className="dashboard-workspace">
        <div className="workspace-header">
          <div>
            <span className="section-label">QUICK OVERVIEW</span>

            <h2>Recent tasks</h2>
          </div>

          <a href="/tasks" className="view-all-link">
            View all
          </a>
        </div>

        {/* EMPTY STATE */}

        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Plus size={24} />
            </div>

            <h3>No tasks yet</h3>

            <p>Create your first task and start organizing your work.</p>

            <a href="/tasks" className="primary-action">
              <Plus size={18} />
              Create your first task
            </a>
          </div>
        ) : (
          <div className="recent-task-list">
            {tasks.slice(0, 6).map((task) => (
              <div className="recent-task" key={task._id}>
                <button
                  type="button"
                  className={`task-check ${
                    task.status === "completed" ? "completed" : ""
                  }`}
                  onClick={() => handleComplete(task)}
                  aria-label="Toggle task status"
                >
                  {task.status === "completed" && <CheckCircle2 size={18} />}
                </button>

                <div className="recent-task-content">
                  <strong>{task.title}</strong>

                  <span>{task.description || "No description"}</span>
                </div>

                <div className={`priority-badge priority-${task.priority}`}>
                  {task.priority}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PRODUCTIVITY CARD */}

      <section className="productivity-card">
        <div className="productivity-icon">
          <AlertCircle size={22} />
        </div>

        <div>
          <span className="section-label">PRODUCTIVITY</span>

          <h3>Keep your tasks organized</h3>

          <p>
            Use priorities and statuses to focus on the work that matters most.
          </p>
        </div>

        <button
          type="button"
          className="secondary-action"
          onClick={() => setShowAI(true)}
        >
          <Sparkles size={17} />
          Get AI help
        </button>
      </section>

      {/* AI ASSISTANT */}

      {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
    </div>
  );
};

export default Dashboard;
