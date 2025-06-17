import React from 'react'
import {CalendarDays } from 'lucide-react';
function TransactionCard({item}) {
    return (
        <div
            className="flex justify-between items-center bg-gray-50 px-4 py-4 rounded-xl"
        >
            <div>
                <h4 className="font-bold text-lg text-black/80">{item.description}</h4>
                <p className="text-sm text-gray-500">{item.category}</p>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                    <CalendarDays size={14} className="mr-1" />
                    {new Date(item.date).toLocaleString()}
                </div>
            </div>

            <div className="text-right">
                <p
                    className={`font-bold text-xl
                        ${item.type === 'Expense' ? 'text-red-500' : 'text-green-600'
                        }`}
                >
                    Rs.{parseFloat(item.amount).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">{item.type}</p>
            </div>
        </div>
    )
}

export default TransactionCard