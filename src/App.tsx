import Column from "./Components/Column";
import Navbar from "./Components/Navbar";
import TaskCard from "./Components/TaskCard";

function App() {
  const column1 = {
    id: "qwer",
    title: "Todo",
  };
  const cardData = {
    id: "123gica",
    title: "Card Title Dummy",
    sub: "SOM-1",
    vote: 4,
  };
  const cardData2 = {
    id: "savasdfbaeafasdi",
    title: "Card Progress Dummy",
    sub: "SOM-2",
    vote: 4,
  };
  const cardData4 = {
    id: "abase234256",
    title: "Card Complete Dummy",
    sub: "SOM-3",
    vote: 4,
  };

  return (
    <>
      <Navbar />

      <div className="p-12 flex justify-center items-center">
        <div className="w-10/12 grid md:grid-cols-3 grid-rows-3 gap-8 ">
          {/* Columns */}
          <Column column={column1} />

          <div className="flex flex-col gap-2 bg-slate-900 rounded">
            <h2 className="text-3xl text-center">In Progress</h2>
            <div className="flex flex-col gap-4">
              <TaskCard task={cardData2} />
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-slate-900 rounded">
            <h2 className="text-3xl text-center">Complete</h2>
            <div className="flex flex-col gap-4">
              <TaskCard task={cardData4} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
