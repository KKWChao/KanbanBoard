import DownArrow from "@/icons/DownArrow";
import UpArrow from "@/icons/UpArrow";
import { TaskProps } from "@/types";

type Props = {
  task: TaskProps;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="m-2 p-4 bg-slate-700 rounded flex justify-between border-slate-900 border-4 cursor-grab">
      {/* LEFT Title and subtitle */}
      <div className="w-full flex flex-col justify-between">
        <h3 className="text-2xl">{task.title}</h3>
        <div className="text-sm">{task.sub}</div>
      </div>

      {/* RIGHT Votes w/ buttons */}
      <div className="flex flex-col items-center">
        <button>
          <UpArrow />
        </button>
        {task.vote}
        <button>
          <DownArrow />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
