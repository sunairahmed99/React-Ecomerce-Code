import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminAddProduct from '../features/Admin/AdminAddProduct'


export default function AdminProductAddPage() {
    
  return (
    <div>
     <Navbar children={<AdminAddProduct/>}></Navbar>
    </div>
  )
}