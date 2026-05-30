import axios from 'axios'
import { Pencil, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Users = () => {
    const token =localStorage.getItem("Token")
    const [users,setUsers]=useState([])
    const [updateData,setUpdateData]=useState(null)
    const [addBtn,setAddBtn]=useState(false)
    const [newUser,setNewUser]=useState({
        firstName:"",
        lastName:"",
        userName:"",
        password:"",
        role:""
    })
useEffect(()=>{
    const getUsers=async()=>{
        try{
            const result =await axios.get("https://pos-backend-rb6m.onrender.com/api/v1/users",{
                headers:{
                authorization:`Bearer ${token}`
                }
            })
            setUsers(result.data.data)
        }
        catch(err){
            console.log(err);
        }
    }
    getUsers()
},[])
const updateUser=async()=>{
    try{
        await axios.put(`https://pos-backend-rb6m.onrender.com/api/v1/users/update/${updateData._id}`,updateData,{
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
const deleteUser=async(id)=>{
    try{
        await axios.delete(`https://pos-backend-rb6m.onrender.com/api/v1/users/delete/${id}`,{
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
const createNewUser=async()=>{
    try{
        await axios.post("https://pos-backend-rb6m.onrender.com/api/v1/users/create",newUser,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        alert("New User Created Successfully")
    }
    catch(err){
        console.log(err);
        
    }
}
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-gray-300"> 
    <h1 className="bg-white  text-gray-500 border border-blue-200 px-8 py-3 rounded-2xl text-lg font-bold shadow-sm ">Users Management</h1>
    <div className=' grid grid-cols-3  gap-10  bg-gradient-to-br from-blue-100 to-gray-300 p-3'>{
        users.map((user,i)=>(
            <div key={i}>
                <div className='bg-white m-2 border border-gray-400 shadow-md p-4 rounded-2xl w-[20vw]'>
                <h1 className='font-bold' >Name: <span className='text-gray-500'>{user?.firstName}-{user.lastName}</span> </h1>
                <h2 className='font-bold'>UserName: <span className='text-gray-500'>{user?.userName} </span> </h2>
                <h3 className='font-bold'>Role: <span className='text-gray-500'>{user?.role}</span></h3>
                <div className='flex justify-between mt-3'>
                <button  className='bg-red-100 p-2 rounded-xl hover:bg-red-200 duration-300 cursor-pointer'  onClick={()=>deleteUser(user?._id)}><Trash2 className='text-red-500 w-5 h-5'/></button>
                <button className='bg-blue-100 p-2 rounded-xl hover:bg-blue-200 duration-300  cursor-pointer'onClick={()=>setUpdateData(user)}><Pencil className='text-blue-500 w-5 h-5'/></button>
                </div>
                </div>
            </div>
            
        ))}</div>
            <div>
            <button  className="bg-white  text-gray-500 border border-blue-200 px-8 py-3 cursor-pointer rounded-2xl text-lg font-bold shadow-sm hover:bg-blue-500 scale-105 duration-300 hover:text-white " onClick={()=>setAddBtn(true)}>Create New User</button>
        </div>

       { updateData &&(
        <div>
           <input type='text' className='p-3  border border-gray-400 m-3' value={updateData.firstName}
           onChange={(fn)=>setUpdateData({
            ...updateData,
            firstName:fn.target.value
           })}/>
           <input type='text' className='p-3  border border-gray-400 m-3' value={updateData.lastName}
           onChange={(ln)=>setUpdateData({
            ...updateData,
            lastName:ln.target.value
           })}/>
            <input type='text' className='p-3  border border-gray-400 m-3' value={updateData.userName}
           onChange={(un)=>setUpdateData({
            ...updateData,
            userName:un.target.value
           })}/>
           <button onClick={updateUser} className='cursor-pointer  bg-blue-300 p-2 text-white hover:bg-blue-600' >Update</button>
           </div>
            )
        }

      {
        addBtn&&(
            <div  className=' bg-white flex  flex-col justify-center items-center mt-3 p-5'>
                <input type='text' placeholder='First Name' className='p-3  border border-gray-400 m-3' value={newUser.firstName}
                onChange={(fn)=>setNewUser({...newUser,firstName:fn.target.value})}/>
                 <input type='text' placeholder='Last Name' className='p-3  border border-gray-400 m-3' value={newUser.lastName}
                onChange={(ln)=>setNewUser({...newUser,lastName:ln.target.value})}/>
                 <input type='text' placeholder='User Name'className='p-3  border border-gray-400 m-3' value={newUser.userName}
                onChange={(un)=>setNewUser({...newUser,userName:un.target.value})}/>
                 <input type='text' placeholder='Password' className='p-3 border border-gray-400 m-3' value={newUser.password}
                onChange={(p)=>setNewUser({...newUser,password:p.target.value})}/>
                 <input type='text' placeholder='Role'  className='p-3  border border-gray-400 m-3' value={newUser.role}
                onChange={(r)=>setNewUser({...newUser,role:r.target.value})}/>
                <button onClick={createNewUser} className='cursor-pointer  bg-blue-300 p-2 text-white hover:bg-blue-600'>create</button>
            </div>
        )
      }







        </div>

        
  )
}

export default Users