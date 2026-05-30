import axios from 'axios'
import { LayoutDashboard, Settings, Tag,LogOut, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const AdminDashboard = () => {
  const token=localStorage.getItem("Token")
  const [orders,setOrders]=useState("")
  const navigate=useNavigate()
  const[profit,setProfit]=useState()
  const [employee,setEmployee]=useState("")
  const [category,setCategory]=useState(0)
  const [restock,setRestock]=useState("")
  const[top,setTop]=useState("")
  useEffect(()=>{
  const TodayOrdersReport=async()=>{
    try{
      const result=await axios.get("https://pos-backend-rb6m.onrender.com/api/v1/reports/todayOrders",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setOrders(result.data.data)
    }
    catch(err){
      console.log(err);
      
    }
  }
  TodayOrdersReport()
  },[])
 useEffect(()=>{
  const ordersProfit=async()=>{
  try{
    const result=await axios.get("https://pos-backend-rb6m.onrender.com/api/v1/reports/todayProfit",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    setProfit(result.data.data)
  }
  catch(err){
    console.log(err);
    
  }}
  ordersProfit()
 },[])
 useEffect(()=>{
  const employeeReport =async()=>{
  try{
    const result =await axios.get("https://pos-backend-rb6m.onrender.com/api/v1/reports/employee",{
      headers:{
         Authorization:`Bearer ${token}`
      }
    })
    setEmployee(result.data.data)
  }
  catch(err){
    console.log(err);
    
  }}
  employeeReport()
 },[])
 useEffect(()=>{
  const categoryReport=async()=>{
    try{
      const result= await axios.get("https://pos-backend-rb6m.onrender.com/api/v1/reports/category",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setCategory(result.data)
      console.log(result.data);
      
    }
    catch(err){
      console.log(err);
      
    }
  }
  categoryReport()
 },[])
 useEffect(()=>{
  const restockReport=async()=>{
    try{
      const result=await axios.get("https://pos-backend-rb6m.onrender.com/api/v1/reports/quantity",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setRestock(result.data.data)
    }
    catch(err){
      console.log(err);

    }
  }
  restockReport()
 },[])
 useEffect(()=>{
  const topProduct=async()=>{
    try{const result= await axios.get("https://pos-backend-rb6m.onrender.com/api/v1/reports/topProduct",{
      headers:{
        Authorization:
          `Bearer ${token}`
      }
    })
    setTop(result.data.data)
  }
    
    catch(err){
      console.log(err);
      
    }
  }
  topProduct()
 },[])
  return (
    <div className=' min-h-screen flex gap-20  bg-gradient-to-br from-blue-100 to-gray-300 p-3 '>
      <div  className='w-64 bg-white rounded-3xl shadow-2xl p-6 flex flex-col gap-3 border border-gray-100'>
        <div className='text-center mb-5'>
      <h1 className='text-3xl font-extrabold text-blue-600'>
        POS System
      </h1>
      <p className='text-gray-400 text-sm mt-2'>
        Admin Dashboard
      </p>
    </div>
        <button className=' cursor-pointer bg-blue-500 hover:bg-blue-600 duration-300 text-white p-4 rounded-2xl shadow-md font-semibold'> <li className="flex items-center gap-2"><LayoutDashboard size={20} /><span>Dashboard</span></li></button>
        <button className=' cusror-pointer bg-gray-100 hover:bg-blue-100 duration-300 p-4 rounded-2xl text-gray-700 font-semibold' onClick={()=>navigate("/Users")}> <li className="flex items-center gap-2"><User size={20} /><span>Users Managements</span></li></button>
        <button className='cusror-pointer bg-gray-100 hover:bg-blue-100 duration-300 p-4 rounded-2xl text-gray-700 font-semibold' onClick={()=>navigate("/Categories")}> <li className="flex items-center gap-2"><Tag size={20} /><span>Categories Managements</span></li></button>
        <button className='cusror-pointer bg-gray-100 hover:bg-blue-100 duration-300 p-4 rounded-2xl text-gray-700 font-semibold'onClick={()=>navigate("/Settings")} ><li className="flex items-center gap-2"> < Settings size={20}/><span>Settings</span></li></button>
      <div className="mt-45 flex justify-center">
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
      <div className='mb-8'>
      <h1 className='text-4xl font-extrabold text-gray-700'>Dashboard Overview</h1>
      <p className='text-gray-400 mt-2'> Welcome Back Admin </p>
      </div>
      <div  className=' grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6' >
       <div className='bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-3xl shadow-xl p-6 hover:scale-105 duration-300'>
        <h1 className='text-xl font-bold'>Today Orders</h1>
           <p className='mt-4 text-5xl font-extrabold'>{orders}</p>
           <p className='mt-2 text-blue-100'>Orders Created Today</p>
      </div>
        <div className='bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-3xl shadow-xl p-6 hover:scale-105 duration-300'>
        <h1 className='text-xl font-bold  '>Today Profit</h1>
          <p className='mt-4 text-5xl font-extrabold overflow-hidden'>{profit}</p>
        <p className='mt-2 text-green-100'>Total Earnings (JOD) </p></div>
         <div className='bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-3xl shadow-xl p-6 hover:scale-105 duration-300'>
        <h1 className='text-xl font-bold'>Employee Of Month</h1>
        <p className='mt-4 text-3xl font-extrabold' title={employee?.best}>{employee?.best?.slice(0, 5) + "..."}</p>
        <p className='mt-2 text-purple-100'>Created {employee?.noOfOrders} Orders </p>
      </div>
        <div className='bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-3xl shadow-xl p-6 hover:scale-105 duration-300'>
        <h1 className='text-xl font-bold'>Categories</h1>
        <p className='mt-4 text-5xl font-extrabold'>{category?.count}</p>
        <p className='mt-2 text-pink-100'>Total Categories</p></div>
              <div className='bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-3xl shadow-xl p-6 hover:scale-105 duration-300'>
        <h1 className='text-xl font-bold'>Top Product</h1>
        <p className='mt-4 text-3xl font-extrabold'>{top?.topproduct}</p>
        <p className='mt-2 text-orange-100'>Sold {top?.max} Times</p></div>
        </div>
         <div className='bg-gradient-to-r from-red-400 to-red-500 text-white rounded-3xl shadow-xl p-6 hover:scale-105 duration-300'>
        <h1 className='text-xl font-bold'>Restock Alert</h1>
        <p className='mt-4 text-3xl font-extrabold'>{restock}</p>
        <p className='mt-2 text-red-100'>Need To Restock Soon</p></div>
      </div>
    
  )
}
export default AdminDashboard