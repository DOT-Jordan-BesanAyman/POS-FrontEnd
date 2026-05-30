import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './pages/Login'
import { Route,Routes} from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import Products from './pages/Products'
import Checkout from './pages/Checkout'
import MyOrders from './pages/MyOrders'
import ProductsDetails from './pages/ProductsDetails'
import Settings from "./pages/Settings";
import Users from './pages/Users'
import Categories from './pages/Categories'
import AddProducts from './pages/AddProducts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
        <Route path='/Products/:id' element={<Products/>}/>
        <Route path='/Checkout' element={<Checkout/>}/>
       <Route path='/MyOrders'element={<MyOrders/>}/>
        <Route path='/UserDashboard' element={<UserDashboard/>}/> 
        <Route path="/ProductsDetails/:id" element={<ProductsDetails/>}/>
        <Route path='/Settings'element={<Settings/>}/> 
        <Route path='/Users' element={<Users/>}/>  
        <Route path='/Categories' element={<Categories/>} />
        <Route path='/AddProducts/:id' element={<AddProducts/>}/>
      </Routes>
    </>
  )
}

export default App
