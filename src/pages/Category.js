import Box from '@mui/material/Box';
import React from 'react';

import CategoryList from '../components/Category/CategoryList';
import Sidebar from '../components/Sidebar';


const Category = () => {
    return (
        <>
          <Box height={70}/>

            <Box sx={{ display: 'flex' }}>

            <Sidebar/>
            <Box component="main" sx={{flexGrow: 1,p: 3}}>
            <CategoryList/>
            </Box>



</Box>
        </>
    
      )
    }
    

export default Category