
import {  createSlice} from '@reduxjs/toolkit'
import StatusCode from "../utils/StatusCode";
import {getProduct} from './ProductApi';
 import { addProducts } from './AddProductsApi';
import { initialState } from './ProductInitialState';
import { editProducts } from './EditProductsApi';
// import { editCategory } from './EditCategoryApi';
// import { deleteCategory } from './DeleteCategoryApi';

const productSlice = createSlice({

    name:'product',
     initialState,
    reducers:{
  
    },

    extraReducers:(builder)=>{

        builder
        .addCase(getProduct.pending,(state)=>{
            state.status = StatusCode.LOADING
        })


        .addCase(addProducts.fulfilled, (state, action) => {
            state.products.push(action.payload); // Add the new category to the state
            state.status = StatusCode.IDLE
  
        })
        
        .addCase(addProducts.rejected, (state, action) => {
            state.status = StatusCode.ERROR
          })

        .addCase(editProducts.fulfilled, (state, action) => {
            const index = state.products.findIndex(category => category.id === action.payload.id);
            console.log(index);
            
            if (index !== -1) {
                state.products[index] = action.payload;
            }
            state.status = StatusCode.IDLE;
        })

        
        // .addCase(deleteCategory.fulfilled, (state, action) => {
        //     state.categories = state.categories.filter(category => category.id !== action.payload);
        //   })
        
        .addCase(getProduct.fulfilled,(state,action)=>{
 
            state.products=action.payload
            state.status = StatusCode.IDLE
         })
 
         .addCase(getProduct.rejected,(state,action)=>{
            state.status = StatusCode.ERROR
        });
        
    },
 
    
 }); 

 export default productSlice.reducer;
