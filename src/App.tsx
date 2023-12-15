import React from "react";
import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./context/authContext";

function App() {
  const { token } = useAuth();
  return (
    <AuthProvider>
      <React.Fragment>
        <Navbar />
        {token ? <KanbanBoard /> : <Login />}
      </React.Fragment>
    </AuthProvider>
  );
}

export default App;
