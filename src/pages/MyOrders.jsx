import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MyOrders = () => {
    const [orders,setOrders]=useState([])
    useEffect(()=>{
       const getMyOrders=async()=>{
        try{
            const token =localStorage.getItem("Token")
            const result=await axios.get("https://pos-backend-rb6m.onrender.com/api/v1/reports/myorders",
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            setOrders(result.data.data)
        }
        catch(err){
            console.log(err);
            
        }}
        getMyOrders()
    },[])
  return (
    <>
    <div className=' flex flex-col bg-gray-100 p-3 justify-center text-center items-center '>
         <h1 className='bg-white p-4 rounded-2xl  '>My Orders : </h1>
    <div  className='grid grid-cols-2 gap-10 '>
    {
        orders.map((ord)=>(
            <div key={ord._id} className='bg-white m-2 border border-gray-400 shadow-md p-4 rounded-2xl'>
                <h1>OrderID: <span className='text-gray-400'>{ord?._id}</span></h1>
                <h2>SubTotal: <span className='text-blue-400'> {ord?.subTotal}</span></h2>
                <h2>Total: <span className='text-red-400'>{ord?.total}</span></h2>
                <h2>PaymentMethod: <span className='text-green-400'>{ord?.paymentMethod}</span></h2>
            </div>
        ))
    }
    </div>
    </div>
    </>
  )
}

export default MyOrders