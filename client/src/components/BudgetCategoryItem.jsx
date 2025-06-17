import React from "react";
import { Utensils, Car, ShoppingBag, Theater, Bolt } from "lucide-react";

const iconMap = {
  "Food & Dining": <Utensils size={24} color="#000" />,
  "Transportation": <Car size={24} color="#000" />,
  "Shopping": <ShoppingBag size={24} color="#000" />,
  "Entertainment": <Theater size={24} color="#000" />,
  "Bills & Utilities": <Bolt size={24} color="#000" />,
};

const BudgetCategoryItem = ({ name, spent, budget }) => {
  const percentage = ((spent / budget) * 100).toFixed(1);
  const remaining = budget - spent;

  const getPercentageColor = () => {
    if (percentage > 100) return "text-red-500";
    if (percentage >= 90) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="px-4 py-5 border border-gray-200 rounded-xl bg-white">
      <div className="flex items-center mb-1 justify-between gap-4">
        <div>
          <div>
            <div className="font-semibold text-lg">{name}</div>
            <div className="text-gray-600">${spent} of ${budget}</div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className={`${getPercentageColor()} font-semibold`}>
            {percentage}%
          </div>
          <div className="text-sm">
            {remaining >= 0 ? (
              <span className="text-green-600">${remaining} left</span>
            ) : (
              <span className="text-red-500">Over budget by ${Math.abs(remaining)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded mb-1">
        <div
          className="h-full bg-black rounded"
          style={{ width: `${Math.min((spent / budget) * 100, 100)}%` }}
        />
      </div>

    </div>
  );
};

export default BudgetCategoryItem;
