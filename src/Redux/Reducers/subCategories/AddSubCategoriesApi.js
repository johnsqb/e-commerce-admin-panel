import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addSubCategory = createAsyncThunk(
  'subcategory/addSubCategory',
  async ({ name, description, categoryId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/subCategories/add?id=${categoryId}`, {name,description});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
