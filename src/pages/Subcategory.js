import React from 'react'
import Box from '@mui/material/Box';

import Sidebar from '../components/Sidebar'



const Subcategory = () => {
    return (
        <>
           <Box height={30}/>

            <Box sx={{ display: 'flex' }}>

                <Sidebar/>
                <Box component="main" sx={{flexGrow: 1,p: 3}}>

                <h1>Sub-category</h1>
                </Box>

            </Box>
        </>
    
      )
    }
    

export default Subcategory