import TrashIcon from "@/icons/TrashIcon";
import { Column, Id } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props;
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column.id,
      data: {
        type: "Column",
        column,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" bg-slate-700 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      {/* Title */}
      <div
        {...attributes}
        {...listeners}
        className="h-[60px] p-3 font-bold bg-slate-800 cursor-grab rounded-md rounded-b-none border-4 border-slate-700 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="px-2 py-1 text-sm bg-slate-700 rounded-full flex justify-center items-center">
            0
          </div>
          {column.title}
        </div>
        <button
          className="px-2 py-1 text-sm stroke-gray-500 hover:stroke-white hover:bg-slate-700 rounded-full"
          onClick={() => deleteColumn(column.id)}
        >
          <TrashIcon />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-grow">Content</div>
      {/* Footer */}
      <div>Footer</div>
    </div>
  );
};

export default ColumnContainer;
