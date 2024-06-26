import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchgetallOrder, fetchpatchOrder, orderdata } from '../Order/orderSlice'

export default function AdminOrder() {
    const dispatch = useDispatch()
    const {Order} = useSelector(orderdata)
    console.log(Order)

    const handledelivered = (e,order)=>{

        const data = {...order, status:'delivered'}
        dispatch(fetchpatchOrder(data))
        dispatch(fetchgetallOrder())
    }

    const handleconf = (e,order)=>{
        
        const data = {...order, status:'conformed'}
        dispatch(fetchpatchOrder(data))
        dispatch(fetchgetallOrder())
    }

    const handlepending = (e,order)=>{
        
        const data = {...order, status:'pending'}
        dispatch(fetchpatchOrder(data))
        dispatch(fetchgetallOrder())
    }

    useEffect(()=>{

        dispatch(fetchgetallOrder())

    },[dispatch])
  return (
    <>

  {/* component */}
  <section className="container px-4 mx-auto border border-2 border-solid">
    <div className="flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 px-9 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex items-center gap-x-3">
                      <input
                        type="checkbox"
                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                      />
                      <button className="flex items-center gap-x-2">
                        <span>S.No</span>
                        <svg
                          className="h-3"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http:/www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.1"
                          />
                          <path
                            d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.1"
                          />
                          <path
                            d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.3"
                          />
                        </svg>
                      </button>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    OrderCode
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    PaymentMethod
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Total Item
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Total price
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Shipping Address
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                     Status
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Order Status
                  </th>
                 
                 
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {
                    Order && Order.map((order,index)=>{
                        return(

                            <tr key={index}>
                            <td className="px-9 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                <input
                                  type="checkbox"
                                  className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                />
                                <span>{index + 1}</span>
                              </div>
                            </td>
                            
                            <td className="px-9 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {order.ordercode}
                            </td>
                            <td className="px-9 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                               <span>{order.paymentMethod}</span>
                              </div>
                            </td>
                            <td className="px-9 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <div className=" gap-x-2">
                                {
                                    order.products && order.products.map((pro,index)=>{
                                        return(
                                            <div key={index} className='py-2'>
                                  
                                    <img src={pro.thumbnail} className='w-15 h-7 ' alt="" />
                                  <h3 className='py-1'>{pro.title}</h3>
                                  <h3 className='py-1'><span>{pro.brand}  </span>{pro.category}<span></span></h3>
                                  <h3 className='py-1'><span>qty: {pro.qty}</span>  <span>stock: {pro.stock}</span></h3>
                                  
                                </div>

                                        )

                                    })
                                }
                                
                              </div>
                            </td>
                            <td className="px-9 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <span>{order.totalitem}</span>
                            </td>
                            <td className="px-9 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                                <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                <span>${order.totalprice}</span>
                                </button>
                                
                              </div>
                            </td>
                           
                            <td className="px-9 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <h3>{order.add_id.address}</h3>
                              <h3>{order.add_id.email}</h3>
                              <h3>{order.add_id.name}</h3>
                              <h3>{order.add_id.phone}</h3>
                              <p><span>{order.add_id.country}</span>  <span>{order.add_id.state}</span>    <span>{order.add_id.city}</span></p>
                            </td>
                            <td className="px-9 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <span>{order.status}</span>
                            </td>
                            <td className="px-9 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                              <button onClick={e => handlepending(e,order)} className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300  focus:outline-none bg-green-400 p-3 rounded-lg text-white">
                                  Pending
                                </button>
                                <button onClick={e => handleconf(e,order)} className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300  focus:outline-none bg-green-400 p-3 rounded-lg text-white">
                                  Conformed
                                </button>
                                <button onClick={e => handledelivered(e,order)} className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300  focus:outline-none bg-green-400 p-3 rounded-lg text-white">
                                  Delievered
                                </button>
                                 
                               
                              </div>
                            </td> 
                          </tr>
                        )
                    })
                }
               
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between mt-6">
      <a
        href="/"
        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <svg
          xmlns="http:/www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>previous</span>
      </a>
      <div className="items-center hidden md:flex gap-x-3">
        <a
          href="/"
          className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
        >
          1
        </a>
        <a
          href="/"
          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
        >
          2
        </a>
        <a
          href="/"
          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
        >
          3
        </a>
        <a
          href="/"
          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
        >
          ...
        </a>
        <a
          href="/"
          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
        >
          12
        </a>
        <a
          href="/"
          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
        >
          13
        </a>
        <a
          href="/"
          className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
        >
          14
        </a>
      </div>
      <a
        href="/"
        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <span>Next</span>
        <svg
          xmlns="http:/www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </a>
    </div>
  </section>
</>



  )
}
