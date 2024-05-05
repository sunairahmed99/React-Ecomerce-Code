import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProduct from '../features/Admin/AdminProduct'

export default function AdminProductPage() {
  return (
    <div>
      <Navbar children={<AdminProduct/>}></Navbar>
     
    </div>
  )
}
