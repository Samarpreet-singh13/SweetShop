const SweetCard = ({ sweet, onPurchase }) => {
  return (
    <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-slate-100">
        {sweet.name}
      </h2>

      <div className="mt-2 text-sm text-slate-400">
        <p>Price: ₹{sweet.price}</p>
        <p>Stock: {sweet.quantity}</p>
      </div>

      <button
        onClick={() => onPurchase(sweet._id)}
        disabled={sweet.quantity === 0}
        className={`mt-4 w-full py-2 rounded-lg font-medium transition ${
          sweet.quantity === 0
            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
            : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
        }`}
      >
        {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
      </button>
    </div>
  );
};

export default SweetCard;
