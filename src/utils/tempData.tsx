import { generateId } from "@/helpers/generateId";
import { Priority, Status, Task } from "./types";

export const statuses: Status[] = [1, 2, 3];

export const priorties: Priority[] = ["!!!", "!", "~"];

export const tasks: Task[] = [
  {
    id: generateId(),
    status: 1,
    priority: "~",
    title: "Card Title",
    sub: "SOM-1",
    vote: 4,
  },
  {
    id: generateId(),
    status: 1,
    priority: "!",
    title: "Card Progress",
    sub: "SOM-2",
    vote: 4,
  },
  {
    id: generateId(),
    status: 3,
    priority: "!!!",
    title: "Card Complete",
    sub: "SOM-3",
    vote: 4,
  },
  {
    id: generateId(),
    status: 2,
    priority: "!",
    title: "Card Title",
    sub: "SOM-1",
    vote: 4,
  },
  {
    id: generateId(),
    status: 1,
    priority: "~",
    title: "Card Progress",
    sub: "SOM-2",
    vote: 4,
  },
  {
    id: generateId(),
    status: 1,
    priority: "~",
    title: "Card Complete",
    sub: "SOM-3",
    vote: 4,
  },
  {
    id: generateId(),
    status: 1,
    priority: "!!!",
    title: "Card Complete",
    sub: "SOM-3",
    vote: 4,
  },
];
