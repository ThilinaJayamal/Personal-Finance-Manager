import React, { useState } from "react";
import { useAppContext } from "../contexts/AppProvider";
import toast from "react-hot-toast";

function AddTransaction() {
  // Access functions from the app's context
  const { addTransaction, getBudgetUsage } = useAppContext();

  // Local state for form inputs
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Expense");
  const [loading, setLoading] = useState(false); // Used to disable UI during submission

  // Predefined category options
  const expenseTypes = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Travel",
    "Other",
  ];

  const incomeTypes = [
    "Salary",
    "Freelance",
    "Investment",
    "Business",
    "Gift",
    "Other",
  ];

  // Handle form submission
  const handleSubmit = async () => {
    // Validate required fields
    if (!category || !amount || !type) {
      toast.error("Please select a type, category and enter an amount.");
      return;
    }

    setLoading(true); // Disable UI elements

    try {
      // Save transaction using context method
      await addTransaction({
        category,
        amount,
        type,
        description,
      });

      // Refresh budget data
      await getBudgetUsage();

      // Reset form fields
      setCategory("");
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Re-enable UI elements
    }
  };

  return (
    <div className="w-full">
      {/* Card container */}
      <div className="rounded-xl bg-white py-6 px-6 border border-gray-200">
        <h1 className="text-xl font-semibold mb-6">
          <span className="text-blue-500">+</span> Add Transactions
        </h1>

        {/* Form grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Transaction Type Selector */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-2.5"
            >
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="pl-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {["Expense", "Income"].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2.5"
            >
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                Rs
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 pr-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2.5"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">Select category...</option>
              {(type === "Expense" ? expenseTypes : incomeTypes).map(
                (item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2.5"
            >
              Description
            </label>
            <input
              type="text"
              placeholder="Transaction description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full ${
                type === "Income"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-2.5 rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading
                ? "Loading..."
                : `+ ${type === "Income" ? "Add Income" : "Add Expense"}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
