import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authlogin } from "../BackendConnection/auth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mock login – backend will validate email & password later
    try {
      const data = await authlogin(
        formData.email,
        formData.password,
        formData.role
      );
      login(data.user.email, data.user.role);

    } catch (error) {
      console.error("Login failed:", error);
    }

    navigate("/");
  };


  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-pink-400">
          Welcome Back
        </h2>
        <p className="text-center text-slate-400 text-sm mt-1">
          Login to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm mb-1 text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">Role</label>
            <select
              name="role"
              className="w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-pink-500 text-white hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
