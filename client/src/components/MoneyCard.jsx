import React from 'react'

function MoneyCard({title,icon,amount,style}) {
    return (
        <div className='w-full py-6 px-5 border border-gray-200 rounded-xl bg-white space-y-1'>
            <div className='flex items-center justify-between gap-4 text-sm font-semibold text-black/70'>
                <span>{title}</span>
                <span className={`${style} text-xl`}>{icon}</span>
            </div>
            <span className='text-2xl font-bold'>{amount}</span>
        </div>
    )
}

export default MoneyCard