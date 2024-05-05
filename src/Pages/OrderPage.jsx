import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Order from '../features/Order/Order'

export default function OrderPage() {
  return (
    <div>
        <Navbar children={<Order/>}></Navbar>
    </div>
  )
}
