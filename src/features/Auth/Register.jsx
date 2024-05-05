import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Authdata, RegisterPost} from './authSlice'

export default function Register() {

  const {register,handleSubmit,watch,reset,formState: { errors },} = useForm()
  let token = localStorage.getItem('token')
  let {loginUser,loginerrmsg,loginerror} = useSelector(Authdata)
  loginUser = loginUser && loginUser.data
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (data) =>{

    dispatch(RegisterPost(data))
    reset()
    if(loginUser){
      navigate('/')
    }
  } 


  return (
    <>
    {loginUser &&  <Navigate to='/' replace={true}></Navigate>}
    {token &&  <Navigate to='/' replace={true}></Navigate>}
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form noValidate className="space-y-6"  method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            First Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              {...register("name", { required:'Name required'})}
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
        </div>

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
        </div>

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
        {loginerror && <p className='text-red-300 font-bold text-2xl'>email already registered</p>}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register In
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already a member?{' '}
        <Link to={"/login/page"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Login To Your Account
        </Link>
      </p>
    </div>
  </div>
  </>
  )
}
