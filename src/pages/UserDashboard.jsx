import axios from 'axios'
import { ChevronRight, ClipboardList, LayoutDashboard, LogOut, Settings } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const UserDashboard = () => {
    const navigate=useNavigate()
    const [category,setCategory]=useState([])
    const Token = localStorage.getItem("Token")
    useEffect(()=>{
        const fetchCategory=async()=>{
            try{
               const result=await axios.get("https://pos-backend-rb6m.onrender.com/api/v1/categories",{
      headers:{
         Authorization:`Bearer ${Token}`
      }
   })
               console.log(result);
               setCategory(result.data.data)
               
            }
            catch(err){
                console.log(err);
                
            }
        }
        fetchCategory()
    },[])
    const [topProduct,setTopProduct]=useState(null)

useEffect(()=>{
   const getTopProduct=async()=>{
      const result=await axios.get("https://pos-backend-rb6m.onrender.com/api/v1/reports/topProduct",{
    headers:{
      Authorization:`Bearer ${Token}`
    }
  })
      setTopProduct(result.data.data)
   }

   getTopProduct()
},[])
  
return(
    <>
    <div className='flex justify-around  bg-gray-100 p-3 '>
        {/* side bar */}
        
        <div className='flex flex-col gap-3 bg-white shadow-md p-4 w-50 rounded-2xl'>
           <button className='bg-blue-500 hover:bg-blue-600 duration-300 text-white p-4 rounded-2xl shadow-md font-semibold cursor-pointer' onClick={()=>navigate("/UserDashboard")}> <li className="flex items-center gap-2"><LayoutDashboard size={20} /><span>Dashboard</span></li></button> 
            <button className='bg-blue-100 shadow-md p-4 rounded-2xl cursor-pointer' onClick={()=>navigate("/CheckOut")}> <li className="flex items-center gap-2"><ChevronRight size={20} /><span>Checkout</span></li> </button>
             <button className='bg-blue-100 shadow-md p-4 rounded-2xl cursor-pointer' onClick={()=>navigate("/MyOrders")}> <li className="flex items-center gap-2"><ClipboardList size={20} /><span>Orders</span></li> </button>
               <button className='bg-blue-100 shadow-md p-4 rounded-2xl cursor-pointer' onClick={()=>navigate("/Settings")}> <li className="flex items-center gap-2"> < Settings size={20}/><span>Settings</span></li></button>
         <div className="mt-80 flex justify-center">
          <button
            onClick={() => {
              localStorage.removeItem("Token");
              window.location.href = "/";
            }}
            className="flex justify-center items-center gap-1 bg-blue-500 hover:bg-blue-600 transition text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-sm cursor-pointer  w-50"><LogOut size={20}/>
            Logout
          </button>
        </div>
        </div>
       <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 gap-6'>
           {
            category.map((cat)=>(
              <div className='bg-white shadow-md w-[20vw] h-[20vh] flex items-center justify-center rounded-2xl border border-gray-300 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer' key={cat._id} onClick={()=>navigate(`/products/${cat._id}`)}>
                <h2 className='bg-blue-100 shadow-md w-[15vw] h-[15vh] flex items-center justify-center rounded-xl p-4'>{cat?.categoryName}</h2>
              </div>
              
            ))
           }

        </div>
        <div className='bg-white shadow-md rounded-2xl p-6 '>
           <h2 className='text-2xl font-bold mb-3'>Top Product</h2>
           <div className='bg-blue-100 rounded-xl p-5'>
            <h3 className='text-xl font-bold'>{topProduct?.topproduct}</h3>
            <p className='text-gray-500 mt-2'>Sold: {topProduct?.max}</p>
           </div>
        </div>
        </div>
  

    </div>
    
    
    
    
    </>
  )
}

export default UserDashboard