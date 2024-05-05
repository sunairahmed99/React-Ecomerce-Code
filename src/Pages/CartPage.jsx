import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Cart from '../features/Cart/Cart'

export default function CartPage() {
  return (
    <div>
        <Navbar children={<Cart/>}></Navbar>
    </div>
  )
}
