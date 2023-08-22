import axios from "axios";
import store from 'src/store/store.js';

export const ApiService = axios.create({
  baseURL: "http://localhost:8000/moviesapi/",
  //baseURL: "https://localhost:3010",
  headers: {"Access-Control-Allow-Origin": "*"}
});

ApiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token")
  //const token = store.getters["getToken"];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});