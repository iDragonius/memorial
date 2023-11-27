import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    ApplicationKey: process.env.NEXT_PUBLIC_APPLICATION_SERVER_KEY,
  },
});
api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default api;
