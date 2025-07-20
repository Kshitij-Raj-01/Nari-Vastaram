import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { Button } from '@mui/material'
import CartItem from '../Cart/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../State/Order/Action'
import { useLocation } from 'react-router-dom'
import { codPayment, createPayment } from '../../../State/Payment/Action'

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {order} = useSelector(store=>store)
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id")

  const allowedCities = ["patna", "bihar sharif"];
const userCity = order.order?.shippingAddress?.city?.toLowerCase();

const isCODAvailable = allowedCities.includes(userCity);


  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const handleCheckout = () =>{
    dispatch(createPayment(orderId));
    dispatch(createOrder(orderData))
  }
  
  return (
    <div>
      <div className='p-5 shadow-lg rounded-md border mb-10 bg-[#F1EDE1]'>
        <AddressCard address={order.order?.shippingAddress}/>
      </div>
      
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2 space-y-5">
        {order.order?.orderItems?.map((item) => <CartItem item={item} />)}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border p-5 bg-[#F1EDE1]">
            <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
            <div className="space-y-3 font-semibold mb-10">
                <div className="flex justify-between pt-3 text-black">
                    <span>Price</span>
                    <span>₹{order.order?.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-3">
                    <span>Discount</span>
                    <span className=" text-green-600">- ₹{order.order?.discount}</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                    <span>Delivery Charges</span>
                    <span className=" text-green-600">Free</span>
                </div>
            <hr />
                <div className="flex justify-between pt-3 text-black font-bold">
                    <span>Total Amount</span>
                    <span className=" text-green-600">₹{order.order?.totalDiscountedPrice}</span>
                </div>
            </div>
            <Button variant="contained" className="w-full mt-5" sx={{px:'2.5rem', py:'.7rem', bgcolor:'#9155fd'}}>
                Checkout
            </Button>
            {isCODAvailable && (
  <Button
    variant="contained"
    onClick={() => {dispatch(codPayment(orderId)); 
    dispatch(createOrder(orderData))}}
    className="w-full" sx={{px:'2.5rem', py:'.7rem', bgcolor:'#9155fd', mt:2}}
  >
    Pay on Delivery
  </Button>
)}

          </div>
        </div>

      </div>
    </div>
    </div>
  )
}

export default OrderSummary
