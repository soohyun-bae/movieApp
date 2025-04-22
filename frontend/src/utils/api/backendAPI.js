import axios from "axios";

console.log('base url', import.meta.env.VITE_BACKEND_API_BASE_URL);
const backendAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default backendAPI;