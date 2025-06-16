import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

function AddTransaction() {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  // Sample recent transactions data
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: 'Lunch at café',
      category: 'Food & Dining',
      amount: -45.67,
      date: '2024-06-14',
      type: 'expense'
    },
    {
      id: 2,
      title: 'Monthly salary',
      category: 'Salary',
      amount: 5300.00,
      date: '2024-06-01',
      type: 'income'
    }
  ]);

  const categories = {
    expense: ['Food & Dining', 'Transportation', 'Entertainment', 'Shopping', 'Bills & Utilities', 'Healthcare'],
    income: ['Salary', 'Freelance', 'Investment', 'Business', 'Other Income']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new transaction object
    const newTransaction = {
      id: Date.now(), // Simple ID generation
      title: description,
      category: category,
      amount: type === 'expense' ? -parseFloat(amount) : parseFloat(amount),
      date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      type: type
    };

    // Add new transaction to the beginning of the array
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);

    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <div className="max-w-[100%] mx-auto p-4 space-y-6">
      {/* Add New Transaction Card */}
      <div className='bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg p-6'>
        <div className='flex items-center mb-6'>
          <div className='text-blue-600 mr-3'>
            <Plus size={24} />
          </div>
          <h1 className='text-gray-900 font-semibold text-xl'>Add New Transaction</h1>
        </div>
        
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {/* Type Field */}
            <div className='flex flex-col'>
              <label className='text-gray-700 text-sm font-medium mb-2'>Type</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50'
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            {/* Amount Field */}
            <div className='flex flex-col'>
              <label className='text-gray-700 text-sm font-medium mb-2'>Amount</label>
              <div className='relative'>
                <span className='absolute left-3 top-2 text-gray-500'>$</span>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className='pl-8 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  required
                />
              </div>
            </div>

            {/* Category Field */}
            <div className='flex flex-col'>
              <label className='text-gray-700 text-sm font-medium mb-2'>Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              >
                <option value="">Select category</option>
                {categories[type].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description Field */}
            <div className='flex flex-col'>
              <label className='text-gray-700 text-sm font-medium mb-2'>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Transaction description"
                className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-2'>
            <button
              type="submit"
              className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 flex items-center'
            >
              <Plus size={16} className="mr-2" />
              Add {type === 'expense' ? 'Expense' : 'Income'}
            </button>
          </div>
        </form>
      </div>

      {/* Recent Transactions Section */}
      <div className='bg-white shadow-md rounded-lg p-6'>
        <h2 className='text-gray-900 font-semibold text-xl mb-4'>Recent Transactions</h2>
        
        <div className='space-y-3'>
          {transactions.map((transaction) => (
            <div key={transaction.id} className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='flex items-center'>
                <div className={`p-2 rounded-full mr-4 ${
                  transaction.type === 'expense' 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-green-100 text-green-600'
                }`}>
                  {transaction.type === 'expense' ? (
                    <TrendingDown size={20} />
                  ) : (
                    <TrendingUp size={20} />
                  )}
                </div>
                <div>
                  <h3 className='font-medium text-gray-900'>{transaction.title}</h3>
                  <p className='text-sm text-gray-600'>{transaction.category}</p>
                </div>
              </div>
              
              <div className='text-right'>
                <p className={`font-semibold ${
                  transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {transaction.type === 'expense' ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                </p>
                <div className='flex items-center text-sm text-gray-500 mt-1'>
                  <Calendar size={14} className="mr-1" />
                  {transaction.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;