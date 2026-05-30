import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
const AddProducts = () => {
    const token=localStorage.getItem("Token")
      const navigate=useNavigate()
   const {id} =useParams()
   const [product,setProduct]=useState([])
   const Token = localStorage.getItem("Token")
    const [updateProduct,setUpdateProduct]=useState(null)
    const [addBtn,setAddBtn]=useState(false)
      const [newProduct,setNewProduct]=useState({
            productName:"",
            productPrice:"",
            productQuantity:"",
            productDescription:"",
            productImage:"",
            productCategory:id
        })
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

   const updatePro=async()=>{
    try{
        await axios.put(`https://pos-backend-rb6m.onrender.com/api/v1/products/update/${updateProduct._id}`,updateProduct,{
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
const deletePro=async(id)=>{
    try{
        await axios.delete(`https://pos-backend-rb6m.onrender.com/api/v1/products/delete/${id}`,{
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

const createNewPro=async()=>{
    try{
        await axios.post("https://pos-backend-rb6m.onrender.com/api/v1/products/create",{...newProduct,productCtegory:id},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        alert("New Product Added Successfully")
    }
    catch(err){
        console.log(err);
        
    }
}
  return (
    <>
      <div className='bg-gray-100 p-3 '>
    <div className='grid grid-cols-4 gap-8 ml-10 mt-5' >
        {
            product.map((p,i)=>(
              <div key={i} className='bg-white shadow-md p-4 w-[20vw] rounded-2xl flex flex-col items-center justify-center text-center transition duration-300 hover:-translate-y-2 hover:shadow-2xl'>
                <div  onClick={()=>navigate(`/ProductsDetails/${p._id}`)}  className='flex flex-col items-center gap-3'>
                  
                    <img    className='cursor-pointer w-70 h-40'src={p.productImage}/>
                    <div className='p-3 mt-2 font-semibold'>
                    <h3>{p.productName}</h3>
                    <h3>Price: {p.productPrice} JOD</h3>
                    </div>
                </div>
                <div className='flex justify-between mt-3 gap-8'>
                <button  className='cursor-pointer bg-red-100 p-2 rounded-xl hover:bg-red-200 duration-300 ' onClick={()=>deletePro(p._id)}><Trash2 className='text-red-500 w-5 h-5'/></button>
                <button className='cursor-pointer bg-blue-100 p-2 rounded-xl hover:bg-blue-200 duration-300'onClick={()=>setUpdateProduct(p)}><Pencil className='text-blue-500 w-5 h-5'/></button>
                </div>
                
                </div>
                
            ))
        }

    </div>
      <div className='flex justify-center text-center items-center mt-3'>
        <button  className="bg-white  text-gray-500 border border-blue-200 px-8 py-3 rounded-2xl text-lg font-bold shadow-sm cursor-pointer hover:bg-blue-500 scale-105 duration-300 hover:text-white " onClick={()=>setAddBtn(true)}>Add New Product</button>
    </div>
    </div>
     { updateProduct &&(
        <div className='bg-white flex  flex-col justify-center items-center mt-3 p-5'>
           <input type='text'className='p-3  border border-gray-400 m-3' value={updateProduct.productName}
           onChange={(pn)=>setUpdateProduct({
            ...updateProduct,
            productName:pn.target.value
           })}/>
           <input type='text' className='p-3  border border-gray-400 m-3' value={updateProduct.productPrice}
           onChange={(pp)=>setUpdateProduct({
            ...updateProduct,
            productPrice:pp.target.value
           })}/>
            <input type='text'className='p-3  border border-gray-400 m-3' value={updateProduct.productQuantity}
           onChange={(pq)=>setUpdateProduct({
            ...updateProduct,
            productQuantity:pq.target.value
           })}/>
            <input type='text'  className='p-3  border border-gray-400 m-3'value={updateProduct.productDescription}
           onChange={(pd)=>setUpdateProduct({
            ...updateProduct,
            productDescription:pd.target.value
           })}/>
           <input type='text'className='p-3  border border-gray-400 m-3' value={updateProduct.productImage}
           onChange={(pi)=>setUpdateProduct({ ...updateProduct, productImage: pi.target.value
      })}
    />

           <button  className =" cursor-pointer  bg-blue-300 p-2 text-white hover:bg-blue-600"onClick={updatePro}>Update</button>
           </div>
            )
        }
            {
        addBtn&&(
            <div>
                <div className='flex flex-col m-3 gap-3 justify-center items-center '>
                <input type='text' placeholder='Product Name' className='p-3  border border-gray-400 m-3'  value={newProduct?.productName}
                onChange={(pn)=>setNewProduct({...newProduct,productName:pn.target.value})}/>
                 <input type='text' className='p-3  border border-gray-400 m-3' placeholder='Product Price' value={newProduct?.productPrice}
                onChange={(pp)=>setNewProduct({...newProduct,productPrice:pp.target.value})}/>
                 <input type='text' className='p-3  border border-gray-400 m-3' placeholder='Productc Quantity' value={newProduct?.productQuantity}
                onChange={(pq)=>setNewProduct({...newProduct,productQuantity:pq.target.value})}/>
                 <input type='text' className='p-3  border border-gray-400 m-3' placeholder='Productc Description' value={newProduct?.productDescription}
                onChange={(pd)=>setNewProduct({...newProduct,productDescription:pd.target.value})}/>
                  <input type='text' className='p-3  border border-gray-400 m-3' placeholder='Product Image' value={newProduct?.productImage}
                onChange={(pi)=>setNewProduct({...newProduct,productImage:pi.target.value})}/>
                <button onClick={createNewPro} className=' cursor-pointer  bg-blue-300 p-2 text-white hover:bg-blue-600'>add</button>
                </div>
            </div>
        )
      }
    </>
  )
}

export default AddProducts