import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './screen/Home'
import Login from './screen/Login'
import NoPage from './screen/NoPage'
import Modal from './screen/Modal'
import AdminDashboard from './screen/AdminDashboard/AdminDashboard'
import LoanFormPage from './screen/LoanForm'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/modal' element={<Modal />} />
        <Route path='/loan-form' element={<LoanFormPage />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </div>
  )
}

export default App