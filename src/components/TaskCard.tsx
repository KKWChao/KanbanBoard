import DownArrow from "@/icons/DownArrowIcon";
import TrashIcon from "@/icons/TrashIcon";
import UpArrow from "@/icons/UpArrowIcon";
import { priorties } from "@/utils/tempData";
import { Task } from "@/utils/types";
import { useState } from "react";

type Props = {
  task: Task;
  deleteTask: (targetTaskId: string) => void;
  updateTask: (task: Task) => void;
};

const TaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isEditingSubTitle, setIsEditingSubTitle] = useState<boolean>(false);
  const [priorityDropDown, setPriorityDropDown] = useState<boolean>(false);
  /* Need to figure out sub title string validation */
  // const subTitleValidation = (subTitle: string) => {};

  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("id", task.id);
      }}
      className="p-2 bg-slate-700 rounded flex justify-between border-slate-900 border-4 cursor-grab shadow-md"
    >
      <div className="p-2 w-full flex flex-col justify-between">
        {/* Editing */}
        <div className="rounded text-lg ">
          {isEditingTitle ? (
            <input
              autoFocus
              className="w-full px-2 bg-slate-700 ring-2 focus:ring-rose-500 focus:rounded-md focus:outline-none"
              value={task.title}
              onBlur={() => setIsEditingTitle(false)}
              onChange={(e) => updateTask({ ...task, title: e.target.value })}
            />
          ) : (
            <div className="px-2" onClick={() => setIsEditingTitle(true)}>
              {task.title}
            </div>
          )}
        </div>

        {/* Title */}
        {/* <h3 className="text-2xl" onClick={() => {}}>
          <input
            className="p-2 w-auto bg-slate-700 focus:bg-slate-800 placeholder:text-slate-100"
            type="text"
            placeholder={task.title}
          />
        </h3> */}

        <div className="relative flex">
          {/* Sub Title */}
          {isEditingSubTitle ? (
            <input
              className="text-sm px-2 w-[4rem] text-rose-600 bg-slate-700 focus:ring-2 focus:ring-rose-500 focus:rounded-md focus:outline-none"
              type="text"
              value={task.sub}
              onBlur={() => setIsEditingTitle(false)}
              onChange={(event) =>
                updateTask({ ...task, sub: event.target.value })
              }
            />
          ) : (
            <div
              className="text-sm px-2 w-[4rem] flex items-center text-rose-600"
              onClick={() => setIsEditingSubTitle(true)}
            >
              {task.sub}
            </div>
          )}

          {/* <input
            className="text-sm px-2 w-[4rem] text-rose-600 bg-slate-700 focus:ring-rose-500 focus:rounded-md focus:outline-none"
            type="text"
            value={task.sub ? task.sub.toUpperCase() : "TMP-?"}
            onChange={(event) =>
              updateTask({ ...task, sub: event.target.value })
            }
          /> */}
          {/* Priority */}
          <button
            className="relative w-[3.5rem] font-bold  hover:text-slate-200 hover:bg-slate-800 border border-slate-700"
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
                      updateTask({ ...task, priority });
                      setPriorityDropDown(false);
                    }}
                    onBlur={() => setPriorityDropDown(false)}
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
          onClick={() => updateTask({ ...task, vote: task.vote + 1 })}
        >
          <UpArrow />
        </button>
        <p className="font-bold text-rose-500">{task.vote}</p>
        <button
          className="hover:scale-125 active:text-rose-500"
          onClick={() => {
            updateTask({ ...task, vote: task.vote - 1 });
          }}
        >
          <DownArrow />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
