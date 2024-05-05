import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import MyOrder from '../features/User/MyOrder'

export default function MyOrderPage() {
  return (
    <div>
        <Navbar children={<MyOrder/>}/>
    </div>
  )
}
