import { Grid, IconButton, Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch,useSelector } from 'react-redux';
import {editSubCategory} from '../../Redux/Reducers/subCategories/EditSubCategoryApi'
import { getCategory } from '../../Redux/Reducers/categories/CategoryApi';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import {getsubCategory} from '../../Redux/Reducers/subCategories/SubCategoryApi'




const EditSubCategory = (props) => {

    const name =props.data;
    const close =props.closeEvent
    
  
  
 const [subCategoryName, setSubCategoryName] = useState("");
 const [description, setDescription] = useState("");
 const[category,setCategory] = useState("");
 console.log(category);
 
 useEffect (()=>{
  setCategory(name.category);
  setDescription(name.description);
  setSubCategoryName(name.name)

 },[])

  const dispatch = useDispatch();

  const { categories,status } = useSelector(state => state.category);


  useEffect(()=>{

    dispatch(getCategory());
     

},[dispatch]);
  const handleSubmit = async () => {
    const updatedCategory = {
      name: subCategoryName,
      description: description,
      category: category

    };
  
    try {
      await dispatch(editSubCategory({ subCategoriesId: name.id, updatedCategory })); // Use name.id to pass the ID
       dispatch(getsubCategory()); // Fetch the latest categories to update the table
      
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
            <Grid item xs={6}>
            <TextField id="outlined-basic" label="Category Name" variant="outlined" size='large' sx={{ minWidth: "100%" }}
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
            <Button variant="contained"  onClick={handleSubmit} >Update</Button>

            </Typography>
            </Grid>
            </Grid>
            <Box sx={{m:4}}/>
    </>
  )
}



export default EditSubCategory;