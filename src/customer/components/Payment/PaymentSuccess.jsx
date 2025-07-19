import React, { useEffect, useState } from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../State/Order/Action'
import { updatePayment } from '../../../State/Payment/Action'
import OrderTracker from '../Order/OrderTracker'
import AddressCard from '../AddressCard/AddressCard'

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState()
  const [paymentStatus, setPaymentStatus] = useState()
  const { orderId } = useParams()
  const dispatch = useDispatch()
  const { order } = useSelector(store => store)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setPaymentId(urlParams.get('razorpay_payment_id'))
    setPaymentStatus(urlParams.get('razorpay_payment_link_status'))
  }, [])

  useEffect(() => {
    if (paymentId) {
      console.log("PaymentId : ", paymentId);
      dispatch(getOrderById(orderId))
      dispatch(updatePayment(paymentId, orderId))
    }
  }, [orderId, paymentId, dispatch])

  return (
    <div className="px-2 lg:px-36 min-h-[60vh]">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: 'fit-content' }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulation Your Order Get Placed
        </Alert>
      </div>

      <OrderTracker activeStep={1} />

      <div className="space-y-5 py-5 pt-20">
        {order.order?.orderItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center shadow-xl rounded-md p-5 bg-[#F1EDE1]"
          >
            {/* Product Details */}
            <div className="flex items-center w-full lg:w-1/2 mb-4 lg:mb-0">
              <img
                src={item.product.imageUrl}
                alt=""
                className="w-[5rem] h-[5rem] object-cover object-top"
              />
              <div className="ml-5 space-y-2">
                <p>{item.product.title}</p>
                <div className="opacity-50 text-xs font-semibold space-x-5">
                  <span>Color : {item.color}</span>
                  <span>Size : {item.size}</span>
                </div>
                <p>Seller : {item.product.brand}</p>
                <p>₹{item.discountedPrice}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="w-full lg:w-[45%]">
              <AddressCard address={order.order?.shippingAddress} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentSuccess
