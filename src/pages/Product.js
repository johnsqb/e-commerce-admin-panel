import Box from '@mui/material/Box';
import React from 'react';

import Sidebar from '../components/Sidebar';


const Product = () => {
  return (
    <>
   <Box height={30}/>

<Box sx={{ display: 'flex' }}>

<Sidebar/>
<Box component="main" sx={{flexGrow: 1,p: 3}}>

<h1>Product</h1>
</Box>



</Box>
    </>

  )
}

export default Product