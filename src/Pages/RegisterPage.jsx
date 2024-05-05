import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Register from '../features/Auth/Register'

export default function RegisterPage() {
  return (
    <div>
        <Navbar children={<Register/>}></Navbar>
    </div>
  )
}
