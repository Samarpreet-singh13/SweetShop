import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#1e293b] border-b border-slate-700 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-pink-400">Sweet Shop</span>
        <span>🍬</span>
      </div>

      <div className="flex items-center gap-6 text-sm">
        {!user && (
          <>
            <Link className="text-slate-300 hover:text-pink-400 transition" to="/login">
              Login
            </Link>
            <Link className="text-slate-300 hover:text-pink-400 transition" to="/register">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link className="text-slate-300 hover:text-pink-400 transition" to="/">
              Dashboard
            </Link>

            {user.role === "ADMIN" && (
              <Link className="text-slate-300 hover:text-purple-400 transition" to="/admin">
                Admin
              </Link>
            )}

            <button
              onClick={logout}
              className="bg-pink-500/10 text-pink-400 px-3 py-1 rounded-md hover:bg-pink-500/20 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
