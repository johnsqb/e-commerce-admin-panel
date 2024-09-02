import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Category from "./pages/Category";
import Home from "./pages/Home";
import OrderItem from "./pages/OrderItem";
import Product from "./pages/Product";
import SubCategory from "./pages/Subcategory";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/product' exact element={<Product />} />
          <Route path='/category' exact element={<Category />} />
          <Route path='/subcategory' exact element={<SubCategory />} />
          <Route path='/orderItem' exact element={<OrderItem />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};



export default App;
