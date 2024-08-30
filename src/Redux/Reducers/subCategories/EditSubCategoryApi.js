import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const editSubCategory = createAsyncThunk(
  'subcategory/editSubCategory',
  async ({ subCategoriesId, updatedCategory }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/subCategories?subCategoriesId=${subCategoriesId}&&id=${updatedCategory.category}`, updatedCategory);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
