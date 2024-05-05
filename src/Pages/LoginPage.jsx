import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Login from '../features/Auth/Login'

export default function LoginPage() {
  return (
    <div>
        <Navbar children={<Login/>}></Navbar>
    </div>
  )
}
