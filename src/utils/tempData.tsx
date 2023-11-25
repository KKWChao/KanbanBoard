import { generateId } from "@/helpers/generateId";
import { Status, Task } from "./types";

export const column1 = {
  id: generateId(),
  title: "Todo",
};

export const cardData = {
  id: "123gica",
  title: "Card Title Dummy",
  sub: "SOM-1",
  vote: 4,
};
export const cardData2 = {
  id: "savasdfbaeafasdi",
  title: "Card Progress Dummy",
  sub: "SOM-2",
  vote: 4,
};
export const cardData4 = {
  id: "abase234256",
  title: "Card Complete Dummy",
  sub: "SOM-3",
  vote: 4,
};

export const statuses: Status[] = [1, 2, 3];

export const tasks: Task[] = [
  {
    id: generateId(),
    boardId: generateId(),
    status: 1,
    priority: "~",
    title: "Card Title Dummy",
    sub: "SOM-1",
    vote: 4,
  },
  {
    id: generateId(),
    boardId: generateId(),
    status: 1,
    priority: "!",
    title: "Card Progress Dummy",
    sub: "SOM-2",
    vote: 4,
  },
  {
    id: generateId(),
    boardId: generateId(),
    status: 3,
    priority: "!!!",
    title: "Card Complete Dummy",
    sub: "SOM-3",
    vote: 4,
  },
  {
    id: generateId(),
    boardId: generateId(),
    status: 2,
    priority: "!",
    title: "Card Title Dummy",
    sub: "SOM-1",
    vote: 4,
  },
  {
    id: generateId(),
    boardId: generateId(),
    status: 1,
    priority: "~",
    title: "Card Progress Dummy",
    sub: "SOM-2",
    vote: 4,
  },
  {
    id: generateId(),
    boardId: generateId(),
    status: 1,
    priority: "~",
    title: "Card Complete Dummy",
    sub: "SOM-3",
    vote: 4,
  },
  {
    id: generateId(),
    boardId: generateId(),
    status: 1,
    priority: "!!!",
    title: "Card Complete Dummy",
    sub: "SOM-3",
    vote: 4,
  },
];
