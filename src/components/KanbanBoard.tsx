import PlusIcon from "@/icons/PlusIcon";
import { Column, Id, Task } from "@/types";
import { useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { clearLocal, loadingLocal, savingLocal } from "@/Helpers/localStorage";
import { generateId } from "@/Helpers/generateId";
import { createNewColumn } from "@/Helpers/columnHelper";
import SaveModal from "./SaveModal";

const KanbanBoard = () => {
  // Loading local storage
  const localData = loadingLocal();

  const [columns, setColumns] = useState<Column[]>(localData.columns || []);
  const [tasks, setTasks] = useState<Task[]>(localData.tasks || []);
  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // DND kit sensor
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px
      },
    })
  );

  const [isSaving, setIsSaving] = useState<boolean>(false);
  console.log(isSaving);
  return (
    <div className="relative px-[40px] overflow-y-hidden overflow-x-auto w-full m-auto min-h-screen flex items-center">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        {isSaving && <SaveModal />}
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <div key={column.id}>
                  <ColumnContainer
                    column={column}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    tasks={tasks.filter((task) => task.columnId === column.id)}
                  />
                </div>
              ))}
            </SortableContext>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <button
              className="h-[60px] w-[350px] min-w-[350px] p-4 border-2 rounded-lg bg-slate-800 border-slate-700 cursor-pointer ring-rose-500 hover:ring-2 flex gap-2"
              onClick={() => {
                createNewColumn(columns, setColumns);
              }}
            >
              <PlusIcon />
              Add Column
            </button>
            <div className="flex flex-col gap-2">
              {columns.length > 0 && (
                <button
                  className="h-[60px] w-[350px] p-4 border-2 rounded-lg bg-slate-800 border-slate-700 cursor-pointer ring-rose-500 hover:ring-2 active:bg-rose-400 flex gap-2"
                  onClick={() => savingLocal(columns, tasks, setIsSaving)}
                >
                  Save
                </button>
              )}
              {localStorage.getItem("data") && (
                <button
                  className="h-[60px] w-[350px] p-4 border-2 rounded-lg bg-slate-800 border-slate-700 cursor-pointer ring-rose-500 hover:ring-2 active:bg-rose-400 flex gap-2"
                  onClick={() => clearLocal()}
                >
                  Clear Saves
                </button>
              )}
            </div>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function deleteColumn(id: Id) {
    const filteredColumn = columns.filter((column) => column.id !== id);
    setColumns(filteredColumn);

    const newTasks = tasks.filter((task) => task.columnId != id);
    setTasks(newTasks);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((column) => {
      if (column.id !== id) return column;
      return { ...column, title };
    });
    setColumns(newColumns);
  }

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Dropping task over another task

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    // Dropping task over a column

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
};

export default KanbanBoard;
