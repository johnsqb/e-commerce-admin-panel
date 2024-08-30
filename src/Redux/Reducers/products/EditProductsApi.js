import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const editProducts = createAsyncThunk(
  'product/editProducts',
  async ({ productsId, updatedCategory }, { rejectWithValue }) => {
    console.log("subcategory inside edit products is  "+updatedCategory.subCategory);
    
    try {
      const response = await axios.put(`http://localhost:8080/api/products?productsId=${productsId}&&id=${updatedCategory.subCategory}`, updatedCategory);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
