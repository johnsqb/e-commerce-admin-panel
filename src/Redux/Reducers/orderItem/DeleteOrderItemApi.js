import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create delete category API call
export const deleteOrderItem = createAsyncThunk(
  'orderItem/deleteOrderItem',
  async (orderItemId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/orderItem/${orderItemId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);