import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { api } from "../../../config/apiConfig";
import RatingDialog from "../Rating/RatingDialog";
import { generateInvoice } from "../../../utils/generateInvoice";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviews, setReviews] = useState({});
  const [invoiceBlobUrl, setInvoiceBlobUrl] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/api/orders/${id}`);
        setOrder(res.data);

        // 🌸 Generate invoice and show below
        const blobUrl = await generateInvoice(res.data);
        setInvoiceBlobUrl(blobUrl);

        res.data.orderItems.forEach((item) => {
          fetchReviews(item.product._id);
        });
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, [id]);

  const handleRatingReviewSubmit = async (ratingValue, reviewText) => {
    try {
      await api.post("/api/reviews/create", {
        productId: selectedItem.product._id,
        review: reviewText,
        rating: ratingValue,
      });

      alert("Thank you for your love and feedback! 💕");
      setSelectedItem(null);
      fetchReviews(selectedItem.product._id);
    } catch (error) {
      console.error("Error submitting rating/review:", error);
      alert("Oops! Something went wrong.");
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const res = await api.get(`/api/reviews/product/${productId}`);
      setReviews((prev) => ({
        ...prev,
        [productId]: res.data,
      }));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  if (!order) return <div>Loading your romantic order... 🌷</div>;

  const statusStepMap = {
    PLACED: 0,
    CONFIRMED: 1,
    SHIPPED: 2,
    OUT_FOR_DELIVERY: 3,
    DELIVERED: 4,
    RETURN_REQUESTED: 5,
    RETURN: 6
  };

  return (
    <div className="lg:px-20 px-5">
      {/* Delivery Address */}
      <div className="bg-[#F1EDE1] p-5 rounded-lg shadow">
        <h1 className="py-7 text-xl font-bold">Delivery Address</h1>
        <AddressCard address={order.shippingAddress} />
        <div className="text-xl text-green-700 font-medium mb-10 text-center">
          📦 Estimated Delivery:{" "}
          {new Date(new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
        </div>
      </div>

      {/* Order Tracker */}
      <div className="py-20">
        <OrderTracker activeStep={statusStepMap[order.orderStatus]} />
      </div>

      {/* Return Info */}
      {order.orderStatus === "RETURN_REQUESTED" && order.returnInfo && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-5 rounded shadow mb-10">
          <h2 className="text-lg font-bold mb-2">Return Request in Progress</h2>
          <p className="text-sm">🕒 Pickup: {new Date(order.returnInfo.pickupDate).toLocaleDateString()}</p>
          <p className="text-sm mt-1">💸 Refund Method: {order.returnInfo.refundMethod}</p>
          <p className="text-sm mt-1">🔁 Refund Status: {order.returnInfo.refundStatus}</p>
          <p className="text-sm mt-2">Need help? <a href="/support" className="text-indigo-600 hover:underline">Contact Support</a></p>
        </div>
      )}

      {/* Order Items */}
      <div className="space-y-6">
        {order.orderItems.map((item) => (
          <div key={item._id} className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center p-5 border bg-[#FDF6F0] rounded-lg">
            <div className="col-span-8 flex items-start">
              <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
              <div className="ml-5 space-y-1 text-sm">
                <p className="font-medium">{item.product.title}</p>
                <p className="text-gray-600">Color: {item.color} | Size: {item.size}</p>
                <p className="text-black font-semibold">₹{item.discountedPrice}</p>
              </div>
            </div>
            <div onClick={() => setSelectedItem(item)} className="col-span-4 flex flex-col items-center text-center cursor-pointer">
              <StarBorderIcon className="text-[#A0522D] !w-10 !h-10" />
              <span className="text-sm mt-2 text-[#A0522D]">Rate & Review</span>
            </div>

            {reviews[item.product._id]?.length > 0 && (
              <div className="col-span-12 mt-3 text-sm text-gray-700">
                <p className="font-semibold">💬 Reviews:</p>
                {reviews[item.product._id].map((rev) => (
                  <p key={rev._id}>“{rev.review}” — <i>{rev.user.firstName}</i></p>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Rating Dialog */}
        <RatingDialog
          open={!!selectedItem}
          handleClose={() => setSelectedItem(null)}
          handleSubmit={handleRatingReviewSubmit}
        />
      </div>

{/* 🌸 Romantic Invoice Viewer */}
  {invoiceBlobUrl ? (
    <>
      <button
        onClick={() => generateInvoice(order, true)}
        className="mt-4 px-5 py-2 bg-[#673AB7] text-white rounded hover:bg-[#512DA8]"
      >
        Download Invoice
      </button>
    </>
  ) : (
    <p className="text-gray-500">Crafting your lovely invoice... 🧾</p>
  )}


    </div>
  );
};

export default OrderDetails;
