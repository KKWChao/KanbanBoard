import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import { useAuth } from "./context/authContext";
import Redirect from "./components/Redirect";

function App() {
  const { token } = useAuth();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {token || localStorage.getItem("token") ? (
          <Route path={"/"} element={<KanbanBoard />} />
        ) : (
          <Route path={"/"} element={<Register />} />
        )}
        {/* <Route path={"/"} element={<KanbanBoard />} /> */}
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/*"} element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
