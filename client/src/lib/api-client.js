// src/lib/api-client.js
import axios from "axios";
import { HOST } from "@/utils/constants";

export const apiClient = axios.create({
  baseURL: HOST || "http://localhost:8747",  // fallback to your backend port
  withCredentials: true,
});
