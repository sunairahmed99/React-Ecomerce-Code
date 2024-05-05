import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector} from 'react-redux'
import { fetchAddaddress} from './checkoutSlice'
import { Authdata } from '../Auth/authSlice'

export default function AddressForm() {
    const {register,handleSubmit,reset,formState: { errors },} = useForm()
    let {loginUser} = useSelector(Authdata) 
    const dispatch = useDispatch()

    const onSubmit = (data) =>{

        dispatch(fetchAddaddress(data))
        reset()
      }
  return (
    <form noValidate method='post' onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b border-gray-900/10 pb-12">

         
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <input type="hidden" defaultValue={loginUser.id} {...register("userid")}/>
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Your Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name", { required:'name required'})}
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  {...register("phone", { required:'phone Number required',maxLength:11,minLength:11})}
                  id="phone"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.phone && <span className='text-red-600'>{errors.phone.message}</span>}
              {errors.phone && errors.phone.type ==='minLength' && <span className='text-red-600'>Phone Number should be 11 characters</span>}
              {errors.phone && errors.phone.type ==='maxLength' && <span className='text-red-600'>Phone Number should be  11 characters</span>}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required:'email required'})}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
              {errors.email && errors.email.type ==='pattern' && <span className='text-red-600'>Invalid Email Syntax</span>}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  {...register("country", { required:'country required'})}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Pakistan</option>
                </select>
              </div>
              {errors.country && <span className='text-red-600'>{errors.country.message}</span>}
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("address", { required:'address required'})}
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.address && <span className='text-red-600'>{errors.address.message}</span>}
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("city", { required:'city required'})}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.city && <span className='text-red-600'>{errors.city.message}</span>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("state", { required:'state required'})}
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.state && <span className='text-red-600'>{errors.state.message}</span>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("code", { required:'code required'})}
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.code && <span className='text-red-600'>{errors.code.message}</span>}
            </div>
          </div>
               <div className="mt-6 w-100% border border-solid-1">

                 <button className="bg-indigo-600 rounded hover:bg-blue-700 text-white font-bold py-3 px-4 rounded w-full">
                  Save Address
                </button>
        
                   
                </div>
           
        </div>
        </form>
  )
}
