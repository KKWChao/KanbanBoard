import axios from "axios";
import { Login } from "@/utils/types";

const api = axios.create({
  baseURL: "http://localhost:3333/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginApi = async (login: Login) => {
  try {
    return await api.post(`/login`, login);
  } catch (err) {
    console.error(`[Client Error] - Logging in: ${err}`);
  }
};
