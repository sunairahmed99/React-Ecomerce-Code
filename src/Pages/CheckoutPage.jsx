import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Checkout from '../features/Checkout/Checkout'

export default function CheckoutPage() {
  return (
    <div>
        <Navbar children={<Checkout/>}></Navbar>
    </div>
  )
}
