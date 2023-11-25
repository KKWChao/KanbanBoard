import { Column, Id, Task } from "@/utils/types";
import { generateId } from "./generateId";

export function createNewColumn(
  columns: Column[],
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>
) {
  const columnToAdd: Column = {
    id: generateId(),
    title: `Column ${columns.length + 1}`,
  };
  return setColumns([...columns, columnToAdd]);
}

export function deleteColumn(
  id: Id,
  columns: Column[],
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>,
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
  const filteredColumn = columns.filter((column) => column.id !== id);
  setColumns(filteredColumn);

  const newTasks = tasks.filter((task) => task.columnId != id);
  setTasks(newTasks);
}

export function updateColumn(
  columns: Column[],
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>,
  id: Id,
  title: string
) {
  const newColumns = columns.map((column) => {
    if (column.id !== id) return column;
    return { ...column, title };
  });
  setColumns(newColumns);
}
