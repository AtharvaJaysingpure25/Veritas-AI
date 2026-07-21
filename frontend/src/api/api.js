import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  timeout: 30000, // 30 sec
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// Request Interceptor
// =========================
API.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =========================
// Response Interceptor
// =========================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Timeout
    if (error.code === "ECONNABORTED") {
      alert("Server timeout. Please try again.");
      return Promise.reject(error);
    }

    // Backend down / network issue
    if (!error.response) {
      alert("Backend unreachable.");
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401) {
      alert("Session expired. Please login again.");

      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    if (status === 403) {
      alert("Access denied.");
    }

    if (status === 429) {
      alert("Too many requests. Please wait.");
    }

    if (status >= 500) {
      alert("Server error.");
    }

    return Promise.reject(error);
  }
);

export default API;