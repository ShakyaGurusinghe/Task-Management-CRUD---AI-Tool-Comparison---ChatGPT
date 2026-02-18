import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  timeout: 10000
});

export function apiErrorMessage(err) {
  return (
    err?.response?.data?.message ||
    (Array.isArray(err?.response?.data?.details) ? "Validation failed" : null) ||
    err.message ||
    "Something went wrong"
  );
}