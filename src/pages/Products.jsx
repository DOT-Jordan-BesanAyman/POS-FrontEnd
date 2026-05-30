import axios from 'axios'
import { ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Products = () => {
    const navigate=useNavigate()
   const {id} =useParams()
   const [product,setProduct]=useState([])
   const [cart,setCart]=useState(JSON.parse(localStorage.getItem("cart"))||[])
   const Token = localStorage.getItem("Token");
   useEffect(()=>{
    const fetchByCategory=async()=>{
     try{
        const result =await axios.get(`https://pos-backend-rb6m.onrender.com/api/v1/products/getByCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`
        }
      })
        setProduct(result.data.data)}
        catch(err){
            console.log(err);
            
        }
    }
    fetchByCategory()
   },[id])
   useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
   },[cart])
  const addToCart = (product) => {
  setCart((prev) => {
    const cart = [...prev];

    const index = cart.findIndex((p) => p._id === product._id);

    if (index !== -1) {
      cart[index] = {
        ...cart[index],
        quantity: Number(cart[index].quantity || 0) + 1,
      };
    } else {
      cart.push({ ...product,  productName: product.productName,
  productPrice: product.productPrice, quantity: 1 });
    }

    return cart;
  });
};
   
  return (
    <>
    <div className='bg-gray-100 p-3 '>
       <button className='flex items-center gap-1 transition duration-300 hover:-translate-y-2 hover:shadow-2xl bg-orange-500 rounded-full p-3' onClick={()=>navigate("/Checkout")}><ShoppingCart/><span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span></button>
    <div className='grid grid-cols-4 gap-8 ml-10 mt-5' >
        {
            product.map((p)=>(
              <div  className='bg-white shadow-md p-4 w-[20vw] rounded-2xl flex flex-col items-center justify-center text-center transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-300 shadow-sm'>
                <div key={p._id} className='flex flex-col items-center gap-3'>
                  
                    <img className='w-70 h-40 cursor-pointer'src={p?.productImage} onClick={()=>navigate(`/ProductsDetails/${p._id}`)}/>
                    <div className=' p-3 mt-2 font-semibold'>
                    <h3>{p?.productName}</h3>
                    <h3>Price: {p?.productPrice} JOD</h3>
                    </div>
                </div>
                <button onClick={()=>addToCart(p)} className='bg-[#008ebd] text-[#fff] hover:bg-[#00475e] shadow-md rounded-xl p-1 m-2 w-20 cursor-pointer '>Add</button>
                </div>
            ))
        }

    </div>
    </div>
    </>
  )
}

export default Products