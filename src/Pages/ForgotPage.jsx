import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Forgotpass from '../features/Auth/Forgotpass'

export default function ForgotPage() {
  return (
    <div>
        <Navbar children={<Forgotpass/>}></Navbar>
    </div>
  )
}
