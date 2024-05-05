import React from 'react'
import { useForm } from "react-hook-form"
import {Navigate} from 'react-router-dom'
import { Authdata, fetchforgotpassword } from './authSlice'
import { useDispatch, useSelector } from 'react-redux'
let token = localStorage.getItem('token')

export default function Forgotpass() {
    const {register,handleSubmit,reset,formState: { errors },} = useForm()
    const {loginUser,loginerror} = useSelector(Authdata)
    const dispatch = useDispatch()
   

    const onSubmit = (data) =>{

        console.log(data)
        dispatch(fetchforgotpassword(data))

        reset()
    }

    // / useEffect(()=>{

    // /   if(!loginerrmsg){
    // /     alert('reset password email sent successfully to your email')
    // /   }

    // / },[loginerrmsg])
  return (
    <>
    {/* {loginUser &&  <Navigate to='/' replace={true}></Navigate>} */}
    {token &&  <Navigate to='/' replace={true}></Navigate>}
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https:/tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Forgot Password
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form noValidate className="space-y-6"  method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              {...register("email", { required:'email required',pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
          {errors.email && errors.email.type ==='pattern' && <span className='text-red-600'>Invalid Email Syntax</span>}
          {loginerror && <p className='text-red-600'>email not found</p>}
          {loginUser && <p className='text-red-600'>{loginUser.message}</p> }
        </div>
    
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  </>
  )
}
