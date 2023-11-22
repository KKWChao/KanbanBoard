import PlusIcon from "@/icons/PlusIcon";
import TrashIcon from "@/icons/TrashIcon";
import { Column, Id, Task } from "@/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  tasks: Task[];
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const ColumnContainer = (props: Props) => {
  const {
    column,
    tasks,
    deleteColumn,
    updateColumn,
    createTask,
    deleteTask,
    updateTask,
  } = props;

  const [editMode, setEditMode] = useState<boolean>(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" w-[350px] h-[500px] max-h-[500px] border-2 rounded-md bg-slate-700 opacity-60 border-rose-500 flex flex-col"
      >
        hello
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" w-[350px] h-[500px] max-h-[500px] rounded-md bg-slate-700 flex flex-col"
    >
      {/* Task Title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="h-[60px] p-3 font-bold cursor-grab rounded-md rounded-b-none border-4 bg-slate-800  border-slate-700 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="px-2 py-1 text-sm rounded-full bg-slate-700 flex justify-center items-center">
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(event) => {
                if (event.key !== "Enter") return;
                setEditMode(false);
              }}
              value={column.title}
              onChange={(event) => updateColumn(column.id, event.target.value)}
            />
          )}
        </div>
        <button
          className="px-2 py-1 text-sm stroke-gray-500 hover:stroke-white hover:bg-slate-700 rounded-full"
          onClick={() => deleteColumn(column.id)}
        >
          <TrashIcon />
        </button>
      </div>

      {/* Task Container */}
      <div className="p-2 flex flex-grow flex-col gap-4 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      {/* Task Footer */}
      <button
        className="p-4 flex gap-2 items-center rounded-md border-4 border-slate-700 hover:bg-slate-800 hover:text-rose-500 active:bg-slate-900"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon />
        Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
