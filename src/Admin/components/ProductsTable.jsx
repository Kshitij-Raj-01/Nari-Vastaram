import {
  Avatar,
  Button,
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
import React, { useEffect } from "react";
import { deleteProduct, findProducts } from "../../State/Product/Action";
import { useDispatch, useSelector } from "react-redux";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { products, deletedProduct } = useSelector((store) => store.product);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    const data = {
      category: "",
      color: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 1000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 0,
      pageSize: 100,
      stock: "",
    };
    dispatch(findProducts(data));
  }, [dispatch, deletedProduct]);

  return (
    <div className="p-5">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="All Products" sx={{ color: "white" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Product ID</TableCell>
                <TableCell align="center">Categories</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Sizes</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.content?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Avatar src={item.imageUrl} />
                  </TableCell>
                  <TableCell align="center">{item.title}</TableCell>
                  <TableCell align="center">{item._id}</TableCell>
                  <TableCell align="center">
                    {item.categories?.join(", ")}
                  </TableCell>
                  <TableCell align="center">₹{item.discountedPrice}</TableCell>
                  <TableCell align="center">
                    {item.sizes
                      ?.filter((size) => size.quantity > 0)
                      .map(
                        (size, index, arr) =>
                          `${size.name}: ${size.quantity}${
                            index < arr.length - 1 ? ", " : ""
                          }`
                      )
                      .join("")}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleProductDelete(item._id)}
                    >
                      Delete
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

export default ProductsTable;
