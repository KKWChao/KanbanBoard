import React, { useEffect, useState } from "react";
import { priorties, statuses } from "@/utils/tempData";
import { Id, Status, Task } from "@/utils/types";
import TaskCard from "../TaskCard";
import PlusIcon from "@/icons/PlusIcon";
import { ClipLoader } from "react-spinners";

import {
  getApiTask,
  addApiTask,
  updateApiTask,
  deleteApiTask,
} from "@/api/taskApi";
import { generateId } from "@/helpers/generateId";
import { useAuth } from "@/context/authContext";

const KanbanBoard = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hoverTask, setHoverTask] = useState<Status | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      getApiTask(token).then((res) => {
        setTasks(res.data.data);
      });
    } catch (error) {
      setIsLoading(true);
      console.error(`[Kanban Error] - Getting Tasks: ${error}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const columns = statuses.map((status) => {
    const tasksInColumns = tasks?.filter((task) => task.status === status);
    return {
      status,
      tasks: tasksInColumns,
    };
  });

  const addTask = async (column: Status) => {
    try {
      const newTask = {
        id: generateId(),
        /* ADDED TEMP USER ID (REMOVE AFTER FINISHING) */
        userId: "72916e17-6458-48b3-9ac2-b61836bbd2d1",
        status: column,
        priority: priorties[0],
        title: "New Task",
        sub: "???-?",
        vote: 0,
      };

      await addApiTask(token, newTask);

      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error(`[Kanban Error] - Adding Task: ${error}`);
      throw error;
    }
  };

  const deleteTask = async (targetTaskId: Id) => {
    try {
      await deleteApiTask(token, targetTaskId);

      const updatedTask = tasks.filter((task) => {
        return task.id !== targetTaskId && { ...task };
      });

      setTasks(updatedTask);
    } catch (error) {
      console.error(`[Kanban Error] - Deleting Task: ${error}`);
      throw error;
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await updateApiTask(token, task.id, task);

      const updatedTask = tasks.map((targetTask) => {
        return targetTask.id === task.id ? task : targetTask;
      });

      setTasks(updatedTask);
    } catch (error) {
      console.error(`[Kanban Error] - Updating Task: ${error}`);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>, status: Status) => {
    event.preventDefault();
    setHoverTask(null);
    const id = event.dataTransfer.getData("id");
    const task = tasks.find((task) => task.id === id);

    if (task) {
      updateTask({ ...task, status });
    }
  };

  return (
    <article className="max-h-[95dvh] p-12">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Columns */}
        {columns.map((column) => (
          <section
            className={`h-fit flex flex-col gap-2  rounded border-2 border-slate-800 ${
              hoverTask === column.status ? "bg-slate-800" : "bg-slate-900"
            }`}
            key={column.status}
            onDrop={(event) => {
              handleDrop(event, column.status);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragEnter={() => {
              setHoverTask(column.status);
            }}
          >
            {/* Column Title */}
            <h2 className="p-4 text-3xl text-center">
              {column.status === 1 && "Todo"}
              {column.status === 2 && "In-Progress"}
              {column.status === 3 && "Complete"}
            </h2>
            {/* Task Container */}
            <div className="my-2 mx-8 flex flex-grow flex-col gap-4">
              {/* Loader */}
              {isLoading && (
                <div className="w-full py-2 flex items-center justify-center">
                  <ClipLoader
                    color="red"
                    loading={isLoading}
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              )}
              {/* Tasks */}
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
