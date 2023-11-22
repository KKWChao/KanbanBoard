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

/* Column Helper Props */
export type DeleteColumn = {
  id: Id;
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};
