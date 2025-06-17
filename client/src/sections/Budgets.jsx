import React from "react";
import { PiggyBank, Wallet, CheckCircle } from "lucide-react";
import BudgetCategoryItem from "../components/BudgetCategoryItem";

function Budgets() {
  // Example categories data
  const categories = [
    { name: "Food & Dining", spent: 12000, budget: 20000 },
    { name: "Transportation", spent: 5000, budget: 8000 },
    { name: "Shopping", spent: 70000, budget: 10000 },
    { name: "Entertainment", spent: 3000, budget: 5000 },
    { name: "Bills & Utilities", spent: 8000, budget: 12000 },
  ];

  const budget = [];
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-lg bg-white shadow p-4">
          {/* Total Budget */}
          <div className="flex flex-row justify-between">
            <h5 className="text-sm text-gray-500 font-bold">Total Budget</h5>
            <PiggyBank className="text-blue-600 w-4 h-4" />
          </div>
          <div className="mt-2 text-2xl font-bold">Rs {budget}</div>
          <div className="text-xs text-gray-400">Monthly allocation</div>
        </div>

        <div className="border border-gray-200 rounded-lg bg-white shadow p-4">
          {/* Total Spent */}
          <div className="flex flex-row justify-between">
            <h5 className="text-sm text-gray-700 font-bold">Total Spent</h5>
            <Wallet className="text-red-600 w-4 h-4" />
          </div>
          <div className="mt-2 text-2xl font-bold">Rs 60000</div>
          <div className="text-xs text-gray-400">This month</div>
        </div>

        <div className="border border-gray-200 rounded-lg bg-white shadow p-4">
          {/* Remaining */}
          <div className="flex flex-row justify-between">
            <h5 className="text-sm text-gray-500 font-bold">Remaining</h5>
            <CheckCircle className="text-green-400 w-4 h-4" />
          </div>
          <div className="mt-2 text-green-400 text-2xl font-bold">Rs 10000</div>
          <div className="text-xs text-gray-400">Available</div>
        </div>
      </div>

      <div className="my-12 grid grid-cols-1 gap-4">
        <h3 className="text-2xl font-semibold">Budget Categories</h3>
        {categories.map((item) => (
          <BudgetCategoryItem
            key={item.name}
            name={item.name}
            spent={item.spent}
            budget={item.budget}
          />
        ))}
      </div>
    </>
  );
}

export default Budgets;
