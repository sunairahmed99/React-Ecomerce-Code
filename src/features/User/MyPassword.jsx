import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Authdata } from '../Auth/authSlice'

export default function MyPassword() {
  let {loginUser} = useSelector(Authdata)
  return (
    <>
    {(loginUser && loginUser.role ==='admin' && <Navigate to={'/'} replace={true}></Navigate>)}
    
    <div>MyPassword</div>
    </>
  )
}
