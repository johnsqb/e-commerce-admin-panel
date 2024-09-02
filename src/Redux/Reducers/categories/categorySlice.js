
import { createSlice } from '@reduxjs/toolkit';
import StatusCode from "../utils/StatusCode";
import { addCategory } from './AddCategoriesApi';
import { getCategory } from './CategoryApi';
import { initialState } from './CategoryInitialState';
import { deleteCategory } from './DeleteCategoryApi';
import { editCategory } from './EditCategoryApi';

const categorySlice = createSlice({

    name:'category',
     initialState,
    reducers:{
  
    },

    extraReducers:(builder)=>{

        builder
        .addCase(getCategory.pending,(state)=>{
            state.status = StatusCode.LOADING
        })


        .addCase(addCategory.fulfilled, (state, action) => {
            state.categories.push(action.payload); // Add the new category to the state
            state.status = StatusCode.IDLE
  
        })
        
        .addCase(addCategory.rejected, (state, action) => {
            state.status = StatusCode.ERROR
          })

        .addCase(editCategory.fulfilled, (state, action) => {
            const index = state.categories.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
            state.status = StatusCode.IDLE;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter(category => category.id !== action.payload);
          })
        
        .addCase(getCategory.fulfilled,(state,action)=>{
 
            state.categories=action.payload
            state.status = StatusCode.IDLE
         })
 
         .addCase(getCategory.rejected,(state,action)=>{
            state.status = StatusCode.ERROR
        });
        
    },
 
    
 }); 

 export default categorySlice.reducer;
