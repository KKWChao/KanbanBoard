import DownArrow from "@/icons/DownArrow";
import UpArrow from "@/icons/UpArrow";
import { Task } from "@/utils/types";

type Props = {
  task: Task;
  updateTaskVotes: (task: Task, votes: number) => void;
};

const TaskCard = ({ task, updateTaskVotes }: Props) => {
  return (
    <div className="p-2 bg-slate-700 rounded flex justify-between border-slate-900 border-4 cursor-grab shadow-md">
      {/* Title */}
      <div className="p-2 w-full flex flex-col justify-between">
        <h3 className="text-2xl" onClick={() => {}}>
          <input
            className="p-2 bg-slate-700 focus:bg-slate-800"
            type="text"
            placeholder={task.title}
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
            placeholder={task.sub}
          />
        </p>
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
