import { React, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate} from 'react-router-dom'
import { Authdata} from '../Auth/authSlice'
import { allcartdata,fetchUpdateCart,fetchdelCart,fetchgetCart } from './cartSlice'


export default function Cart() {

    let {loginUser} = useSelector(Authdata)
    const dispatch = useDispatch()
    const {Cart} = useSelector(allcartdata)
    const navigate = useNavigate()
    let subtotal = 0
    let totalitem = 0

    if(Cart){

         subtotal = Cart.reduce((accumulator,item) => {
            let disprice = item.qty * Math.round(item.price - (item.price * item.discountPercentage/100))
            let price = disprice + accumulator
            return price
        }, 0);
    
         totalitem = Cart.reduce((accumulator,item) =>  accumulator + item.qty
        , 0);

    }



    const handlecheck = (e)=>{
        
        if(!Cart || !Cart.length){
            alert('your cart is empty please add some items')
            navigate('/cart/page')
        }
        else{
            navigate('/checkout/page')
        }
    }

    const handleqty = (e,product)=>{
        console.log(e.target.value)

        dispatch(fetchUpdateCart({...product,qty:+e.target.value}))

    }

    const handleremove = (e,product)=>{
        dispatch(fetchdelCart({...product}))
    }
    
    useEffect(()=>{

        if(loginUser){
            dispatch(fetchgetCart(loginUser.id))
        }

    },[dispatch,loginUser.id,loginUser])
 

  return (
    <>
    {loginUser && loginUser.role ==='admin' && <Navigate to={'/'} replace={true}></Navigate>}
    {!loginUser  && <Navigate to={'/login/page'} replace={true}></Navigate>}
        <div className='lg:mx-w-7xl bg-white p-4 rounded'>
        <div className="mt-8">
            <div className="flow-root">
            <ul  className="-my-6 divide-y divide-gray-200">
                {Cart && Cart.map((product,index) => (
                <li key={index} className="flex py-6">
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
        <div className="mt-6">
            <button
            onClick={e => handlecheck(e)}
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
            >
            Checkout
            </button>
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
    </>
    
  )
}
