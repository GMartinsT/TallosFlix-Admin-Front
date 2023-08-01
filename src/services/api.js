import axios from "axios";

export const ApiService = axios.create({
  //baseURL: "http://localhost:8000/moviesapi/",
  baseURL: "http://localhost:3010",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
  },
});