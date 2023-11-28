import DownArrow from "@/icons/DownArrowIcon";
import TrashIcon from "@/icons/TrashIcon";
import UpArrow from "@/icons/UpArrowIcon";
import { priorties } from "@/utils/tempData";
import { Priority, Task } from "@/utils/types";
import { useState } from "react";

type Props = {
  task: Task;
  deleteTask: (targetTaskId: number) => void;
  updateTaskVotes: (task: Task, votes: number) => void;
  updateTaskPriority: (task: Task, priority: Priority) => void;
};

const TaskCard = ({
  task,
  deleteTask,
  updateTaskVotes,
  updateTaskPriority,
}: Props) => {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [priorityDropDown, setPriorityDropDown] = useState<boolean>(false);

  return (
    <div className="p-2 bg-slate-700 rounded flex justify-between border-slate-900 border-4 cursor-grab shadow-md">
      {/* Title */}
      <div className="p-2 w-full flex flex-col justify-between">
        <h3 className="text-2xl" onClick={() => {}}>
          <input
            className="p-2 w-auto bg-slate-700 focus:bg-slate-800 placeholder:text-slate-100"
            type="text"
            placeholder={task.title}
          />
        </h3>

        <div className="relative flex">
          {/* Sub Title */}
          <input
            className="text-sm w-1/6 bg-slate-700 focus:bg-slate-800 text-rose-500 placeholder:text-rose-500"
            type="text"
            placeholder={task.sub}
          />
          {/* Priority */}
          <button
            className="relative py-1 w-1/6 font-bold  hover:text-slate-200 hover:bg-slate-800 border border-slate-700"
            onClick={() => setPriorityDropDown(!priorityDropDown)}
            onBlur={() => setPriorityDropDown(false)}
          >
            [&nbsp;{task.priority}&nbsp;]
            {/* Dropdown for priority */}
            {priorityDropDown && (
              <ul className="absolute top-9 w-full bg-slate-800 flex flex-col rounded text-center border border-slate-700">
                {priorties.map((priority) => (
                  <li
                    className={`px-2 py-1 font-bold ${
                      task.priority === priority
                        ? "bg-rose-500 hover:bg-rose-600"
                        : "hover:bg-slate-700"
                    }`}
                    onClick={() => {
                      updateTaskPriority(task, priority);
                      setPriorityDropDown(!priorityDropDown);
                    }}
                    onBlur={() => setPriorityDropDown(!priorityDropDown)}
                    key={priority}
                  >
                    [&nbsp;{priority}&nbsp;]
                  </li>
                ))}
              </ul>
            )}
          </button>
          {/* Options Button */}
          {/* Issue with id type? */}
          <button
            className="hover:stroke-slate-300 stroke-slate-100 p-2"
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Votes w/ buttons */}
      <div className="p-2 flex flex-col items-center justify-center gap-2">
        <button
          className="hover:scale-125 active:text-rose-500"
          onClick={() => updateTaskVotes(task, task.vote + 1)}
        >
          <UpArrow />
        </button>
        <p className="font-bold text-rose-500">{task.vote}</p>
        <button
          className="hover:scale-125 active:text-rose-500"
          onClick={() => {
            updateTaskVotes(task, task.vote - 1);
          }}
        >
          <DownArrow />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
