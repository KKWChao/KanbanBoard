import { useAuth } from "@/context";

const Navbar = () => {
  const { token } = useAuth();
  const logoutFunction = () => {
    return;
  };
  return (
    <nav className="w-full px-4 h-[5dvh] bg-slate-800 flex items-center justify-between">
      <h1 className="text-2xl text-rose-500 ">Kanban Board</h1>
      <div>
        {token ? (
          <button onClick={() => {}}>Logout</button>
        ) : (
          <a href={"/login"}>Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
