import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const Categories = () => {
     const token=localStorage.getItem("Token")
    const [category,setCategory]=useState([])
    const[updateCategory,setUpdateCategory]=useState(null)
    const [addNew,setAddNew]=useState("")
    const [addBtn,setAddBtn]=useState(false)
    const navigate =useNavigate()
    useEffect(()=>{
        const fetchCategories=async()=>{

            try{
                const result =await axios.get("https://pos-backend-rb6m.onrender.com/api/v1/categories",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }) 
                setCategory(result.data.data)
            }
            catch(err){
                console.log(err);
                
            }
        }
        fetchCategories()
    },[])
    const updateCaegories=async()=>{
    try{
        await axios.put(`https://pos-backend-rb6m.onrender.com/api/v1/categories/update/${updateCategory._id}`,updateCategory,{
        headers:{
            authorization:`Bearer ${token}`
        }
        })
        alert("Updated Successfully")
    }
    catch(err){
        console.log(err);
    }
}
const deleteCategory =async(id)=>{
     try{
        await axios.delete(`https://pos-backend-rb6m.onrender.com/api/v1/categories/delete/${id}`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        alert("Deleted Successfully")
    }
    catch(err){
        console.log(err);
    }
}
const addNewCategory =async()=>{
    try{
      const result= await axios.post("https://pos-backend-rb6m.onrender.com/api/v1/categories/create",{categoryName:addNew},{
        headers:{
            authorization:`Bearer ${token}`
        }
      })   
      alert("New Category Added Successfully")
     }
    catch(err){
        console.log(err);
        
    }
}
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-gray-300">
         <h1 className="bg-white  text-gray-500 border border-blue-200 px-8 py-3 rounded-2xl text-lg font-bold shadow-sm ">Categories</h1>
    <div className='min-h-screen grid grid-cols-3  gap-10  bg-gradient-to-br from-blue-100 to-gray-300 p-3'>
        { category.map((ctg,i)=>(
            <div key={i} className='bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-3xl shadow-xl p-6 hover:scale-105 duration-300 text-center  '>
            <div className='cursor-pointer' onClick={()=>navigate(`/AddProducts/${ctg._id}`)}>
                <h1 className='font-bold  border-blue-500 p-3 hover:bg-blue-300 transition rounded-xl cusror-pointer '>{ctg?.categoryName}</h1>
            </div>
            <div className='flex justify-between mt-3 pt-15'>
                <button  className='bg-red-100 p-2 rounded-xl hover:bg-red-200 duration-300 ' onClick={()=>deleteCategory(ctg._id)}><Trash2 className='text-red-500 w-5 h-5 cursor-pointer'/></button>
                <button className='bg-blue-100 p-2 rounded-xl hover:bg-blue-200 duration-300 cursor-pointer'onClick={()=>setUpdateCategory(ctg)}><Pencil className='text-blue-500 w-5 h-5'/></button>
                 </div>
            </div>
        ))
        
        }</div>
        <div>
            <button  className="bg-white  text-gray-500 border border-blue-200 px-8 py-3 rounded-2xl text-lg font-bold shadow-sm cursor-pointer hover:bg-blue-500 scale-105 duration-300 hover:text-white " onClick={()=>setAddBtn(true)}>Add New Category</button>
        </div>
        
             { updateCategory &&(
        <div className='p-3 flex justify-between gap-5 border border-gray-400 m-3 '>
           <input type='text' value={updateCategory?.categoryName}
           onChange={(cn)=>setUpdateCategory({
            ...updateCategory,
            categoryName:cn.target.value
           })}/>
           <button onClick={updateCaegories} className=' cursor-pointer bg-blue-500 text-white px-4 rounded-xl p-1'>Update</button>
           </div>
            )
        }
        {
            addBtn&&(
                <div className='p-3 flex justify-between gap-5 border border-gray-400 m-3 '>
                    <input type='text' placeholder='New Category Name'value={addNew}
                    onChange={(nv)=>setAddNew(nv.target.value)}/>
                    <button onClick={addNewCategory} className=' cursor-pointer bg-blue-500 text-white px-4 rounded-xl p-1'>create</button>
                </div>
            )
        }
        
        </div>
        
  )
}

export default Categories