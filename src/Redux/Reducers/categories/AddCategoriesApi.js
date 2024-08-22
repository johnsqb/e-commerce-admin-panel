import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (newCategory, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/categories/add', newCategory);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
