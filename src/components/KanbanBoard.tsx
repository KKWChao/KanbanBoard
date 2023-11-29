import React, { useState } from "react";
import { statuses, tasks as initialTasks } from "../utils/tempData";
import { Id, Status, Task } from "@/utils/types";
import TaskCard from "./TaskCard";
import PlusIcon from "@/icons/PlusIcon";
import { generateId } from "@/helpers/generateId";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const columns = statuses.map((status) => {
    const tasksInColumns = tasks.filter((task) => task.status === status);
    return {
      status,
      tasks: tasksInColumns,
    };
  });

  const addTask = (column: Status) => {
    const newTask: Task = {
      id: generateId(),
      status: column,
      priority: "~",
      title: "New Task",
      sub: "",
      vote: 0,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (targetTaskId: Id) => {
    /* Issue with ID Type in delete task */
    const updatedTask = tasks.filter((task) => {
      return task.id !== targetTaskId && { ...task };
    });
    setTasks(updatedTask);
  };

  const updateTask = (task: Task) => {
    const updatedTask = tasks.map((targetTask) => {
      return targetTask.id === task.id ? task : targetTask;
    });
    setTasks(updatedTask);
  };

  return (
    <article className="max-h-[95dvh] p-12">
      <div className="grid lg:grid-cols-3 gap-8">
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
                  <TaskCard
                    task={task}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                  />
                </React.Fragment>
              ))}
            </div>
            {/* Column Add Task */}
            <button
              className="p-2 flex items-center justify-center rounded-b hover:bg-slate-700 active:bg-slate-800"
              onClick={() => {
                addTask(column.status);
              }}
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
