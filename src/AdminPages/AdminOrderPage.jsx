import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminOrder from '../features/Admin/AdminOrder'

export default function AdminOrderPage() {
  return (
    <div>
        <Navbar children={<AdminOrder/>}></Navbar>
    </div>
  )
}
