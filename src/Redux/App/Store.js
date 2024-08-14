// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../Reducers/slide/SidebarSlice';
import categoryReducer from '../Reducers/categories/categorySlice';


const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    category:categoryReducer

  },
});

export default store;
