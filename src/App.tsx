import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import { useAuth } from "./context/authFunctions";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<KanbanBoard />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
