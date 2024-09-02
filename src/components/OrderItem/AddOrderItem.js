import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { addOrderItem } from '../../Redux/Reducers/orderItem/AddOrderItemApi';
import { getOrderItem } from '../../Redux/Reducers/orderItem/OrderItemApi';



const AddOrderItem = ({closeEvent}) => {

 const [OrderItemQuantity, setOrderItemQuantity] = useState('');
  const [status, setStatus] = useState('');
  

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const newOrderItem = {
      quantity: OrderItemQuantity,
      status: status,
      
    };

    try {
        await dispatch(addOrderItem(newOrderItem)); // Dispatch the action to add the category
        console.log(newOrderItem);
        
        dispatch(getOrderItem()); // Fetch the latest categories to update the table
        console.log("not updated");
        
      closeEvent(); // Close the dialog after successful submission

      Swal.fire({
        icon: 'success',
        title: 'OrderItem Added',
        text: 'The OderItem has been successfully added.',
      });

    
    } catch (error) {
      console.error("Failed to add OderItem:", error);
    }
  };

  return (
    <>
       <Box sx={{ m:2}}/>
       <Typography variant='h5' align='center'>
        Add orderItem
       </Typography>
       <IconButton 
        style={{ position: "absolute",top:"0",right : "0"}}
        onClick={closeEvent}
       >
        <CloseIcon />
        </IconButton> 
        <Box height={15}/>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField id="outlined-basic" label="OrderItemQuantity" variant="outlined" size='large' sx={{ minWidth: "100%" }}
                 value={OrderItemQuantity}
                 onChange={(e) => setOrderItemQuantity(e.target.value)}/>
            
            </Grid>

            <Grid item xs={12}>
            <TextField id="outlined-basic" label="Status" variant="outlined" size='large' sx={{ minWidth: "100%" }}
                     value={status}
                     onChange={(e) => setStatus(e.target.value)}
                   />
            </Grid>

            <Grid item xs={12}>
            <Typography variant='h5' align='center'>
            <Button variant="contained"  onClick={handleSubmit} >ADD</Button>

            </Typography>
            </Grid>


           

            </Grid>
        <Box sx={{m:4}}/>

    </>
  )
}

export default AddOrderItem