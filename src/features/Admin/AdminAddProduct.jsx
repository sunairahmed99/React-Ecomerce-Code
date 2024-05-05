import React from 'react'
import { useForm } from "react-hook-form"
import { allcategories } from '../Category/categorySlice'
import { allbrand } from '../Brand/BrandSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchaddproduct } from './adminProductSlice'
import { useNavigate } from 'react-router-dom'

export default function AdminAddProduct() {
    const {register,handleSubmit,reset,formState: { errors },} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {category} = useSelector(allcategories)
    const {brand} = useSelector(allbrand)
    

    const onSubmit = (data) =>{

        let prod = {...data}

        prod.price = +prod.price
        prod.discountPercentage = +prod.discountPercentage
        prod.stock = +prod.stock
        prod.rating = +prod.rating
        prod.images = [prod.image1,prod.image2,prod.image3,prod.image4,prod.thumbnail]
        delete prod['image1']
        delete prod['image2']
        delete prod['image3']
        delete prod['image4']

        dispatch(fetchaddproduct(prod))
        reset()
        navigate('/admin/product/page') 
    }
  return (
    <div className='mx-w-7xl bg-white p-5 mt-7'>

        <h1 className='text-center font-bold text-5xl pb-9'>ADD PRODUCT FORM</h1>

            <form method='post' onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
            

            <div className="border-b border-gray-900/10 pb-12">
                

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        {...register("title", { required: 'title required' })}
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.title && <span className='text-red-600'>{errors.title.message}</span>}
                </div>


                <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        {...register("description", { required: 'description required' })}
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.description && <span className='text-red-600'>{errors.description.message}</span>}   
                </div>

                </div>


                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                    </label>
                    <div className="mt-2">
                    <select
                  {...register("category", { required:'country required'})}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >  
                <option value="">--Choose Category--</option>
                  {category.map((cat,index)=>{
                    return (

                        <option key={index}  value={cat.value}>{cat.name}</option>

                    )
                  })}
                </select>
                    </div>
                    {errors.category && <span className='text-red-600'>{errors.category.message}</span>}    
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Brands
                    </label>
                    <div className="mt-2">
                    <select
                  {...register("brand", { required:'country required'})}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                 <option value="">--Choose brand--</option>   
                  {brand.map((brand,index)=>{
                    return (
                        <option key={index}  value={brand.value}>{brand.name}</option>

                    )
                  })}
                </select>
                    </div>
                    {errors.category && <span className='text-red-600'>{errors.category.message}</span>}    
                </div>

               
                

                </div>


                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Price
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        {...register("price", { required: 'price required' })}
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.price && <span className='text-red-600'>{errors.price.message}</span>}
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Discount Percentage
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        {...register("discountPercentage", { required: 'discount required' })}
                      
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.discountPercentage && <span className='text-red-600'>{errors.discountPercentage.message}</span>}
                </div>

                </div>



                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Stock
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        {...register("stock", { required: 'stock required' })}
                       
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.stock && <span className='text-red-600'>{errors.stock.message}</span>}
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Rating
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        {...register("rating", { required: 'rating required' })}
            
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.rating && <span className='text-red-600'>{errors.rating.message}</span>}
                </div>

                </div>


                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Thumbnail
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        {...register("thumbnail", { required: 'thumbnail required' })}
                       
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.thumbnail && <span className='text-red-600'>{errors.thumbnail.message}</span>}
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Image1
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        {...register("image1", { required: 'image1 required' })}
                       
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.image1 && <span className='text-red-600'>{errors.image1.message}</span>}
                </div>

                </div>


                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                

                

                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Images2
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        {...register("image2", { required: 'image2 required' })}
                        
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.image2 && <span className='text-red-600'>{errors.image2.message}</span>}
                </div>

                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                

                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Images3
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        {...register("image3", { required: 'image3 required' })}
                       
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.image3 && <span className='text-red-600'>{errors.image3.message}</span>}
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Images4
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        {...register("image4", { required: 'image4 required' })}
                       
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.image4 && <span className='text-red-600'>{errors.image4.message}</span>}
                </div>

                </div>

            </div>
            <div className="mt-6">
            <button

            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
            >
            Add Products
            </button>
        </div>
            
            </div>
            </form>

    </div>
  )
}
