import React, { useEffect, useState } from "react";
import { statuses } from "../utils/tempData";
import { Id, Status, Task } from "@/utils/types";
import TaskCard from "./TaskCard";
import PlusIcon from "@/icons/PlusIcon";
import { generateId } from "@/helpers/generateId";
import axios from "axios";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hoverTask, setHoverTask] = useState<Status | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await axios
        //   .get(`http://localhost:3000/tasks`)
        //   .then((data) => setTasks(data));

        fetch("http://localhost:3000/tasks")
          .then((res) => res.json())
          .then((data) => setTasks(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const columns = statuses.map((status) => {
    const tasksInColumns = tasks.filter((task) => task.status === status);
    return {
      status,
      tasks: tasksInColumns,
    };
  });

  const addTask = async (column: Status) => {
    try {
      const newTask = await axios.post("http://localhost:3000/tasks", {
        id: generateId(),
        status: column,
        priority: "~",
        title: "New Task",
        sub: "???-?",
        vote: 0,
      });

      setTasks([...tasks, newTask.data]);
    } catch (error) {
      console.log(`Error Adding Task: ${error}`);
    }
  };

  const deleteTask = async (targetTaskId: Id) => {
    try {
      await axios
        .delete(`http://localhost:3000/tasks/${targetTaskId}`)
        .then((res) => console.log(`Item Deleted: ${res}`));

      const updatedTask = tasks.filter((task) => {
        return task.id !== targetTaskId && { ...task };
      });
      setTasks(updatedTask);
    } catch (error) {
      console.log(`Delete Error: ${error}`);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await axios.put(`http://localhost:3000/tasks/${task.id}`, task, {
        headers: { "Content-Type": "application/json" },
      });
      const updatedTask = tasks.map((targetTask) => {
        return targetTask.id === task.id ? task : targetTask;
      });

      setTasks(updatedTask);
    } catch (error) {
      console.error(`Update Error: ${error}`);
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
