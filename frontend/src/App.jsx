import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Navbar from './components/Navbar/Navbar'
import Register from './pages/Register/Register'
import AddMenu from './pages/AddMenu/AddMenu'
import EditMenu from './pages/EditMenu/EditMenu'
import Cart from './pages/Cart/Cart'
import Orders from './pages/Orders/Orders'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/add-menu' element={<AddMenu/>} />
      <Route path='/edit-menu/:id' element={<EditMenu/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/orders' element={<Orders/>} />
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
    </>
  )
}

export default App
