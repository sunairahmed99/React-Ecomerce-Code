import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchdelOrder, fetchgetOrder, orderdata } from '../Order/orderSlice'
import { Authdata } from '../Auth/authSlice'
import { Navigate } from 'react-router-dom'



export default function MyOrder() {
    const {Order} = useSelector(orderdata)
    let {loginUser} = useSelector(Authdata)
    const dispatch = useDispatch()


    const handlecancleorder = (e,option)=>{
        if(Order.status === 'delivered'){

            alert('order are on the way please contact our agent')

        }
        else{
        alert('are you sure to cancel your order')
        e.preventDefault()
         dispatch(fetchdelOrder(option))
        }
    }

    useEffect(()=>{

            dispatch(fetchgetOrder(loginUser.id))

  },[dispatch,loginUser.id])



  return (

    <>
    {(loginUser && loginUser.role ==='admin' && <Navigate to={'/'} replace={true}></Navigate>)}
    {Order && !Order.length ? (<h1>No Order Place Yet</h1>) : (

        <div className='p-3 lg:mx-w-7xl'>
        <div className="mt-8">
        <div className="flow-root">
        <ul  className="-my-6 divide-y divide-gray-200">
            {Order && Order.map((option,index) => (
                
                <div key={index} className='max-w-7xl bg-white p-5 my-3'>
                    <h1 className='text-center font-weight:bold text-4xl'>Order Number :{option.ordercode} <span></span></h1>
                {option.products && option.products.map((product,index)=>

                <li key={index} className="flex py-6 bg-white p-3 mt-5">
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
                        <p href={product.href}>{product.title}</p>
                    </h3>
                
                    <p className="ml-4">${product.qty * Math.round((product.price - (product.price * product.discountPercentage/100)))}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {product.qty}</p>

                </div>
                </div>
                </li>
            )}

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base mt-3 font-medium ">
                    <p>Subtotal</p>
                    <p>${option.totalprice}</p>
                </div>
                <div className="flex justify-between text-base mt-3 font-medium">
                    <p>total items</p>
                    <p>{option.totalitem} items</p>
                </div>
                <div className="flex justify-between text-base mt-3 font-medium">
                    <p>Order Status</p>
                    <p>{option.status}</p>
                </div>
                <div className="flex justify-between text-base mt-3 font-medium">
                    <p>Payment Method</p>
                    <p>{option.paymentMethod}</p>
                </div>

                {/* <div className="flex justify-between text-base mt-3 font-medium">
                    <p>Shipping Address</p>
                    <p>{option.address.address}</p>
                </div>
                <div className="flex justify-between text-base mt-3 font-medium">
                    <p>shipping email</p>
                    <p>{option.address.email}</p>
                </div>
                <div className="flex justify-between text-base mt-3 font-medium">
                    <p>Phone number</p>
                    <p>{option.address.phone}</p>
                </div> */}

{option.status === 'pending' && (
    <div className="mt-8">
    <button
    onClick={e => handlecancleorder(e,option)}
    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
    >
    Cancel Order
    </button>
</div>
)}

       
</div>
                </div>
            ))}
        </ul>
        </div>
    </div>
          
</div>

    ) }
    </>
   
 
  )
}
