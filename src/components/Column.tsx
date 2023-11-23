import { ColumnProps } from "@/types";
import TaskCard from "./TaskCard";

type Props = {
  column: ColumnProps;
};

const Column = (props: Props) => {
  const cardData = {
    id: "123gica",
    title: "Card Title Dummy",
    sub: "SOM-1",
    vote: 4,
  };
  return (
    <div className="flex flex-col gap-2 bg-slate-900 rounded">
      <h2 className="text-3xl text-center">{props.column.title}</h2>
      <div className="flex flex-col gap-4">
        <TaskCard task={cardData} />
      </div>
    </div>
  );
};

export default Column;
