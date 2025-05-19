import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://m3p-backend-squad1.onrender.com",
  withCredentials: true,
});
