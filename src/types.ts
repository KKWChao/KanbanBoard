export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

export type ColumnProps = {
  id: Id;
  title: string;
};

export type TaskProps = {
  id: Id;
  title: string;
  sub: string;
  vote: number;
};
