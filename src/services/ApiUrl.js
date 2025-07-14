import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://cabins-in-the-woods-back.onrender.com",
  withCredentials: true,
});
