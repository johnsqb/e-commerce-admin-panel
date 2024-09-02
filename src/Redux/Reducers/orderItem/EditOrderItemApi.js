import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const editOrderItem = createAsyncThunk(
  'orderItem/editOrderItem',
  async ({ orderItemId, status }, { rejectWithValue }) => {
    try {
      console.log(status + "in editorder");
      
      const response = await axios.put(`http://localhost:8080/api/orderItem/updateStatus/${orderItemId}
                                    ?status=${status}` );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);