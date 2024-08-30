// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../Reducers/slide/SidebarSlice';
import categoryReducer from '../Reducers/categories/categorySlice';
import subCategoryReducer from '../Reducers/subCategories/subCategorySlice'
import productReducer from '../Reducers/products/productSlice'


const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    category:categoryReducer,
    subcategory:subCategoryReducer,
    product:productReducer,

  },
});

export default store;
