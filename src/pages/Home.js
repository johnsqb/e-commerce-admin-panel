import React from 'react'
import Box from '@mui/material/Box';

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar';

import Typography from '@mui/material/Typography';



const Home = () => {
  return (
    <>
        <Box height={30}/>

    <Box sx={{ display: 'flex' }}>

    <Sidebar/>
    <Box component="main" sx={{flexGrow: 1,p: 3}}>

    <h1>Home</h1>
    </Box>

   

    </Box>
    </>

  )
}

export default Home