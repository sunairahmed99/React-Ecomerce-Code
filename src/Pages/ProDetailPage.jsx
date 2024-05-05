import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProDetail from '../features/Detail/ProDetail'

export default function ProDetailPage() {
  return (
    <div>
      
       <Navbar children={<ProDetail/>}/>
    </div>
  )
}
