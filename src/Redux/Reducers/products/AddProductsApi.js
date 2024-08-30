import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addProducts = createAsyncThunk(
  'product/addProducts',
  async ({ name, description, subCategoryId,price,sku,summary,cover,seller }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/products/add?id=${subCategoryId}&&sellerId=${seller}`, {name,description,price,sku,summary,cover});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
