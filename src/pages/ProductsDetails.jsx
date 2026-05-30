import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductsDetails = () => {
    const {id}=useParams()
    const[productDetails,setProductDetails]=useState(null)
    useEffect(()=>{
        const getProductDetails =async()=>{
        try{
            const token=localStorage.getItem("Token")
            const result =await axios.get(`https://pos-backend-rb6m.onrender.com/api/v1/products/getByid/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            setProductDetails(result.data.data)
        }
        catch(err){
            console.log(err);
        }}
        getProductDetails()
    },[id])
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-6'>
      <div className='bg-white shadow-md rounded-3xl p-10 w-full max-w-4xl flex flex-col md:flex-row gap-10 items-center'>
        <div className='flex justify-center w-full md:w-1/2'>
          <img src={productDetails?.productImage}className='w-[380px] h-[300px]'/>
        </div>
        <div className='w-full md:w-1/2 space-y-6'>
            <h2 className='text-4xl font-bold text-black'> {productDetails?.productName}</h2>
            <div className='bg-blue-50 rounded-2xl p-5'>
                <p className='text-gray-700 leading-7'>
                {productDetails?.productDescription}
                </p>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='bg-gray-100 rounded-2xl p-4 flex justify-between'>
                <span className='font-semibold'>
                    Price
                </span>
                <span className='text-blue-600 font-bold'>
                    {productDetails?.productPrice} JOD
                </span>
                </div>
                <div className='bg-gray-100 rounded-2xl p-4 flex justify-between'>
                <span className='font-semibold'>
                    Quantity
                </span>
                <span className='text-blue-600 font-bold'>
                    {productDetails?.productQuantity}
                </span>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsDetails