import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import { useAuth } from "./context/authContext";
import Redirect from "./components/Redirect";
import Account from "./components/Account";

function App() {
  const { token } = useAuth();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {token || localStorage.getItem("token") ? (
          <Route path={"/"} element={<KanbanBoard />} />
        ) : (
          <Route path={"/"} element={<Login />} />
        )}

        {/* <Route path={"/"} element={<KanbanBoard />} /> */}
        <Route path={"/login"} element={<Login />} />
        <Route path={"/account"} element={<Account />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/*"} element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
