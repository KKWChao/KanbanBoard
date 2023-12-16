import React from "react";
import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import { useAuth } from "./context/authContext";

function App() {
  const { token } = useAuth();

  return (
    <React.Fragment>
      <Navbar />
      {token ? <KanbanBoard /> : <Login />}
    </React.Fragment>
  );
}

export default App;
