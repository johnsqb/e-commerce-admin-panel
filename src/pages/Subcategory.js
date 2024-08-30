import React from 'react'
import Box from '@mui/material/Box';

import Sidebar from '../components/Sidebar'
import Typography from '@mui/material/Typography';
import SubCategoryList from '../components/subCategory/SubCategoryList';


const Subcategory = () => {
    
    
    
    return (
        <>
           <Box height={30}/>

            <Box sx={{ display: 'flex' }}>

                <Sidebar/>
                <Box component="main" sx={{flexGrow: 1,p: 3}}>
                <SubCategoryList/>
                </Box>

            </Box>
        </>
    
      )
    }
    

export default Subcategory