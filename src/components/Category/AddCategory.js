import { Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import {addCategory} from '../../Redux/Reducers/categories/AddCategoriesApi'
import { getCategory } from '../../Redux/Reducers/categories/CategoryApi';
import Swal from 'sweetalert2';



const AddCategory = ({closeEvent}) => {

 const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const newCategory = {
      name: categoryName,
      description: description,
    };

    try {
        await dispatch(addCategory(newCategory)); // Dispatch the action to add the category
        console.log(newCategory);
        
        dispatch(getCategory()); // Fetch the latest categories to update the table
        console.log("not updated");
        
      closeEvent(); // Close the dialog after successful submission

      Swal.fire({
        icon: 'success',
        title: 'Category Added',
        text: 'The category has been successfully added.',
      });

    
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <>
       <Box sx={{ m:2}}/>
       <Typography variant='h5' align='center'>
        Add category
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
            <Button variant="contained"  onClick={handleSubmit} >ADD</Button>

            </Typography>
            </Grid>


           

            </Grid>
        <Box sx={{m:4}}/>

    </>
  )
}

export default AddCategory