import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { Adminallproduct, fetchgeteditproduct, fetchpatchproduct } from './adminProductSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { allcategories, fetchCategory } from '../Category/categorySlice'
import { allbrand, fetchBrand } from '../Brand/BrandSlice'

export default function AdminProductEdit() {
    const {register,handleSubmit,setValue,reset,formState: { errors },} = useForm()
    const {category} = useSelector(allcategories)
    const {brand} = useSelector(allbrand)
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {product} = useSelector(Adminallproduct)
    const pro = product[0]
    // /console.log(pro)

    const onSubmit = (data) =>{
        const prod = {...data}
        prod.images =[prod.image1,prod.image2,prod.image3,prod.image4,pro.thumbnail]
        prod.price = +prod.price
        prod.discountPercentage = +prod.discountPercentage
        prod.rating = +prod.rating
        prod.stock = +prod.stock
        delete prod['image1']
        delete prod['image2']
        delete prod['image3']
        delete prod['image4']
        
        dispatch(fetchpatchproduct(prod))
        reset()
        navigate('/admin/product/page')
    }

    useEffect(()=>{

        if(id && pro){

            setValue('id',id)
            setValue('title',pro.title)
            setValue('brand',pro.brand)
            setValue('category',pro.category)
            setValue('description',pro.description)
            setValue('price',pro.price)
            setValue('discountPercentage',pro.discountPercentage)
            setValue('stock',pro.stock)
            setValue('rating',pro.rating)
            setValue('thumbnail',pro.thumbnail)
            setValue('image1',pro.images[0])
            setValue('image2',pro.images[1])
            setValue('image3',pro.images[2])
            setValue('image4',pro.images[3])
        }

    },[id,pro,setValue])

    

    useEffect(()=>{

        dispatch(fetchgeteditproduct(id))
        dispatch(fetchCategory())
        dispatch(fetchBrand())

    },[dispatch,id])
    
  return (

    <div className='mx-w-7xl bg-white p-5 mt-7'>

        <h1 className='text-center font-bold text-5xl pb-9'>EDIT PRODUCT FORM</h1>

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
                   
                    <div className="mt-2">
                        <img src={pro.thumbnail}  alt="" className='w-90 h-20'/>
                    </div>
                </div>

                </div>


                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

                <div className="sm:col-span-3">
                   
                    <div className="mt-2">
                        <img src={pro.images[0]}  alt="" className='w-90 h-20'/>
                    </div>
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

                <div className="sm:col-span-3">
                   
                    <div className="mt-2">
                        <img src={pro.images[1]}  alt="" className='w-90 h-20'/>
                    </div>
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
                   
                    <div className="mt-2">
                        <img src={pro.images[2]}  alt="" className='w-90 h-20'/>
                    </div>
                </div>

                </div>


                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

                <div className="sm:col-span-3">
                   
                    <div className="mt-2">
                        <img src={pro.images[3]}  alt="" className='w-90 h-20'/>
                    </div>
                </div>

                </div>

            </div>
            <div className="mt-6">
            <button

            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
            >
            Update Products
            </button>
        </div>
            
            </div>
            </form>

    </div>
  )
}
