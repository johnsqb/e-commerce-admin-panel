import { createSlice } from '@reduxjs/toolkit';
import { getOrderItem } from '../../Reducers/orderItem/OrderItemApi';
import { deleteOrderItem } from '../../Reducers/orderItem/DeleteOrderItemApi';
import { editOrderItem } from '../../Reducers/orderItem/EditOrderItemApi';
import StatusCode from "../utils/StatusCode";
import { initialState } from './OrderItemInitialState';

const orderItemSlice = createSlice({
    name: 'orderItem',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrderItem.pending, (state) => {
                state.status = StatusCode.LOADING;
            })
            // .addCase(addOrderItem.fulfilled, (state, action) => {
            //     state.orderItems.push(action.payload);
            //     state.status = StatusCode.IDLE;
            // })
            // .addCase(addOrderItem.rejected, (state) => {
            //     state.status = StatusCode.ERROR;
            // })
            .addCase(editOrderItem.fulfilled, (state, action) => {
                const index = state.orderItems.findIndex(orderItem => orderItem.id === action.payload.id);
                if (index !== -1) {
                    state.orderItems[index] = action.payload;
                }
                state.status = StatusCode.IDLE;
            })
        
            .addCase(deleteOrderItem.fulfilled, (state, action) => {
                state.orderItems = state.orderItems.filter(orderItem => orderItem.id !== action.payload);
            })
            .addCase(getOrderItem.fulfilled, (state, action) => {
                state.orderItems = action.payload;
                state.status = StatusCode.IDLE;
            })
            .addCase(getOrderItem.rejected, (state) => {
                state.status = StatusCode.ERROR;
            });
    },
});

export default orderItemSlice.reducer;
