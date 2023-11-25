import React from "react";
import ColumnContainer from "./components/ColumnContainer";
import Navbar from "./components/Navbar";
import { statuses, tasks } from "./utils/tempData";

function App() {
  const columns = statuses.map((status) => {
    const tasksInColumns = tasks.filter((task) => task.status === status);
    return {
      status,
      tasks: tasksInColumns,
    };
  });

  return (
    <>
      <Navbar />
      <section className="max-h-[95dvh] p-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Columns */}
          {columns.map((column) => (
            <React.Fragment key={column.status}>
              <ColumnContainer
                columnData={column.status}
                taskData={column.tasks}
              />
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
