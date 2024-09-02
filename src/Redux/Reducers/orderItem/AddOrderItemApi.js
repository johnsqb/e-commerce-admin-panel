import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addOrderItem = createAsyncThunk(
  'orderItem/addOrderItem',
  async (newOrderItem, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/orderItem/add', newOrderItem);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);