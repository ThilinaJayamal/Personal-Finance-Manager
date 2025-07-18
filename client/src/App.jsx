import React from 'react'
import UserLayout from './pages/UserLayout'
import Login from './pages/Login'
import Dashboard from './sections/Dashboard'
import AddTransaction from './sections/AddTransaction'
import Trasactions from './sections/Transactions'
import Budgets from './sections/Budgets'
import SetBudgets from './sections/SetBudgets'
import ProtectedRoute from './components/ProtectedRoute';
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Routes>
        {/** Login route (public) */}
        <Route path='login' element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/add-transactions' element={<AddTransaction />} />
            <Route path='/budgets' element={<Budgets />} />
            <Route path='/set-budgets' element={<SetBudgets />} />
            <Route path='/transactions' element={<Trasactions />} />
          </Route>
        </Route>
      </Routes>
      {/** Toast notifications */}
      <Toaster />
    </>
  )
}

export default App