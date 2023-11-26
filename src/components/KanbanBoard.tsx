import React, { useState } from "react";
import { statuses, tasks as initialTasks } from "../utils/tempData";
import { Task } from "@/utils/types";
import TaskCard from "./TaskCard";
import PlusIcon from "@/icons/PlusIcon";

const KanbanBoard = () => {
  let title = "";
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const columns = statuses.map((status) => {
    const tasksInColumns = tasks.filter((task) => task.status === status);
    return {
      status,
      tasks: tasksInColumns,
    };
  });

  const updateTaskVotes = (task: Task, vote: number) => {
    const updatedTask = tasks.map((t) => {
      return t.id === task.id ? { ...t, vote } : t;
    });
    setTasks(updatedTask);
  };

  const deleteTask = (task: Task) => {};

  return (
    <article className="max-h-[95dvh] p-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Columns */}
        {columns.map((column) => (
          <section
            className="h-fit flex flex-col gap-2 bg-slate-900 rounded border-2 border-slate-800"
            key={column.status}
          >
            {/* Column Title */}
            <h2 className="p-4 text-3xl text-center">
              {column.status === 1 && "Todo"}
              {column.status === 2 && "In-Progress"}
              {column.status === 3 && "Complete"}
            </h2>
            {/* Task Container */}
            <div className="my-2 mx-8 flex flex-grow flex-col gap-4">
              {column.tasks?.map((task) => (
                <React.Fragment key={task.id}>
                  <TaskCard task={task} updateTaskVotes={updateTaskVotes} />
                </React.Fragment>
              ))}
            </div>
            {/* Column Add Task */}
            <button
              className="p-2 flex items-center justify-center rounded-b hover:bg-slate-700 active:bg-slate-800"
              onClick={() => {}}
            >
              <PlusIcon className="w-8 h-8" />
            </button>
          </section>
        ))}
      </div>
    </article>
  );
};

export default KanbanBoard;
