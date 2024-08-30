
import {  createSlice} from '@reduxjs/toolkit'
import StatusCode from "../utils/StatusCode";
import {getsubCategory} from './SubCategoryApi';
import { addSubCategory } from './AddSubCategoriesApi';
import { editSubCategory } from './EditSubCategoryApi';
import { deleteSubCategory } from './DeleteSubCategoryApi';

import { initialState } from './SubCategoryInitialState';


const subCategorySlice = createSlice({

    name:'subcategory',
     initialState,
    reducers:{
  
    },

    extraReducers:(builder)=>{

        builder
        .addCase(getsubCategory.pending,(state)=>{
            state.status = StatusCode.LOADING
        })


        .addCase(addSubCategory.fulfilled, (state, action) => {
            state.subcategories.push(action.payload); // Add the new category to the state
            state.status = StatusCode.IDLE
  
        })
        
        .addCase(addSubCategory.rejected, (state, action) => {
            state.status = StatusCode.ERROR
          })

        .addCase(editSubCategory.fulfilled, (state, action) => {
            const index = state.subcategories.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state.subcategories[index] = action.payload;
            }
            state.status = StatusCode.IDLE;
        })
        .addCase(deleteSubCategory.fulfilled, (state, action) => {
            state.subcategories = state.subcategories.filter(category => category.id !== action.payload);
          })

        .addCase(deleteSubCategory.rejected, (state, action) => {
            console.log(action.error.message);
            state.isLoading = false;
            state.error = action.error.message;
        })
        
        .addCase(getsubCategory.fulfilled,(state,action)=>{
 
            state.subcategories=action.payload
            state.status = StatusCode.IDLE
         })
 
         .addCase(getsubCategory.rejected,(state,action)=>{
            state.status = StatusCode.ERROR
        });
        
    },
 
    
 }); 

 export default subCategorySlice.reducer;
