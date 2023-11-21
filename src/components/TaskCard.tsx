import TrashIcon from "@/icons/TrashIcon";
import { Id, Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
};

const TaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative p-2.5 h-[100px] min-h-[100px] bg-slate-800 text-left flex items-center rounded-xl border-2 border-rose-500 cursor-grab"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative p-2.5 h-[100px] min-h-[100px] bg-slate-800 text-left flex items-center rounded-xl hover:ring-2 hover:ringt-inset hover:ring-rose-500 cursor-grab"
      >
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          value={task.content}
          autoFocus
          placeholder="Task Content Here!"
          onBlur={toggleEditMode}
          onKeyDown={(event) => {
            if (event.key === "Enter" && event.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(event) => updateTask(task.id, event.target.value)}
        ></textarea>
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task relative p-2.5 h-[100px] min-h-[100px] bg-slate-800 text-left flex items-center rounded-xl hover:ring-2 hover:ringt-inset hover:ring-rose-500 cursor-grab"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={toggleEditMode}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>

      {mouseIsOver && (
        <button
          className="absolute p-2 right-4 top-1/2 -translate-y-1/2 bg-slate-700 stroke-white opacity-60 hover:opacity-100 rounded"
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
