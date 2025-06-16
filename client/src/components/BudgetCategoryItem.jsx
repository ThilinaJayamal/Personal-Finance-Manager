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
    <div className="p-3">
      <div className="flex items-center mb-1">
        <div className="mr-3">{iconMap[name]}</div>
        <div>
          <div className="font-semibold text-lg">{name}</div>
          <div className="text-gray-600">${spent} of ${budget}</div>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded mb-1">
        <div
          className="h-full bg-black rounded"
          style={{ width: `${Math.min((spent / budget) * 100, 100)}%` }}
        />
      </div>

      <div className="flex justify-between items-center">
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
  );
};

export default BudgetCategoryItem;
