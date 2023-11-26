import { Task } from "@/utils/types";
import TaskCard from "./TaskCard";
import React, { useState } from "react";
import PlusIcon from "@/icons/PlusIcon";
import { CreateTask } from "@/helpers/taskHelper";
import { tasks as initialTasks } from "@/utils/tempData";

type Props = {
  columnData: number;
  taskData: Task[];
};

const ColumnContainer = (props: Props) => {
  let title = "";
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // ISSUE: Not updating after calling function
  const updateTaskVotes = (task: Task, vote: number) => {
    const updatedTask = tasks.map((t) => {
      console.log(vote);
      return t.id === task.id ? { ...t, vote } : t;
    });
    setTasks(updatedTask);
    console.log(updatedTask);
  };

  switch (props.columnData) {
    case 1:
      title = "Todo";
      break;
    case 2:
      title = "In-Progress";
      break;
    case 3:
      title = "Complete";
      break;
  }

  return (
    <div className="h-fit flex flex-col gap-2 bg-slate-900 rounded border-2 border-slate-800">
      {/* Column Title */}
      <h2 className="p-4 text-3xl text-center">{title}</h2>
      {/* Task Container */}
      <div className="my-2 mx-8 flex flex-grow flex-col gap-4">
        {props.taskData?.map((task) => (
          <React.Fragment key={task.id}>
            <TaskCard task={task} updateTaskVotes={updateTaskVotes} />
          </React.Fragment>
        ))}
      </div>
      {/* Column Add Task */}
      <div className="p-2 flex items-center justify-center">
        <button
          className="p-2 rounded"
          onClick={() => {
            CreateTask();
          }}
        >
          <PlusIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default ColumnContainer;
