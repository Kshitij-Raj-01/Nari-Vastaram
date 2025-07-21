import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  returnOrder,
  shipOrder,
} from "../../State/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { generateInvoice } from "../../utils/generateInvoice"; // 💌 Adjust path if needed

const OrdersTable = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrders());
  }, [
    adminOrder.comfirmed,
    adminOrder.shipped,
    adminOrder.delivered,
    adminOrder.deleted,
    adminOrder.returned,
  ]);

  const handleShipedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    handleClose();
  };

  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    handleClose();
  };

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveredOrder(orderId));
    handleClose();
  };

  const handleReturnedOrder = (orderId) => {
    dispatch(returnOrder(orderId));
    handleClose();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const handleDownloadInvoice = async (order) => {
    console.log(order);
    await generateInvoice(order, true); // 💌 Download the PDF
  };

  return (
    <div className="px-10">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="Total Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="orders-table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Order Id</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Payment Status</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Update</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">Invoice</TableCell> {/* 💌 New */}
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.orders?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="center">
                    <AvatarGroup>
                      {item.orderItems?.map((orderItem, i) => (
                        <Avatar key={i} src={orderItem?.product?.imageUrl} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center">
                    {item.orderItems?.map((orderItem, i) => (
                      <p key={i}>{orderItem?.product?.title}</p>
                    ))}
                  </TableCell>
                  <TableCell align="center">{item._id}</TableCell>
                  <TableCell align="center">{item.totalDiscountedPrice}</TableCell>
                  <TableCell align="center">{item.paymentDetails?.paymentMethod}</TableCell>
                  <TableCell align="center">
                    <span
                      className={`text-white px-5 py-2 rounded-full ${
                        item.orderStatus === "PLACED"
                          ? "bg-[#02B290]"
                          : item.orderStatus === "CONFIRMED"
                          ? "bg-[#369236]"
                          : item.orderStatus === "SHIPPED"
                          ? "bg-[#4141FF]"
                          : item.orderStatus === "PENDING"
                          ? "bg-gray"
                          : "bg-[red]"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      Status
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      slotProps={{
                        list: {
                          "aria-labelledby": "basic-button",
                        },
                      }}
                    >
                      <MenuItem onClick={() => handleConfirmedOrder(item._id)}>
                        Confirmed Order
                      </MenuItem>
                      <MenuItem onClick={() => handleShipedOrder(item._id)}>
                        Shipped Order
                      </MenuItem>
                      <MenuItem onClick={() => handleDeliveredOrder(item._id)}>
                        Delivered Order
                      </MenuItem>
                      <MenuItem onClick={() => handleReturnedOrder(item._id)}>
                        Returned Order
                      </MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" onClick={() => handleDeleteOrder(item._id)}>
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDownloadInvoice(item)}
                    >
                      Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrdersTable;
