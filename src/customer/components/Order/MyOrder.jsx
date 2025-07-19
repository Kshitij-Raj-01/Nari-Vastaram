import React, { useEffect, useState } from "react";
import { api } from "../../../config/apiConfig";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders/user");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-10 text-purple-600">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center bg-[#FFE0BC] px-6 text-center text-gray-700">
        <h2 className="text-2xl font-semibold">You have no orders yet.</h2>
        <p className="mt-2">Your beautiful shopping journey awaits.</p>
      </div>
    );
  }
  

  return (
    <div className="bg-[#FFE0BC] min-h-screen py-10 px-6 lg:px-20">
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-10"
      >
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="mt-2 text-gray-700">
          Here are all the memories you’ve created with us.
        </p>
      </motion.header>

      <div className="max-w-4xl mx-auto space-y-6">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#F1D4A9] rounded-lg shadow p-6 space-y-4"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
  <p className="text-gray-600 text-sm">
    Order Date:{" "}
    <span className="font-medium text-gray-900">
      {new Date(order.createdAt).toLocaleDateString()}
    </span>
  </p>
  <p className="text-gray-600 text-sm">
    Status:{" "}
    <span className="font-semibold text-indigo-700">
      {order.orderStatus}
    </span>
  </p>
  <p className="text-gray-600 text-sm">
    Estimated Delivery:{" "}
    <span className="font-medium text-green-700">
      {new Date(new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
    </span>
  </p>
</div>

              <div className="mt-2 md:mt-0">
                <p className="text-gray-700 text-lg">
                  Total:{" "}
                  <span className="font-bold">
                    ₹{order.totalDiscountedPrice.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>

            <ul className="divide-y divide-gray-300">
              {order.orderItems.map((item) => (
                <li key={item._id} className="py-3 flex space-x-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-16 h-16 rounded object-cover border"
                  />
                  <div>
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} | Size: {item.size}
                    </p>
                    <p className="text-sm text-gray-700">
                      ₹{item.discountedPrice.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-right space-x-2 mt-3">
  <button
    onClick={() => {navigate(`/account/orders/${order._id}`)}}
    className="bg-[#9155FD] text-white px-4 py-2 rounded hover:bg-[#7d3fdf] transition"
  >
    View Details
  </button>

  {(order.orderStatus === "PLACED" || order.orderStatus === "CONFIRMED") && (
    <button
      onClick={async () => {
        try {
          await api.put(`/api/orders/${order._id}/cancel`);
          alert("Order canceled successfully");
          window.location.reload();
        } catch (err) {
          alert("Failed to cancel order");
        }
      }}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Cancel Order
    </button>
  )}

  {order.orderStatus === "DELIVERED" && (
    <button
      onClick={async () => {
        try {
          await api.put(`/api/orders/${order._id}/return`);
          alert("Return request placed");
          window.location.reload();
        } catch (err) {
          alert("Failed to request return");
        }
      }}
      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
    >
      Return Order
    </button>
  )}
</div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
