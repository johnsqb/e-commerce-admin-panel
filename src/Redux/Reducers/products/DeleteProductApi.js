// CategoryApi.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create delete category API call
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (categoryId, { rejectWithValue }) => {
    try {
      console.log(categoryId);
      
      const response = await axios.delete(`http://localhost:8080/api/products/${categoryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
