import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, useParams } from 'react-router-dom'
import { allSingleproduct, fetchSingleProduct } from './proDetailSlice'
import { allcartdata, fetchAddCart} from '../Cart/cartSlice'
import { Authdata} from '../Auth/authSlice'

export default function ProDetail() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {Cart} = useSelector(allcartdata)
    let {loginUser} = useSelector(Authdata)
    const {Singleproduct,Loading,error,errmsg} = useSelector(allSingleproduct)
    const prod = Singleproduct[0]
  

    useEffect(()=>{
        dispatch(fetchSingleProduct(id))

    },[dispatch,id])

    const AddCart = (e)=>{

      e.preventDefault()
      
      if(loginUser){
        const product = {...prod,proid:prod.id,qty:1,userid:loginUser.id}
        
        if(Cart){
          let index = Cart.findIndex(el => el.proid === product.proid)
        
          if(index === 0 || index > 0){
            alert('this item already added in cart')
          }
          else{
            if(loginUser){
              dispatch(fetchAddCart(product))
            return navigate('/cart/page')

            }
          }
        } 
      }
      else{
        alert('please login first')
        return navigate(`/product/detail/${id}`)
      }
    }

  return (
    <div className="bg-white">
        {Loading ? (<h1>Loadingg</h1>) : error ? (<h1>{errmsg}</h1>): (

<div className="pt-6">
        
{/* Image gallery */}
<div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
  <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
    <img
      src={Singleproduct[0] && Singleproduct[0].images[0]}
      alt={Singleproduct[0] && Singleproduct[0].images[0]}
      className="h-full w-full object-cover object-center"
    />
  </div>
  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
      <img
        src={Singleproduct[0] && Singleproduct[0].images[1]}
        alt={Singleproduct[0] && Singleproduct[0].images[2]}
        className="h-full w-full object-cover object-center"
      />
    </div>
    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
      <img
        src={Singleproduct[0] && Singleproduct[0].images[2]}
        alt={Singleproduct[0] && Singleproduct[0].images[2]}
        className="h-full w-full object-cover object-center"
      />
    </div>
  </div>
  <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
    <img
      src={Singleproduct[0] && Singleproduct[0].images[3]}
      alt={Singleproduct[0] && Singleproduct[0].images[3]}
      className="h-full w-full object-cover object-center"
    />
  </div>
</div>

{/* Product info */}
<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{Singleproduct[0] && Singleproduct[0].title}</h1>
  </div>

  {/* Options */}
  <div className="mt-4 lg:row-span-3 lg:mt-0">
    <h2 className="sr-only">Product information</h2>
    <p className="text-3xl tracking-tight text-red-500">Price: ${Singleproduct[0] && (Math.round((Singleproduct[0].price - (Singleproduct[0].price * Singleproduct[0].discountPercentage/100))))}</p>
    <div className="mt-6">
      {loginUser && loginUser.role ==='admin' ? '' :(

          <button
          onClick={e => AddCart(e)}
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
          Add To Cart
          </button>
      ) }
        </div>
        

    {/* Reviews */}
    {/* <div className="mt-6">
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                'h-5 w-5 flex-shrink-0'
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="sr-only">{reviews.average} out of 5 stars</p>
        <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
          {reviews.totalCount} reviews
        </a>
      </div>
    </div> */}

    <form className="mt-10">
      {/* Colors */}
      {/* <div>
        <h3 className="text-sm font-medium text-gray-900">Color</h3>

        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
          <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
          <div className="flex items-center space-x-3">
            {product.colors.map((color) => (
              <RadioGroup.Option
                key={color.name}
                value={color}
                className={({ active, checked }) =>
                  classNames(
                    color.selectedClass,
                    active && checked ? 'ring ring-offset-1' : '',
                    !active && checked ? 'ring-2' : '',
                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                  )
                }
              >
                <RadioGroup.Label as="span" className="sr-only">
                  {color.name}
                </RadioGroup.Label>
                <span
                  aria-hidden="true"
                  className={classNames(
                    color.class,
                    'h-8 w-8 rounded-full border border-black border-opacity-10'
                  )}
                />
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div> */}

      {/* Sizes */}
      {/* <div className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Size</h3>
          <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Size guide
          </a>
        </div>

        <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
          <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
            {product.sizes.map((size) => (
              <RadioGroup.Option
                key={size.name}
                value={size}
                disabled={!size.inStock}
                className={({ active }) =>
                  classNames(
                    size.inStock
                      ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                      : 'cursor-not-allowed bg-gray-50 text-gray-200',
                    active ? 'ring-2 ring-indigo-500' : '',
                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                    {size.inStock ? (
                      <span
                        className={classNames(
                          active ? 'border' : 'border-2',
                          checked ? 'border-indigo-500' : 'border-transparent',
                          'pointer-events-none absolute -inset-px rounded-md'
                        )}
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                      >
                        <svg
                          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          stroke="currentColor"
                        >
                          <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div> */}

      {/* <button
        type="submit"
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to bag
      </button> */}
    </form>
  </div>

  <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
    {/* Description and details */}
    <div>
      <h3 className="sr-only">Description</h3>

      <div className="space-y-6">
        <p className="text-base text-gray-900">{Singleproduct[0] && Singleproduct[0].description}</p>
      </div>
    </div>

    <div className="mt-10">
      <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

      <div className="mt-4">
        <ul  className="list-disc space-y-2 pl-4 text-sm">
         
          <p className="text-gray-600">{Singleproduct[0] && Singleproduct[0].brand}</p>
          <p className="text-gray-600">{Singleproduct[0] && Singleproduct[0].category}</p>
          <p className="text-gray-600">{Singleproduct[0] && Singleproduct[0].rating}</p>
          
        </ul>
      </div>
    </div>

    <div className="mt-10">
      <h2 className="text-sm font-medium text-gray-900">Details</h2>

      <div className="mt-4 space-y-6">
        <p className="text-sm text-gray-600">{Singleproduct[0] && Singleproduct[0].description}</p>
      </div>
    </div>
  </div>
</div>
</div>

        )}
     
    </div>
  )
}
