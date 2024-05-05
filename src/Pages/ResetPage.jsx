import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Resetpass from '../features/Auth/Resetpass'

export default function ResetPage() {
  return (
    <div>
        <Navbar children={<Resetpass/>}></Navbar>
    </div>
  )
}
