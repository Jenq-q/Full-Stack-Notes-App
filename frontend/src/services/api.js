const axios = require("axios");

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

export const taskAPI = {
  getAllTasks: () => api.get("/tasks"),
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (task) => api.post("/tasks", task),
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};
