import React, { useState } from 'react'
import { useAppContext } from '../contexts/AppProvider';
import toast from 'react-hot-toast';

function AddTransaction() {
  const { addTransaction,getBudgetUsage } = useAppContext();
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Expense');

  const expenseTypes = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Travel',
    'Other',
  ];
  const incomeTypes = [
    "Salary",
    "Freelance",
    "Investment",
    "Business",
    "Gift",
    "Other"
  ];
  const handleSubmit = async () => {
    if (!category || !amount || !type) {
      toast.error('Please select a type, category and enter a amount.');
      return;
    }
    try {
      await addTransaction({
        category,
        amount,
        type,
        description
      });
      await getBudgetUsage();
      setCategory('');
      setAmount('');
      setDescription('');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='w-full'>
      {/* Set Budget Section */}
      <div className='rounded-xl bg-white py-6 px-6 border border-gray-200'>
        <h1 className='text-xl font-semibold mb-6'>
          <span className='text-blue-500'>+</span> Add Transactions
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          {/* Category */}
          <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-2.5'>
              Type
            </label>
            <select
              id='category'
              value={type}
              onChange={(e) => setType(e.target.value)}
              className='pl-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              {['Expense', 'Income'].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>


          {/* Budget Input */}
          <div>
            <label htmlFor='budget' className='block text-sm font-medium text-gray-700 mb-2.5'>
              Amount
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>Rs</span>
              <input
                type='number'
                placeholder='0.00'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='pl-10 pr-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>


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
              {
                (type === "Expense" ? expenseTypes : incomeTypes)
                  .map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
            </select>
          </div>

          <div>
            <label htmlFor='budget' className='block text-sm font-medium text-gray-700 mb-2.5'>
              Description
            </label>
            <input
              type='text'
              placeholder='Transaction description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='px-3 py-2.5 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Button */}
          <div className='flex items-end'>
            <button
              onClick={handleSubmit}
              className={`w-full ${type === "Income" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
               text-white font-semibold py-2.5 rounded-xl transition cursor-pointer`}
            >
              + {type === "Income" ? "Add Income" : "Add Expense"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction