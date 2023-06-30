import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
});

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  config.headers["Authorization"] = token;

  return config;
});

export default instance;
