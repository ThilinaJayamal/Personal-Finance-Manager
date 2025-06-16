import React, { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './sections/Dashboard'
import AddTransaction from './Sections/AddTransaction'
import Trasactions from './sections/Transactions'
import Budgets from './sections/Budgets'
import SetBudgets from './sections/SetBudgets'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [budget,setBudget] = useState('');
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/add-transactions' element={<AddTransaction />} />
        <Route path='/budgets' element={<Budgets budget={budget}/>} />
        <Route path='/set-budgets' element={<SetBudgets/>} />
        <Route path='/transactions' element={<Trasactions/>} />
      </Route>
    </Routes>
  )
}

export default App