import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import MyPassword from '../features/User/MyPassword'

export default function MyPasswordPage() {
  return (
    <div>
        <Navbar children={<MyPassword/>}></Navbar>
    </div>
  )
}
