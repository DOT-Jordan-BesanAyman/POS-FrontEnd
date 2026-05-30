import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Products from './Products'
import { Printer } from 'lucide-react'

const Checkout = () => {
    const [tax,setTax]=useState(0)
    const [discount,setDiscount]=useState(0)
    const [paymentMethod,setPaymentMethod]=useState("cash")
    const [cart,setCart]=useState([])
    const[details,setDetails]=useState(null)
    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem("cart"))||[]
        setCart(data)
    },[])
    const createOrder=async()=>{
        const token=localStorage.getItem("Token")
        try{
        const result =await axios.post("https://pos-backend-rb6m.onrender.com/api/v1/orders/createOrder",{
          products:cart.map((pro)=>({
            product:pro._id,
            quantity:pro.quantity
          })),tax:Number(tax),discount:Number(discount),paymentMethod
        },
        {
           headers:{
            Authorization:`Bearer ${token}`
           }
        })

    setDetails(result.data);
  console.log(result.data);
  
        localStorage.removeItem("cart")
        setCart([])}
        catch(err){
          console.log(err);
          alert(err.response.data.message)
        
        }
    }
  return (
    <>
    <div className=' min-h-screen flex flex-col items-center justify-center bg-gray-100 p-3 '>
    <div className=' flex flex-col  print:hidden border border-gray-300 shadow-sm p-5'>
     {
        cart.map((item)=>(
            <div key={item._id} className='bg-white shadow-md p-2 '>
                <h4>Producte Name: {item.productName}</h4>
                <p>price: {item.productPrice}</p>
                <p>QTY: {item.quantity}</p>
                <hr></hr>
            </div>
        ))
    }
    <input  type='number' placeholder='Enter tax...' onChange={(t)=>setTax(t.target.value)} className='bg-white shadow-md p-2 m-2 rounded-xl'></input>
    <input type='number' placeholder='Enter discount...' onChange={(d)=>setDiscount(d.target.value)} className='bg-white shadow-md p-2 m-2 rounded-xl'></input>
      <div className='bg-white text-center p-3 text-black rounded-xl m-2' >
      <p> Select Payment Method</p>
      <select className='hover:bg-[#008ebd14] hover:text-[#008ebd] hover:border border-[#008ebd] text-black mt-1 cursor-pointer border border-gray-300' onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="cash">Cash</option>
        <option value="card">Card</option>
      </select>
      </div>
        <button onClick={createOrder} className='w-50 ml-1 bg-white p-1 text-black rounded-xl hover:bg-[#008ebd14] hover:text-[#008ebd] hover:border border-[#008ebd] cursor-pointer'>
        CheckOut
      </button>
       </div>
       {details&&(
        <div  className='bg-white shadow-md p-2  w-[50vw] m-2' ><h1 className='text-center '>Invoice</h1><hr></hr>
         {details?.details?.map((p,index)=>(
        <div key={index}>
          <p>Product:{p?.productName}</p>
          <p>Qty:{p?.quantity}</p>
          <p>Price:{p?.price}</p>
        </div>
       ))}
       <div>
        <hr></hr>
          <p>SubTotal: {details?.data?.subTotal}</p>
          <p>Tax:${tax}</p>
          <p>Discount:${discount}</p>
          <hr></hr>
          <p>Total: {details?.data?.total}</p>
          <p>Payment: {details?.data?.paymentMethod}</p>
        </div>
       </div>)}
       <button onClick={()=>window.print()} className='flex bg-white p-1 text-black rounded-xl p-2 m-2 hover:bg-[#008ebd14] hover:text-[#008ebd] hover:border border-[#008ebd] cursor-pointer gap-1'> <Printer size={20}/> Print Invoice  </button>
      </div>
    </>
  )
}

export default Checkout