export type Id = string;

export type Status = 1 | 2 | 3;

export type Priority = "~" | "!" | "!!!";

export type Task = {
  id: Id;
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

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};
