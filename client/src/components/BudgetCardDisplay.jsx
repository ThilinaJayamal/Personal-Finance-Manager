import React, { useState } from 'react';
import { SquarePen, X, Save } from 'lucide-react';
import { useAppContext } from '../contexts/AppProvider';

function BudgetCardDisplay({ item }) {
    const { updateBudget, deleteBudget,getBudgetUsage,getBudgets } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedAmount, setEditedAmount] = useState(item.amount);

    const handleSave = async () => {
        try {
            await updateBudget(
                item._id,
                {
                    category: item.category,
                    amount: editedAmount
                }
            );
            await getBudgetUsage();
            setIsEditing(false);
        } catch (error) {
            return null;
        }
    }

    const handleDelete = async () => {
        try {
            await deleteBudget(item._id);
            await getBudgets();
            await getBudgetUsage();
        } catch (error) {
            return null
        }
    }

    return (
        <div className='bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center px-5 py-4 rounded-xl'>
  
            <div>
                <p className='font-semibold text-xl'>{item.category}</p>
                <p className='text-sm text-black/70'>Monthly Budget</p>
            </div>

            <div className='flex items-center justify-between gap-4 mt-3 md:mt-0'>
                {isEditing ? (
                    <input
                        type='number'
                        value={editedAmount}
                        onChange={(e) => setEditedAmount(e.target.value)}
                        className='border border-gray-300 rounded-md px-2 py-1 w-28'
                    />
                ) : (
                    <span className='text-lg font-bold'>Rs {item.amount.toFixed(2)}</span>
                )}
                <div className='flex gap-2'>
                    {isEditing ? (
                        <button
                            className='hover:bg-green-50 text-green-600 p-1 rounded-md border border-gray-200 hover:border-green-400'
                            onClick={handleSave}
                        >
                            <Save size={20} />
                        </button>
                    ) : (
                        <button
                            className='hover:bg-blue-50 text-blue-500 p-1 rounded-md border border-gray-200 hover:border-blue-300'
                            onClick={() => setIsEditing(true)}
                        >
                            <SquarePen size={20} />
                        </button>
                    )}
                    <button
                        className='hover:bg-red-50 text-red-500 p-1 rounded-md border border-gray-200 hover:border-red-300'
                        onClick={handleDelete}
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BudgetCardDisplay;
