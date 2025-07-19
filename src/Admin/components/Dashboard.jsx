import { Grid } from '@mui/material'
import React from 'react'
import Achievement from './Achievement'
import MonthlyOverview from './MonthlyOverview'
import ProductsTable from './ProductsTable'
import OrderViewTable from '../view/OrderViewTable'
import ProductViewTable from '../view/ProductViewTable'

const AdminDashboard = () => {
  return (
    <div className='p-10'>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Achievement/>
            </Grid>
            <Grid xs={12} md={8}>
                <MonthlyOverview/>
            </Grid>
            <Grid xs={12} md={6}>
                <OrderViewTable/>
            </Grid>
            <Grid xs={12} md={6}>
                <ProductViewTable/>
            </Grid>
        </Grid>
    </div>
  )
}

export default AdminDashboard