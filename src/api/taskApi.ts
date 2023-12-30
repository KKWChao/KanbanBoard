import { Id, Task } from "@/utils/types";
import axios from "axios";

// temp to test connections
const api = (token: string | null) =>
  axios.create({
    baseURL: "http://localhost:3333/api",
    headers: {
      "Content-Type": "application/json",
      // temp fix to deal with login token
      Authorization: token,
    },
  });
export const getApiTask = async (token: string | null) => {
  try {
    return await api(token).get(`/tasks`);
  } catch (error) {
    console.error(`[Client Api Function Error] - Fetching Tasks: ${error}`);
    throw error;
  }
};

export const addApiTask = async (token: string | null, taskData: Task) => {
  try {
    return await api(token).post(`/tasks`, taskData);
  } catch (error) {
    console.error(`[Client Api Function Error] - Adding Tasks: ${error}`);
    throw error;
  }
};

export const updateApiTask = async (
  token: string | null,
  taskId: Id,
  taskData: Task
) => {
  try {
    return await api(token).put(`/tasks/${taskId}`, taskData);
  } catch (error) {
    console.error(`[Client Api Function Error] - Updating Task: ${error}`);
    throw error;
  }
};

export const updateSmallApiTask = async (
  token: string | null,
  taskId: Id,
  taskData: Task
) => {
  try {
    return await api(token).patch(`/tasks/${taskId}`, taskData);
  } catch (error) {
    console.error(`[Client Api Function Error] - Updating Task: ${error}`);
    throw error;
  }
};

export const deleteApiTask = async (token: string | null, taskId: Id) => {
  try {
    return await api(token).delete(`/tasks/${taskId}`);
  } catch (error) {
    console.error(`[Client Api Function Error] - Deleting Task: ${error}`);
    throw error;
  }
};
