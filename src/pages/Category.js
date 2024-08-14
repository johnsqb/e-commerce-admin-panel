import React from 'react'
import Box from '@mui/material/Box';

import Sidebar from '../components/Sidebar'
import Typography from '@mui/material/Typography';
import CategoryList from '../components/Category/CategoryList'


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