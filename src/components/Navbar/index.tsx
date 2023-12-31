import { useAuth } from "@/context/authContext";

const Navbar = () => {
  const { token, setToken } = useAuth();

  const logoutFunction = async () => {
    setToken(null);
    localStorage.removeItem("token");
    console.log("logging out");
    window.location.reload();
  };

  return (
    <nav className="w-full p-4 h-[5dvh] bg-slate-800 flex items-center justify-between">
      <h1 className="text-4xl text-rose-500 ">Kanban</h1>
      <div>
        {token || localStorage.getItem("token") ? (
          <button onClick={logoutFunction}>Logout</button>
        ) : (
          <>
            <a href={"/login"}>Login</a>&nbsp; | &nbsp;
            <a href={"/register"}>Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
