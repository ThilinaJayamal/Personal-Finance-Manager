import React from "react";
import BudgetCategoryItem from "../components/BudgetCategoryItem";
import { useAppContext } from "../contexts/AppProvider";
import MoneyCard from "../components/MoneyCard";

function Budgets() {

  const { budgetUsage } = useAppContext();

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <MoneyCard title={"Total Budget"} amount={budgetUsage.total.totalBudget} icon={"$"} style={"text-green-600"} />
        <MoneyCard title={"Total Spent"} amount={budgetUsage.total.totalSpent} icon={"-"} style={"text-red-600"} textColor="text-red-600" />
        <MoneyCard title={"Remaining"} textColor={budgetUsage.total.totalSpent >= 0 ? "text-green-500" : "text-red-500"}
          amount={budgetUsage.total.remaining} icon={"$"} style={"text-green-600"} />
      </div>

      <div className="my-12 grid grid-cols-1 gap-4">
        <h3 className="text-2xl font-semibold">Budget Categories</h3>
        {budgetUsage.report.map((item, index) => (
          <BudgetCategoryItem
            key={index}
            item={item}
          />
        ))}
      </div>
    </>
  );
}

export default Budgets;
