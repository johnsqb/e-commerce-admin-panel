import Box from '@mui/material/Box';
import React from 'react';
import OrderItemList from '../components/OrderItem/OrderItemList';
import Sidebar from '../components/Sidebar';



const OrderItem = () => {
    return (
        <>
          <Box height={70}/>

            <Box sx={{ display: 'flex' }}>

            <Sidebar/>
            <Box component="main" sx={{flexGrow: 1,p: 3}}>
            <OrderItemList/>
            </Box>



</Box>
        </>
    
      )
    }
    

export default OrderItem