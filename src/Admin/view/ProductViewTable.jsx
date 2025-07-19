import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { deleteProduct, findProducts } from '../../State/Product/Action'
import { useDispatch, useSelector } from 'react-redux'

const ProductViewTable = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(store => store.product);
    
    console.log("product----",products)


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
        pageSize: 10,
        stock: ""
      };
      dispatch(findProducts(data));
    }, [dispatch]);
    

  return (
    <div className=''>

      <Card className='mt-2 bg-[#1b1b1b]'>
        <CardHeader title="Recents Products"/>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align='center'>Product Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.content?.slice(0, 5).map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell>
              <Avatar src={item.imageUrl}></Avatar>
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="center">{item.price}</TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
          </Table>
        </TableContainer>
      </Card>

    
    </div>
  )
}

export default ProductViewTable