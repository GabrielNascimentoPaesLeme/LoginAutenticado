import axios from "axios";

const api = axios.create({
  baseURL: "https://login-autenticado-backend.onrender.com",
});

export default api;
