import { Grid, IconButton, Typography } from '@mui/material'
import React, { useState,useEffect} from 'react'
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch,useSelector } from 'react-redux';
import { addProducts } from '../../Redux/Reducers/products/AddProductsApi';
import { getProduct } from '../../Redux/Reducers/products/ProductApi'; 
import {getsubCategory} from '../../Redux/Reducers/subCategories/SubCategoryApi'

import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import StatusCode from '../../Redux/Reducers/utils/StatusCode';




const AddProduct = ({closeEvent}) => {

 const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const[subCategory,setSubCategory] = useState('');
  const[price,setPrice] = useState('');
  const[sku,setSku] = useState('');
  const[summary,setSummary] = useState('');
  const [cover,setCover]= useState('')
  const [seller,setSeller] = useState('1');


  const dispatch = useDispatch();

  // Fetch categories from Redux store
  const { subcategories,status } = useSelector(state => state.subcategory);


  useEffect(()=>{

    dispatch(getsubCategory());
     

},[dispatch]);
  // },[]); // Fetch categories when the component loads []);

  const handleSubmit = async () => {
   
    
    const newCategory = {
      
      name: productName,
      description: description,
      subCategoryId: subCategory,
      price:price,
      sku:sku,
      summary:summary,
      cover:cover,
      seller:seller


    };
   

    try {
        await dispatch(addProducts(newCategory)); // Dispatch the action to add the category
         dispatch(getProduct()); // Fetch the latest categories to update the table
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
        Add Product
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
                  label="Product Name" 
                  variant="outlined"
                  size='large'
                  sx={{ minWidth: "100%" }}
                 value={productName}
                 onChange={(e) => setProductName(e.target.value)}/>
            
            </Grid>

            <Grid item xs={6}>
            <TextField id="outlined-basic" 
                      select
                       label="sub-category" 
                      variant="outlined" 
                      size='large' 
                      sx={{ minWidth: "100%" }}
                     value={subCategory}
                     onChange={(e) => setSubCategory(e.target.value)}
                   >
             {subcategories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
            </TextField>
            </Grid>

            <Grid item xs={12}>
            <TextField id="outlined-basic" 
                    label="Description" 
                    variant="outlined" 
                    size='large'
                    sx={{ minWidth: "100%" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                   />
            </Grid>

            <Grid item xs={6}>
            <TextField id="outlined-basic"
                  label="Price" 
                  variant="outlined"
                  size='small'
                  sx={{ minWidth: "100%" }}
                 value={price}
                 onChange={(e) => setPrice(e.target.value)}/>
            
            </Grid>

            <Grid item xs={6}>
            <TextField id="outlined-basic"
                  label="SKU" 
                  variant="outlined"
                  size='small'
                  sx={{ minWidth: "100%" }}
                 value={sku}
                 onChange={(e) => setSku(e.target.value)}/>
            
            </Grid>


            <Grid item xs={12}>
            <TextField id="outlined-basic"
                  label="Summary" 
                  variant="outlined"
                  size='small'
                  sx={{ minWidth: "100%" }}
                 value={summary}
                 onChange={(e) => setSummary(e.target.value)}/>
            
            </Grid>


            <Grid item xs={12}>
            <TextField id="outlined-basic"
                  label="Cover" 
                  variant="outlined"
                  size='small'
                  sx={{ minWidth: "100%" }}
                 value={cover}
                 onChange={(e) => setCover(e.target.value)}/>
            
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


export default AddProduct