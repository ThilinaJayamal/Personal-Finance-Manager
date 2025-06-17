import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export default function ExpensePieChart({ data }) {

  return (
    <div style={{ width: '100%', height: 400 }}>
      {
        (data && data.length > 0) ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `Rs ${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ textAlign: 'center', marginTop: 150 }}>No data to display</p>
        )
      }
    </div>
  );
}
