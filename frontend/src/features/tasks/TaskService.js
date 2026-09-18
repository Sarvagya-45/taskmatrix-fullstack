import api from "../../services/api.js";

// ===============================
// GET ALL TASKS
// ===============================

export const getTasks = async () => {
  const response = await api.get("/api/tasks");

  return response.data.data.tasks || [];
};

// ===============================
// GET SINGLE TASK
// ===============================

export const getTaskById = async (taskId) => {
  const response = await api.get(`/api/tasks/${taskId}`);

  return response.data.data.task;
};

// ===============================
// CREATE TASK
// ===============================

export const createTask = async (taskData) => {
  const response = await api.post("/api/tasks", taskData);

  return response.data.data.task;
};

// ===============================
// UPDATE TASK
// ===============================

export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/api/tasks/${taskId}`, taskData);

  return response.data.data.task;
};

// ===============================
// DELETE TASK
// ===============================

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/api/tasks/${taskId}`);

  return response.data;
};

// ===============================
// CHANGE TASK STATUS
// ===============================

export const updateTaskStatus = async (taskId, status) => {
  const response = await api.put(`/api/tasks/${taskId}`, {
    status,
  });

  return response.data.data.task;
};

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
