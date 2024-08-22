// CategoryApi.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create delete category API call
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
