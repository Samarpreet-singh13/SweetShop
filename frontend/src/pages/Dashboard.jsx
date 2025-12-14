import { useEffect, useState } from "react";
import SweetCard from "../components/SweetCard";
import { apiConnector } from "../services/api";
import { useAuth } from "../context/AuthContext";
function debounce(fun, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fun.apply(this, args), delay);
  };
}
const Dashboard = () => {
  const { sweets, setSweets, token } = useAuth();

  const purchaseSweet = async (id) => {
    // what this logic do is to decrease the quantity of the sweet by 1
    try {
      const response = await apiConnector(
        "POST",
        `/sweets/${id}/purchase`,
        { quantity: 1 },
        token
      );
      setSweets((prevSweets) =>
        prevSweets.map((sweet) =>
          sweet._id === id && sweet.quantity > 0
            ? { ...sweet, quantity: sweet.quantity - 1 }
            : sweet
        )
      );
      console.log("Sweet purchased successfully:", response.data.data);
    } catch (error) {
      console.log("Error purchasing sweet:", error);
    }

    // setSweets((prevSweets) =>
    //   prevSweets.map((sweet) =>
    //     sweet._id === id && sweet.quantity > 0
    //       ? { ...sweet, quantity: sweet.quantity - 1 }
    //       : sweet
    //   )
    // );
  };

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const response = await apiConnector(
          "GET",
          `/sweets/search?name=${searchQuery}`,
          null,
          token
        );
        setSweets(response.data.data);
      } catch (error) {
        console.log("Error fetching sweets:", error);
      }
    };

    fetchSweets();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      <h1 className="text-3xl font-bold text-slate-100 mb-2">
        Available Sweets 🍭
      </h1>
      <p className="text-slate-400 mb-6">
        Freshly prepared sweets available for purchase
      </p>

      <div>
        <input
          type="text"
          onChange={(e) => debounce(setSearchQuery(e.target.value), 500)}
          // onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 mb-6 rounded-md bg-slate-800 text-slate-100 border border-slate-700 focus:outline-none focus:border-blue-500"
          placeholder="Search sweet"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {sweets.map((sweet) => (
          <SweetCard key={sweet._id} sweet={sweet} onPurchase={purchaseSweet} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
