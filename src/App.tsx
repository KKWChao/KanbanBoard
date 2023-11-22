import KanbanBoard from "./components/KanbanBoard";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence>
      <KanbanBoard />
    </AnimatePresence>
  );
}

export default App;
