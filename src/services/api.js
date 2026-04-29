import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Auth ────────────────────────────────────────────────────────────────────

export const registerUser = (data) => api.post("/user/register", data);
export const loginUser = (data) => api.post("/user/login", data);
export const getUserById = (userId) => api.get(`/user/${userId}`);

// ─── Transactions ─────────────────────────────────────────────────────────────

export const getTransactions = () => api.get("/transaction");
export const getTransactionById = (id) => api.get(`/transaction/${id}`);
export const addTransaction = (data) => api.post("/transaction", data);
export const updateTransaction = (id, data) =>
  api.patch(`/transaction/update/${id}`, data);
export const deleteTransaction = (id) =>
  api.delete(`/transaction/delete/${id}`);

export default api;
