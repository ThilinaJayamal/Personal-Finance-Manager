import React, { useState } from 'react';
import BudgetCardDisplay from '../components/BudgetCardDisplay';

const monthlyBudgets = [
  { id: 1, category: 'Food & Dining', amount: 250.0, createdAt: '2025-06-01T10:15:00Z' },
  { id: 2, category: 'Transportation', amount: 100.0, createdAt: '2025-06-01T10:16:00Z' },
  { id: 3, category: 'Shopping', amount: 150.0, createdAt: '2025-06-01T10:17:00Z' },
  { id: 4, category: 'Entertainment', amount: 80.0, createdAt: '2025-06-01T10:18:00Z' },
  { id: 5, category: 'Bills & Utilities', amount: 200.0, createdAt: '2025-06-01T10:19:00Z' },
  { id: 6, category: 'Healthcare', amount: 120.0, createdAt: '2025-06-01T10:20:00Z' },
  { id: 7, category: 'Travel', amount: 300.0, createdAt: '2025-06-01T10:21:00Z' },
  { id: 8, category: 'Other', amount: 50.0, createdAt: '2025-06-01T10:22:00Z' },
];

function SetBudgets() {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');

  const expenseData = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Travel',
    'Other',
  ];

  const handleSubmit = () => {
    if (!category || !budget) {
      alert('Please select a category and enter a budget.');
      return;
    }

    console.log(`Set budget for ${category}: Rs ${budget}`);
    setCategory('');
    setBudget('');
  };

  return (
    <div className='w-full max-w-5xl mx-auto'>
      {/* Set Budget Section */}
      <div className='rounded-xl bg-white py-6 px-6 border border-gray-200'>
        <h1 className='text-xl font-semibold mb-6'>
          <span className='text-blue-500'>+</span> Set Monthly Budget
        </h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          {/* Category */}
          <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-2.5'>
              Category
            </label>
            <select
              id='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='pl-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>Select category...</option>
              {expenseData.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Input */}
          <div>
            <label htmlFor='budget' className='block text-sm font-medium text-gray-700 mb-2.5'>
              Monthly Budget
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>Rs</span>
              <input
                id='budget'
                type='number'
                placeholder='0.00'
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className='pl-10 pr-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          {/* Button */}
          <div className='flex items-end'>
            <button
              onClick={handleSubmit}
              className='w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition'
            >
              + Set Budget
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Budgets List */}
      <div className='rounded-xl bg-white py-6 px-6 border border-gray-200 mt-12'>
        <h3 className='text-xl font-semibold'>Monthly Budgets</h3>

        <div className='flex flex-col gap-4 mt-6'>
          {monthlyBudgets.map((item) => (
            <BudgetCardDisplay key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SetBudgets;
