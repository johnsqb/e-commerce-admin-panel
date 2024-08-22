import { Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import {editCategory} from '../../Redux/Reducers/categories/EditCategoryApi'
import { getCategory } from '../../Redux/Reducers/categories/CategoryApi';
import Swal from 'sweetalert2';


const EditCategory = (props) => {

    const name =props.data;
    const close =props.closeEvent
    console.log(name);
    
  
    const [categoryName, setCategoryName] = useState(name.name);
  const [description, setDescription] = useState(name.description);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const updatedCategory = {
      name: categoryName,
      description: description,
    };
  
    try {
      await dispatch(editCategory({ categoryId: name.id, updatedCategory })); // Use name.id to pass the ID
       dispatch(getCategory()); // Fetch the latest categories to update the table
      
      close(); // Close the dialog after successful submission
  
      Swal.fire({
        icon: 'success',
        title: 'Category Updated',
        text: 'The category has been successfully updated.',
      });
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  


    return (
    <>
         <Box sx={{ m:2}}/>
       <Typography variant='h5' align='center'>
        Edit category
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
            <TextField id="outlined-basic" label="Category Name" variant="outlined" size='large' sx={{ minWidth: "100%" }}
                 value={categoryName}
                 onChange={(e) => setCategoryName(e.target.value)}/>
            
            </Grid>

            <Grid item xs={12}>
            <TextField id="outlined-basic" label="Description" variant="outlined" size='large' sx={{ minWidth: "100%" }}
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
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



export default EditCategory;