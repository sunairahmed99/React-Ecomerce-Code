import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Product from '../features/Product/Product'

export default function HomePage() {
  return (
    <div>
        <Navbar children={<Product/>}></Navbar>
    </div>
  )
}
