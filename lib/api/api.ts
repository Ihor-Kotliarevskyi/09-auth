import axios from "axios";

export const nextServer = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});
