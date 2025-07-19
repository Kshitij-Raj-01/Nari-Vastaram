import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../customer/pages/HomePage/HomePage'
import Cart from '../customer/components/Cart/Cart'
import Footer from '../customer/components/Footer/Footer'
import Product from '../customer/components/Product/Product'
import Navigation from '../customer/components/navigation/navigation'
import ProductDetail from '../customer/components/ProductDetails/ProductDetails'
import Checkout from '../customer/components/Checkout/Checkout'
import OrderDetails from '../customer/components/Order/OrderDetails'
import PaymentSuccess from '../customer/components/Payment/PaymentSuccess'
import AboutUs from '../customer/components/AboutUs/AboutUs'
import Contact from '../customer/components/Contact/Contact'
import Profile from '../customer/components/Profile/Profile'
import MyOrders from '../customer/components/Order/MyOrder'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerRouters = () => {
  return (
    <div className='bg-[#FFE0BC]'>
        <div>
        <Navigation/>
        </div>
        
        <ToastContainer />
        <Routes>
            <Route path='/login' element={<HomePage/>}></Route>
            <Route path='/register' element={<HomePage/>}></Route>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product/>}></Route>
            <Route path='/product/:productId' element={<ProductDetail/>}></Route>
            <Route path='/checkout' element={<Checkout/>}></Route>
            <Route path='/account/orders/:id' element={<OrderDetails/>}></Route>
            <Route path='/orders/success' element={<OrderDetails/>}></Route>
            <Route path='/payment/:orderId' element={<PaymentSuccess/>}></Route>
            <Route path="/about" element={<AboutUs/>} />
            <Route path='/contact' element={<Contact/>} ></Route>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/account/orders" element={<MyOrders />} />
        </Routes>
        <div>
      <Footer/>
      </div>
    </div>
  )
}

export default CustomerRouters