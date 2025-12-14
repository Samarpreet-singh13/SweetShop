import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiConnector } from "../services/api";
import { data } from "react-router-dom";

const Admin = () => {
  const { sweets, setSweets, token } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    _id: "",
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const openEditModal = (sweet) => {
    setEditForm({
      _id: sweet._id,
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
    setIsEditOpen(true);
  };

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSweet = async (e) => {
    e.preventDefault();

    const newSweet = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };
    console.log(newSweet);

    try {
      const res = await apiConnector("POST", "/sweets", newSweet, token);
      if (!res.data.success) throw new Error("Failed to add sweet");
      setSweets([...sweets, res.data.data]);
    } catch (error) {
      console.error("Error adding sweet:", error);
    }
    setForm({ name: "", category: "", price: "", quantity: "" });
  };

  const deleteSweet = async (id) => {
    try {
      const res = await apiConnector("DELETE", `/sweets/${id}`, {}, token);
      if (!res.data.success) throw new Error("Failed to delete sweet");
      setSweets(sweets.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting sweet:", error);
    }
    // setSweets(sweets.filter((s) => s.id !== id));
  };

  const updateSweet = async () => {
    try {
      const res = await apiConnector(
        "PATCH",
        `/sweets/${editForm._id}`,
        {
          name: editForm.name,
          category: editForm.category,
          price: Number(editForm.price),
          quantity: Number(editForm.quantity),
        },
        token
      );

      setSweets(
        sweets.map((s) => (s._id === editForm._id ? res.data.data : s))
      );

      setIsEditOpen(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const restocksweet = async (sweet) => {
    try {
      const res = await apiConnector(
        "POST",
        `/sweets/${sweet._id}/restock`,
        { quantity: 10 },
        token
      );
      setSweets((prevSweets) =>
        prevSweets.map((s) =>
          s._id === sweet._id ? { ...s, quantity: s.quantity + 10 } : s
        )
      );
      console.log("Sweet restocked successfully:", res.data.data);
    } catch (error) {
      console.log("Error restocking sweet:", error);
    }
  };
  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-400 mb-6">
          Admin Panel 🛠️
        </h1>
        {isEditOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-[#1e293b] p-6 rounded-xl w-96">
              <h3 className="text-lg text-white mb-4">Edit Sweet</h3>

              {["name", "category", "price", "quantity"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={editForm[field]}
                  onChange={(e) =>
                    setEditForm({ ...editForm, [field]: e.target.value })
                  }
                  className="w-full mb-3 px-3 py-2 rounded bg-[#0f172a] text-white"
                  placeholder={field}
                />
              ))}

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="text-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={updateSweet}
                  className="bg-pink-500 px-4 py-1 rounded text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Sweet Form */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">
            Add New Sweet
          </h2>

          <form
            onSubmit={addSweet}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              name="name"
              placeholder="Sweet Name"
              value={form.name}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100"
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100"
            />

            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100"
            />
            <input
              name="category"
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100"
            />

            <button
              type="submit"
              className="md:col-span-3 bg-pink-400 text-white py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Add Sweet
            </button>
          </form>
        </div>

        {/* Sweet List */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">
            Manage Sweets
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Stock</th>
                  <th className="text-left py-2">Delete</th>
                  <th className="text-left py-2">Edit</th>
                  <th className="text-left py-2">Restock</th>
                </tr>
              </thead>
              <tbody>
                {sweets.map((sweet) => (
                  <tr key={sweet._id} className="border-b border-slate-800">
                    <td className="py-2">{sweet.name}</td>
                    <td className="py-2">₹{sweet.price}</td>
                    <td className="py-2">{sweet.quantity}</td>
                    <td className="py-2">
                      <button
                        onClick={() => deleteSweet(sweet._id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        Delete 🗑️
                      </button>
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => openEditModal(sweet)}
                        className="text-blue-400 hover:text-blue-500"
                      >
                        Edit ✏️
                      </button>
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => restocksweet(sweet)}
                        className="text-green-400 hover:text-green-500"
                      >
                        Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
