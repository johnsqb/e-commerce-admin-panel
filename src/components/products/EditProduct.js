import { Grid, IconButton, Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch,useSelector } from 'react-redux';
import {editProducts} from '../../Redux/Reducers/products/EditProductsApi'
import { getsubCategory } from '../../Redux/Reducers/subCategories/SubCategoryApi';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import {getProduct} from '../../Redux/Reducers/products/ProductApi'




const EditProduct = (props) => {

    const name =props.data;
    const close =props.closeEvent
    
  
  console.log(name.subCategories);
  
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const[subCategory,setSubCategory] = useState('');
    const[price,setPrice] = useState('');
    const[sku,setSku] = useState('');
    const[summary,setSummary] = useState('');
    const [cover,setCover]= useState('')
 
 useEffect (()=>{
  setProductName(name.name);
  setDescription(name.description);
  setPrice(name.price);
  setSku(name.sku);
  setCover(name.cover);
  setSummary(name.summary)
  setSubCategory(name.subCategories)


 },[])

  const dispatch = useDispatch();

  const { subcategories,status } = useSelector(state => state.subcategory);


  useEffect(()=>{

    dispatch(getsubCategory());
     

},[dispatch]);

  const handleSubmit = async () => {
    const updatedCategory = {
        name: productName,
        description: description,
        subCategory: subCategory,
        price:price,
        sku:sku,
        summary:summary,
        cover:cover
  
    };
    
    try {
      console.log("sub category id is "+ updatedCategory.subCategory);

      await dispatch(editProducts({ productsId: name.id, updatedCategory })); // Use name.id to pass the ID
       dispatch(getProduct()); // Fetch the latest categories to update the table
      
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
        Edit Product
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
            <Button variant="contained"  onClick={handleSubmit} >Update</Button>

            </Typography>
            </Grid>
            </Grid>
            <Box sx={{m:4}}/>
    </>
  )
}



export default EditProduct;