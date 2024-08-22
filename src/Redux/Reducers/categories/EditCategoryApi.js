import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const editCategory = createAsyncThunk(
  'category/editCategory',
  async ({ categoryId, updatedCategory }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/categories/${categoryId}`, updatedCategory);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
