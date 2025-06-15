import React from 'react'
import { SquarePen, X } from 'lucide-react';

function BudgetCardDisplay({item}) {
    return (
        <div
            className='bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center px-5 py-4 rounded-xl'
        >
            {/* Left: Info */}
            <div>
                <p className='font-semibold'>{item.category}</p>
                <p className='text-sm text-black/70'>Monthly Budget</p>
            </div>

            {/* Right: Amount + Actions */}
            <div className='flex items-center justify-between gap-4 mt-3 md:mt-0'>
                <span className='text-lg font-bold'>Rs {item.amount.toFixed(2)}</span>
                <div className='flex gap-2'>
                    <button className='hover:bg-blue-50 text-blue-500 p-1 rounded-md border border-gray-200 hover:border-blue-300'>
                        <SquarePen size={20} />
                    </button>
                    <button className='hover:bg-red-50 text-red-500 p-1 rounded-md border border-gray-200 hover:border-red-300'>
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BudgetCardDisplay