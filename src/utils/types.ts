export type Id = string | number;

export type Status = 1 | 2 | 3;

export type Priority = "-" | "!" | "!!!";

export type Task = {
  id: Id;
  boardId: Id;
  status: Status;
  priority: Priority;
  title: string;
  sub: string;
  vote: number;
};

export type Board = {
  id: Id;
  title: string;
};
