import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";
import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [login, setLogin] = useState<boolean>(true);

  return (
    <React.Fragment>
      <Navbar />
      {/* <KanbanBoard /> */}
      {login && <Login />}
      {!login && <KanbanBoard />}
    </React.Fragment>
  );
}

export default App;
