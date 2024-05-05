import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductEdit from '../features/Admin/AdminProductEdit'


export default function AdminProductEditPage() {
    
  return (
    <div>
     <Navbar children={<AdminProductEdit/>}></Navbar>
    </div>
  )
}
