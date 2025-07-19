import React, { useEffect } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "../../State/Customer/Action";

const CustomersTable = () => {
  const dispatch = useDispatch();
  const { customers, isLoading } = useSelector((store) => store.customer);

  console.log(customers)

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  return (
    <div className="p-5">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="All Customers" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customers table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Customer ID</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Mobile</TableCell>
                <TableCell align="center">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                customers?.map((customer) => (
                  <TableRow
                    key={customer._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">
                      {customer.firstName} {customer.lastName}
                    </TableCell>
                    <TableCell align="center">{customer._id}</TableCell>
                    <TableCell align="center">{customer.email}</TableCell>
                    <TableCell align="center">
                      {customer.mobile || "—"}
                    </TableCell>
                    <TableCell align="center">
                      {customer.role || "Customer"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default CustomersTable;
