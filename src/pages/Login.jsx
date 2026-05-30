import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import cashier from "../assets/cashier.png"
import { LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const loginFormik = Yup.object().shape({
 userName: Yup.string()
  .required('UserName Is Required'),
password: Yup.string()
 .min(5, 'Password Must Be At Least Five Characters')
   .required('Password Is Required')
})

const Login = () => {
const navigate = useNavigate()
    return (<div className='min-h-screen bg-gradient-to-br from-blue-100 to-gray-300 flex items-center justify-center p-6'>
        <Formik
            initialValues={{userName: '',password: ''}}
            validationSchema={loginFormik}
               onSubmit={async (values, { setSubmitting }) => {
                try {
                    const userLogin = await axios.post("https://pos-backend-rb6m.onrender.com/api/v1/users/login",
                        values
                    )
                    console.log(userLogin.data)
                    localStorage.setItem(
                     "Token",
                      userLogin.data.token
                    )
                    if(userLogin.data.data.role === "admin"){
                        navigate('/AdminDashboard')
                    }
                    else{
                        navigate('/UserDashboard')
                    }

                }
                catch (err) {
                    console.log(err.message)
                }
                setSubmitting(false)
            }}

        >

            {
                ({
                    values,errors,touched, handleChange,handleSubmit
                }) => (
                   
                 <div className='flex flex-col items-center justify-center  p-5'>
                    <div className='text-center mb-10 '>
                        <h1 className='font-bold text-4xl'>POS</h1>
                        <p className='font-semibold text-gray-600'>
                        Point Of Sales System
                        </p>
                    </div>
               <div className='flex items-center justify-center gap-10 bg-gray-100 p-10 rounded-xl'>
               <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <label>UserName:</label>
                <input type='text'name='userName'placeholder='Enter UserName'value={values.userName}onChange={handleChange}className='border p-2 rounded'/>
                    {touched.userName && errors.userName &&<p>{errors.userName}</p>}
      <label>Password:</label>
      <input type='password'name='password'placeholder='Enter Password'value={values.password}onChange={handleChange}className='border p-2 rounded'/>
{touched.password && errors.password &&<p>{errors.password}</p>}
      <button type='submit'className='flex justify-center items-center gap-1 bg-blue-500 text-white p-2 rounded cursor-pointer'><LogIn size={20}/>Login</button>
    </form>
    <div>
      <img src={cashier} className='w-75 h-75' />
    </div>
  </div>
</div>
                )
            }

        </Formik></div>
        
    )
    
} 


export default Login