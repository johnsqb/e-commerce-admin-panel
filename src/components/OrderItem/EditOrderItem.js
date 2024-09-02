import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { editOrderItem } from '../../Redux/Reducers/orderItem/EditOrderItemApi';
import { getOrderItem } from '../../Redux/Reducers/orderItem/OrderItemApi';

const EditOrderItem = (props) => {

    const order =props.data;
    const close =props.closeEvent
    
  
    const [orderItemQuantity, setOrderItemQuantity] = useState(quantity.quantity);
  const [status, setStatus] = useState(status.status);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const updatedOrderItem = {
      quantity: orderItemQuantity,
      status: status,
    };
  
    try {
      await dispatch(editOrderItem({ orderItemId: quantity.id, updatedOrderItem })); // Use name.id to pass the ID
       dispatch(getOrderItem()); // Fetch the latest categories to update the table
      
      close(); // Close the dialog after successful submission
  
      Swal.fire({
        icon: 'success',
        title: 'OrderItem Updated',
        text: 'The orderItem has been successfully updated.',
      });
    } catch (error) {
      console.error("Failed to update orderItem:", error);
    }
  };

  


    return (
    <>
         <Box sx={{ m:2}}/>
       <Typography variant='h5' align='center'>
        Edit orderItem
       </Typography>
       <IconButton 
        style={{ position: "absolute",top:"0",right : "0"}}
        onClick={close}
       >
        <CloseIcon />
        </IconButton> 
        <Box height={15}/>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField id="outlined-basic" label="OrderItem Quantity" variant="outlined" size='large' sx={{ minWidth: "100%" }}
                 value={orderItemQuantity}
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
            <Button variant="contained"  onClick={handleSubmit} >Update</Button>

            </Typography>
            </Grid>
            </Grid>
            <Box sx={{m:4}}/>
    </>
  )
}



export default EditOrderItem;