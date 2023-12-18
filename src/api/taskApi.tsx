import { Id, Task } from "@/utils/types";
import axios from "axios";
import { useAuth } from "../context/authFunctions";

// temp to test connections
const api = axios.create({
  baseURL: "http://localhost:3333/api",
  headers: {
    "Content-Type": "application/json",
    // temp fix to deal with login token
    Authorization: localStorage.getItem("token"),
  },
});

export const getApiTask = async () => {
  try {
    return await api.get(`/tasks`);
  } catch (error) {
    console.error(`[Api Error] - Fetching Tasks: ${error}`);
    throw error;
  }
};

export const addApiTask = async (taskData: Task) => {
  try {
    return await api.post(`/tasks`, taskData);
  } catch (error) {
    console.error(`[Api Error] - Adding Tasks: ${error}`);
    throw error;
  }
};

export const updateApiTask = async (taskId: Id, taskData: Task) => {
  try {
    return await api.put(`/tasks/${taskId}`, taskData);
  } catch (error) {
    console.error(`[Api Error] - Updating Task: ${error}`);
    throw error;
  }
};

export const updateSmallApiTask = async (taskId: Id, taskData: Task) => {
  try {
    return await api.patch(`/tasks/${taskId}`, taskData);
  } catch (error) {
    console.error(`[Api Error] - Updating Task: ${error}`);
    throw error;
  }
};

export const deleteApiTask = async (taskId: Id) => {
  try {
    return await api.delete(`/tasks/${taskId}`);
  } catch (error) {
    console.error(`[Api Error] - Deleting Task: ${error}`);
    throw error;
  }
};
