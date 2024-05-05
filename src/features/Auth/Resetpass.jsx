import React from 'react'
import { Authdata, fetchresetpassword } from './authSlice'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
let token = localStorage.getItem('token')

export default function Resetpass() {
    const {register,handleSubmit,reset,watch,formState: { errors },} = useForm()
    const {loginUser,loginerrmsg} = useSelector(Authdata)
    const dispatch = useDispatch()
    let{restoken} = useParams()


    const onSubmit = (data) =>{

        console.log(data)
        dispatch(fetchresetpassword({restoken,data}))
        reset()
    }
    
  return (
    <>
    {loginUser &&  <Navigate to='/' replace={true}></Navigate>}
    {token &&  <Navigate to='/' replace={true}></Navigate>}
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https:/tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        New Password
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form noValidate className="space-y-6"  method="POST" onSubmit={handleSubmit(onSubmit)}>
        

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              {...register("password", { required:'password required',maxLength:12,minLength:6})}
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
          {errors.password && errors.password.type ==='minLength' && <span className='text-red-600'>Password should be 6 characters</span>}
          {errors.password && errors.password.type ==='maxLength' && <span className='text-red-600'>Password should be less than 12 characters</span>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
              Conform Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="cpassword"
              {...register("cpassword", { required:'conform password required',maxLength:12,minLength:6,validate: value => value === watch('password') || "Passwords don't match" })}
              type="password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.cpassword && <span className='text-red-600'>{errors.cpassword.message}</span>}
          {errors.cpassword && errors.cpassword.type ==='minLength' && <span className='text-red-600'>Password should be 6 characters</span>}
          {errors.cpassword && errors.cpassword.type ==='maxLength' && <span className='text-red-600'>Password should be less than 12 characters</span>}
          {errors.cpassword && errors.cpassword.type ==='validate' && <span className='text-red-600'>Password do not match</span>}
        </div>
        {loginerrmsg && <p className='text-red-300 font-bold text-2xl'>{loginerrmsg}</p>}

    
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
