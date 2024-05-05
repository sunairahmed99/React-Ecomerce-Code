import React from 'react'
import { Authdata } from '../Auth/authSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


export default function Myprofile() {
    let {loginUser} = useSelector(Authdata)
    let person = loginUser
    
  return (

    <>
    {(loginUser && loginUser.role ==='admin' && <Navigate to={'/'} replace={true}></Navigate>)}
    <div className='lg:mx-w-7xl bg-white p-6 rounded'>
        <h1 className=' text-center text-5xl mb-9 font-bold'>My Profile</h1>

<ul  className="divide-y divide-gray-100">
      <li key={person.email} className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
        <img
                    className="h-8 w-8"
                    src="https:/images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Your Company"
                  />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <button>edit</button>
         
        </div>
      </li>
    
  </ul>

    </div>
    </>
    


   
  )
}
