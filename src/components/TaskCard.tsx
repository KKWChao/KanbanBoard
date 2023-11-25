import DownArrow from "@/icons/DownArrow";
import UpArrow from "@/icons/UpArrow";
import { Task } from "@/utils/types";
import { useState } from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const [taskSubTitle, setTaskSubTitle] = useState<string>(task.sub);
  const [taskVotes, setTaskVotes] = useState<number>(task.vote);

  return (
    <div className="p-2 bg-slate-700 rounded flex justify-between border-slate-900 border-4 cursor-grab shadow-md">
      {/* Title */}
      <div className="p-2 w-full flex flex-col justify-between">
        <h3 className="text-2xl" onClick={() => {}}>
          <input
            className="p-2 bg-slate-700 focus:bg-slate-800"
            type="text"
            placeholder={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
          />
        </h3>
        <p className="px-2 py-2 text-sm">
          {/* Priority */}
          <span className="px-2 text-lg font-bold">
            [&nbsp;{task.priority.toUpperCase()}&nbsp;]
          </span>
          {/* Sub Title */}
          <input
            className="bg-slate-700 focus:bg-slate-800 text-rose-500 placeholder:text-rose-500"
            type="text"
            placeholder={taskSubTitle}
            onChange={(event) => setTaskSubTitle(event.target.value)}
          />
        </p>
      </div>

      {/* Votes w/ buttons */}
      <div className="p-2 flex flex-col items-center justify-center gap-2">
        <button onClick={() => setTaskVotes(taskVotes + 1)}>
          <UpArrow />
        </button>
        <p className="text-rose-500">{taskVotes}</p>

        <button onClick={() => setTaskVotes(taskVotes - 1)}>
          <DownArrow />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
