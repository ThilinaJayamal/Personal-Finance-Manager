import React from "react";
import { PiggyBank, Wallet, CheckCircle } from "lucide-react";
import BudgetCategoryItem from "../components/BudgetCategoryItem";
import { useAppContext } from "../contexts/AppProvider";

function Budgets() {

  const { budgetUsage } = useAppContext();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-lg bg-white shadow p-4">
          {/* Total Budget */}
          <div className="flex flex-row justify-between">
            <h5 className="text-sm text-gray-500 font-bold">Total Budget</h5>
            <PiggyBank className="text-blue-600 w-4 h-4" />
          </div>
          <div className="mt-2 text-2xl font-bold">Rs {budgetUsage.total.totalBudget}</div>
          <div className="text-xs text-gray-400">Monthly allocation</div>
        </div>

        <div className="border border-gray-200 rounded-lg bg-white shadow p-4">
          {/* Total Spent */}
          <div className="flex flex-row justify-between">
            <h5 className="text-sm text-gray-700 font-bold">Total Spent</h5>
            <Wallet className="text-red-600 w-4 h-4" />
          </div>
          <div className="mt-2 text-2xl font-bold">Rs {budgetUsage.total.totalSpent}</div>
          <div className="text-xs text-gray-400">This month</div>
        </div>

        <div className="border border-gray-200 rounded-lg bg-white shadow p-4">
          {/* Remaining */}
          <div className="flex flex-row justify-between">
            <h5 className="text-sm text-gray-500 font-bold">Remaining</h5>
            <CheckCircle className="text-green-400 w-4 h-4" />
          </div>
          <div className="mt-2 text-green-400 text-2xl font-bold">Rs {budgetUsage.total.remaining}</div>
          <div className="text-xs text-gray-400">Available</div>
        </div>
      </div>

      <div className="my-12 grid grid-cols-1 gap-4">
        <h3 className="text-2xl font-semibold">Budget Categories</h3>
        {budgetUsage.report.map((item, index) => (
          <BudgetCategoryItem
            key={index}
            name={item.category}
            spent={item.spent}
            budget={item.allocated}
          />
        ))}
      </div>
    </>
  );
}

export default Budgets;
