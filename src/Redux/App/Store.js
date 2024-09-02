// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../Reducers/categories/categorySlice';
import orderItemReducer from '../Reducers/orderItem/orderItemSlice';
import sidebarReducer from '../Reducers/slide/SidebarSlice';

// If you don't need the extra import, you can delete the incomplete import statement

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    category: categoryReducer,
    orderItem: orderItemReducer,
  },
});

export default store;


