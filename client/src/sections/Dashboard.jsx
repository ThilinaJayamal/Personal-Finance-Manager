import React from 'react'
import MoneyCard from '../components/MoneyCard'
import SimpleLineChart from '../components/SimpleLineChart'
import PieChart from '../components/PieChart'

function Dashboard() {
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <MoneyCard title={"Total Balance"} amount={"Rs 87,000.00"} icon={"$"} style={"text-green-600"}/>
          <MoneyCard title={"Monthly Income"} amount={"Rs 180,000.00"} icon={"+"} style={"text-blue-600"}/>
        </div>
        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <MoneyCard title={"Monthly Expenses"} amount={"Rs 56,000.00"} icon={"-"} style={"text-red-600"} />
          <MoneyCard title={"Savings Rate"} amount={"4.58%"} icon={"%"} color={""} style={"text-black"}/>
        </div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-2 mt-4 gap-4'>
        <div className='bg-white rounded-xl p-6'>
          <h3 className='font-semibold text-2xl'>Income vs Expenses</h3>
          <div className='mt-12'>
            <SimpleLineChart/>
          </div>
        </div>
        <div className='bg-white rounded-xl p-6'>
          <h3 className='font-semibold text-2xl'>Expense Categories</h3>
          <div>
            <PieChart/>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard