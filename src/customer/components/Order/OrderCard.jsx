import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  // Determine delivery status text and color
  const isDelivered = order.orderStatus === "DELIVERED";

  return (
    <div
      onClick={() => navigate(`/account/order/${order._id}`)}
      className="p-5 shadow-lg hover:shadow-2xl border bg-[#F1EDE1] cursor-pointer"
    >
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top rounded"
              src={order.orderItems[0].product.images[0]}
              alt=""
            />
            <div className="ml-5 space-y-2">
              <p>{order.orderItems[0].product.name}</p>
              <p className="opacity-50 text-xs font-semibold">
                Size: {order.orderItems[0].size}
              </p>
              <p className="opacity-50 text-xs font-semibold">
                Color: {order.orderItems[0].color}
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <p>₹{order.totalAmount}</p>
        </Grid>
        <Grid item xs={4}>
          {isDelivered ? (
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-2 text-sm"
                />
                <span>Delivered on {new Date(order.deliveredAt).toDateString()}</span>
              </p>
              <p className="text-xs">Your item has been delivered</p>
            </div>
          ) : (
            <p>
              <span>
                Status: {order.orderStatus}
              </span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
