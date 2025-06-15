import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const expenseData = [
  { name: 'Food & Dining', value: 25 },
  { name: 'Transportation', value: 15 },
  { name: 'Shopping', value: 10 },
  { name: 'Entertainment', value: 10 },
  { name: 'Bills & Utilities', value: 20 },
  { name: 'Healthcare', value: 10 },
  { name: 'Travel', value: 5 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export default function ExpensePieChart() {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={expenseData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
