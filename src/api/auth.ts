import axios, { AxiosResponse } from "axios";
import { ErrorType, Login, Register } from "@/utils/types";

const api = axios.create({
  baseURL: "http://localhost:3333/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginApi = async (login: Login) => {
  try {
    // return await api.post(`/login`, login);
    const response: AxiosResponse = await api.post(`/login`, login);
    return response;
  } catch (err) {
    const errorObject: ErrorType = {
      success: false,
      error: "Internal server error",
      message: err.code,
    };

    console.log(`[Client Api Error] - Logging in: ${err}`);
    return errorObject;
  }
};

export const registerApi = async (register: Register) => {
  try {
    const response = await api.post(`/register`, register);

    if (!response) {
      console.error("[Client Error] - Register: Empty response received");
      return null; // or throw an error if you prefer
    }

    // Check for specific success criteria in the response
    if (response.data && response.data.success) {
      console.log("Registration successful");
      return response;
    } else {
      console.error(
        "[Client Error] - Register: Unsuccessful registration",
        response.data
      );
      return null; // or throw an error if you prefer
    }
  } catch (err) {
    console.error("[Client Error] - Register:", err);

    // Check for specific error conditions (e.g., network error)
    if (axios.isAxiosError(err)) {
      if (err.response) {
        // The request was made and the server responded with a non-success status
        console.error("Server responded with:", err.response.status);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", err.message);
      }
    }

    return null; // or throw an error if you prefer
  }
};

export const tokenCheck = (token: string) => {
  if (token || localStorage.getItem("token")) {
    return;
  }
};
