
import {  createSlice} from '@reduxjs/toolkit'
import StatusCode from "../utils/StatusCode";
import {getCategory} from './CategoryApi';
import { initialState } from './CategoryInitialState';


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
