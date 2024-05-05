import {React,useEffect,useState } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { Adminallproduct,fetchProduct,fetchgetProduct,fetchpatchproduct} from './adminProductSlice'
import { Link } from 'react-router-dom';

export default function AdminProduct() {

    const dispatch = useDispatch()
    const {product,error,loading,errmsg} = useSelector(Adminallproduct)
    const [filter] = useState({})
    const [sort] = useState({})
  

    const handledelete = (event,product)=>{

      let prod = {...product,delete:true}


        alert('are you sure to delete this product')
      
      dispatch(fetchpatchproduct(prod))
      dispatch(fetchgetProduct())

    }

    const handlerestore = (event,product)=>{

      let prod = {...product,delete:false}


        alert('are you sure to restore this product')
      
        dispatch(fetchpatchproduct(prod))
        dispatch(fetchgetProduct())

    }

   
    useEffect(()=>{
      dispatch(fetchProduct({filter,sort}))

    },[dispatch,filter,sort])

  return (
    <>
    <div className='my-9'>
      <Link to={'/admin/product/add/page'} className='bg-green-400 text-white text-4xl font-bold p-3 rounded-lg'>Add Product</Link>

    </div>
    {/* Product grid */}
    {loading ? (<h1>Loadingg</h1>) : error ? (<h1>{errmsg}</h1>) : (

<div className="lg:col-span-3">
<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
{product && product.map((product,index) => (
      <div key={index} className="group relative position-relative ">

        {product.delete === true && <p className='absolute  top-7 text-red-600 text-3xl font-bold '>Deleted</p>}
        
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 border border-2 border-solid">
          <img
            src={product.thumbnail}
            alt={product.thumbnail}
            className="h-full w-full  object-cover object-center lg:h-full lg:w-full"
          />
        </div>


        <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                
              <p className="mt-1 text-sm text-gray-500">{product.title}</p>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
            </div>

            <div>
            <p className="text-sm font-medium text-gray-900 text-red-600">${Math.round(product.price - (product.price * product.discountPercentage/100))}</p>
            <p className="text-sm font-medium text-gray-400 line-through">${product.price}</p>
            </div>
          </div>

          <div className='flex justify-between mt-4'>

            <Link to={`/admin/product/edit/page/${product.id}`} className='bg-blue-300 px-4 py-1 text-white'>Edit</Link>
            {
              product.delete === true ? <button onClick={e => handlerestore(e,product)} className='bg-blue-300 px-4 py-1 text-white'>Restore</button> :

              <button onClick={e => handledelete(e,product)} className='bg-blue-300 px-4 py-1 text-white'>Deleted</button>

            }
            
            </div> 

      </div>
))}

</div>
</div>
)}
    </>
  )
}


