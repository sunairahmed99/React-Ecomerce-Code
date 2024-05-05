import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Myprofile from '../features/User/Myprofile'

export default function MyProfilePage() {
  return (
    <div>
        <Navbar children={<Myprofile/>}></Navbar>
    </div>
  )
}
