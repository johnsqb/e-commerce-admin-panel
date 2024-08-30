import { Grid, IconButton, Typography } from '@mui/material'
import React, { useState,useEffect} from 'react'
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch,useSelector } from 'react-redux';
import { addSubCategory } from '../../Redux/Reducers/subCategories/AddSubCategoriesApi';
import {getCategory} from '../../Redux/Reducers/categories/CategoryApi'
import {getsubCategory} from '../../Redux/Reducers/subCategories/SubCategoryApi'

import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import StatusCode from '../../Redux/Reducers/utils/StatusCode';




const AddSubCategory = ({closeEvent}) => {

 const [subCategoryName, setSubCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const[category,setCategory] = useState('');
  const dispatch = useDispatch();

  // Fetch categories from Redux store
  const { categories,status } = useSelector(state => state.category);


  useEffect(()=>{

    dispatch(getCategory());
     

},[dispatch]);
  // },[]); // Fetch categories when the component loads []);

  const handleSubmit = async () => {
   
    
    const newCategory = {
      
      name: subCategoryName,
      description: description,
      categoryId: category
    };
   

    try {
        await dispatch(addSubCategory(newCategory)); // Dispatch the action to add the category
        await dispatch(getsubCategory()); // Fetch the latest categories to update the table
        console.log("not updated");
        
      closeEvent(); // Close the dialog after successful submission

      Swal.fire({
        icon: 'success',
        title: 'sub-category  Added',
        text: 'The sub-category  has been successfully added.',
      });

    
    } catch (error) {
      console.error("Failed to add sub-category:", error);
    }
  };


  return (
    <>
       <Box sx={{ m:2}}/>
       <Typography variant='h5' align='center'>
        Add Sub-category
       </Typography>
       <IconButton 
        style={{ position: "absolute",top:"0",right : "0"}}
        onClick={closeEvent}
       >
        <CloseIcon />
        </IconButton> 
        <Box height={15}/>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField id="outlined-basic"
                  label="Sub-Category Name" 
                  variant="outlined"
                  size='small'
                  sx={{ minWidth: "100%" }}
                 value={subCategoryName}
                 onChange={(e) => setSubCategoryName(e.target.value)}/>
            
            </Grid>

            <Grid item xs={6}>
            <TextField id="outlined-basic" 
                      select
                       label="Category" 
                      variant="outlined" 
                      size='small' 
                      sx={{ minWidth: "100%" }}
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                   >
             {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
            </TextField>
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

export default AddSubCategory