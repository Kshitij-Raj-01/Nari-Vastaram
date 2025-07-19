import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder, deleteOrder, deliveredOrder, getOrders, shipOrder } from "../../State/Admin/Order/Action";
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

const OrderViewTable = () => {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log("admin orders : ", adminOrder);

  return (
    <div className="">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="Recents Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Order Id</TableCell>
                <TableCell align="center">Price</TableCell>

                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.orders?.slice(0, 5).map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <AvatarGroup>
                      {item.orderItems?.map((orderItem) => (
                        <Avatar src={orderItem?.product?.imageUrl}></Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {item.orderItems?.map((orderItem) => (
                      <p> {orderItem?.product?.title}</p>
                    ))}
                  </TableCell>
                  <TableCell align="center">{item._id}</TableCell>
                  <TableCell align="center">{item.totalPrice}</TableCell>
                  <TableCell align="center">
                    <span
                      className={`text-white px-5 py-2 rounded-full ${
                        item.orderStatus == "PLACED"
                          ? "bg-[#02B290]"
                          : item.orderStatus == "CONFIRMED"
                          ? "bg-[#369236]"
                          : item.orderStatus == "SHIPPED"
                          ? "bg-[#4141FF]"
                          : item.orderStatus == "PENDING"
                          ? "bg-gray"
                          : "bg-[red]"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
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

export default OrderViewTable;
