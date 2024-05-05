import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { addressdata,fetchgetaddress, fetchremoveShippingaddress } from './checkoutSlice'
import {allcartdata,fetchUpdateCart,fetchdelCart} from '../Cart/cartSlice'
import { Authdata } from '../Auth/authSlice'
import AddressForm from './AddressForm'
import { fetchAddOrder } from '../Order/orderSlice'
let subtotal;
let totalitem;


export default function Checkout() {
  const {register,handleSubmit,reset,formState: { errors },} = useForm()
  let {loginUser} = useSelector(Authdata)
  const {address} = useSelector(addressdata)
  const {Cart} = useSelector(allcartdata)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  


  const onSubmit = (data) =>{

    let orderdata;
    let ordernumber;
  
    if(Cart.length){

    const randomcode = Math.floor(Math.random() * 900000) + 100000;
    ordernumber = randomcode.toString();
    orderdata = {userid:loginUser.id,ordercode:ordernumber,paymentMethod:data.payment,totalprice:subtotal,totalitem:totalitem,status:'pending',products:[...Cart],add_id:data.address}
    }

    if(data.payment === 'cash'){
      dispatch(fetchAddOrder(orderdata))
      reset()
      return navigate(`/order/page/${ordernumber}`)
    }
    else if(data.payment === 'card'){
      dispatch(fetchAddOrder(orderdata))
      reset()
      return navigate(`/card/payment/${ordernumber}`)
    }
  } 

  const handleremoveaddress = (e,person)=>{
    e.preventDefault()
    dispatch(fetchremoveShippingaddress(person))
    dispatch(fetchgetaddress(loginUser.id))
  }

  if(Cart){

     subtotal = Cart.reduce((accumulator,item) => {
      let disprice = item.qty * Math.round(item.price - (item.price * item.discountPercentage/100))
      let price = disprice + accumulator
      return price
    }, 0);
  
   totalitem = Cart.reduce((accumulator,item) =>  accumulator + item.qty
  , 0);
  }
 



const handleqty = (e,product)=>{

    dispatch(fetchUpdateCart({...product,qty:+e.target.value}))

}

const handleremove = (e,product)=>{
  dispatch(fetchdelCart({...product}))
}

  useEffect(()=>{
    dispatch(fetchgetaddress(loginUser.id))

  },[dispatch,loginUser.id])

  useEffect(()=>{

    if(!Cart || !Cart.length){
      navigate('/')
    }

  },[Cart,navigate])

  

  

  return (
    <>
    {loginUser && loginUser.role ==='admin' && <Navigate to={'/'} replace={true}></Navigate>}
    {!Cart  &&   <Navigate to={'/'} replace={true}></Navigate>
    }

    <div className='grid grid-cols-1 lg:grid-cols-5'>

    <div className='col-span-3 bg-white p-4 md:mx-8'>



      
    <div className="space-y-12">

    <AddressForm/>
    
    <form method='post' onSubmit={handleSubmit(onSubmit)}>
    <div className="border-b border-gray-900/10 pb-12">
      
      <div className="mt-10 space-y-10">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">Address</legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Select Your Address where to Deliever Your Order
          </p>
          <p>
            {errors.address && <span className='text-red-600'>{errors.address.message}</span>}
            {errors.payment && <span className='text-red-600'>{errors.payment.message}</span>}
          </p>
      
            {!(address.length) ? (<h1 className='text-red-600'>Select One Address For Shipping order</h1>) : (

                <div className="mt-6 space-y-6">
                  
                <ul  className="divide-y divide-gray-100">
                {address.map((person,index) => (
                <li key={index} className="flex justify-between gap-x-6 py-5 border border-solid border-gray-200 border-2 p-4 border-rounded">
                <div className="flex min-w-0 gap-x-4">
                <input
                      id="push-everything"
                      {...register("address", { required:' select one address required'})}
                      defaultValue={person._id} 
                      type="radio"
                      className="h-10 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
              
                <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{person.address}</p>
                <p className="text-xs leading-5 text-gray-500">Phone_No: <span>{person.phone}</span></p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none ">
                  </div>
                  <p className="text-xs leading-5 text-gray-500">{person.country}</p>
                  <p className="text-xs leading-5 text-gray-500">{person.state}</p>
                  <p className="text-xs leading-5 text-gray-500">{person.city}</p>
                </div>
                <button className='bg-blue-300 rounded p-1 mt-4 text-white' onClick={e => handleremoveaddress(e,person)}>remove</button>
                </div>
                </li>
                ))}
                </ul>
                
                  
                </div>

            )}
            

      
          
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Method</legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">Select Your Payment Method</p>
          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-x-3">
              <input
                id="cash"
                {...register("payment", { required:'payment method required'})}
                defaultChecked={true}
                defaultValue={'cash'}
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                Cash On Delievery
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="card"
                {...register("payment", { required:'payment method required'})}
                defaultValue={'card'}
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                Card Payment
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6">
                <button
                to={"/checkout/page"}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
                >
                  Place Order
                </button>
            </div>
    </div>
    </form>
    </div>


    </div>


    <div className='col-span-2'>

    <div className='lg:mx-w-7xl bg-white p-4 rounded'>
    <div className="mt-8">
                <div className="flow-root">
                <ul  className="-my-6 divide-y divide-gray-200">
                    {Cart && Cart.map((product) => (
                    <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                            src={product.thumbnail}
                            alt={product.thumbnail}
                            className="h-full w-full object-cover object-center"
                        />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                        <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                                <p>{product.title}</p>
                            </h3>
                            <p className="ml-4 text-red-600">${product.qty * Math.round(product.price - (product.price * product.discountPercentage/100))}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                            
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {product.quantity}
                            <select value={product.qty} className='border border-1  border-gray-600' onChange={e => handleqty(e,product)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            </p>

                            <div className="flex">
                            <button
                                onClick={e => handleremove(e,product)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Remove
                            </button>
                            </div>
                        </div>
                        </div>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base mt-3 font-medium text-red-600">
                <p>Subtotal</p>
                <p>${subtotal}</p>
            </div>
            <div className="flex justify-between text-base mt-3 font-medium text-red-600">
                <p>total items</p>
                <p>{totalitem} items</p>
            </div>
            
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                or{' '}
                <Link
                    to={'/'}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    
                >
                    
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                </Link>
                </p>
            </div>
            </div>

    </div>

    </div>

    </div>
    </>

   


    
  )
}
