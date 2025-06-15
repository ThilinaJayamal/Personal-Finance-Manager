import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', income: 5000, expense: 3000 },
  { month: 'Feb', income: 4500, expense: 2800 },
  { month: 'Mar', income: 4800, expense: 6700 },
  { month: 'Apr', income: 5200, expense: 3100 },
  { month: 'May', income: 5300, expense: 2900 },
  { month: 'Jun', income: 5000, expense: 2700 },
  { month: 'Jul', income: 5500, expense: 3100 },
  { month: 'Aug', income: 5500, expense: 3100 },
  { month: 'Sep', income: 5500, expense: 3100 },
];

function IncomeExpenseChart() {
  return (
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line strokeWidth={3} type="monotone" dataKey="income" stroke="#4CAF50" activeDot={{ r: 8 }} />
          <Line strokeWidth={3} type="monotone" dataKey="expense" stroke="#F44336" />
        </LineChart>
      </ResponsiveContainer>
  );
}

export default IncomeExpenseChart;
