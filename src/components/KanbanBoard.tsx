import PlusIcon from "@/icons/PlusIcon";
import { Column, Id } from "@/types";
import { useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  return (
    <div className="px-[40px] overflow-y-hidden overflow-x-auto w-full m-auto min-h-screen flex items-center">
      <DndContext>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <div key={column.id}>
                  <ColumnContainer
                    column={column}
                    deleteColumn={deleteColumn}
                  />
                </div>
              ))}
            </SortableContext>
          </div>
          <button
            className="h-[60px] w-[350px] min-w-[350px] p-4 border-2 rounded-lg bg-slate-800 border-slate-700 cursor-pointer ring-rose-500 hover:ring-2 flex gap-2"
            onClick={() => {
              createNewColumn();
            }}
          >
            <PlusIcon />
            Add Column
          </button>
        </div>
      </DndContext>
    </div>
  );

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function generateId() {
    // generate random number between 1-10000
    return Math.floor(Math.random() * 10001);
  }

  function deleteColumn(id: Id) {
    const filteredColumn = columns.filter((column) => column.id !== id);
    setColumns(filteredColumn);
  }
};

export default KanbanBoard;
