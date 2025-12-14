import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../BackendConnection/auth";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      const res = await register(formData.name, formData.email, formData.password, formData.role);
      console.log("Registration response:", res);
    }catch(error){
      console.error("Registration failed:", error);
    }
    // After successful registration, redirect to login
    navigate("/login");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-pink-400">
          Create Account
        </h2>
        <p className="text-center text-slate-400 text-sm mt-1">
          Register to access the sweet shop
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm mb-1 text-slate-300">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">Role</label>
            <select
              name="role"
              className="w-full px-4 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-pink-400 text-white hover:bg-purple-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
