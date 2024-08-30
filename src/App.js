import './App.css';
import Sidebar from './components/Sidebar';
import { Routes,BrowserRouter,Route } from 'react-router-dom';
import Home from "./pages/Home";
import Product from "./pages/Product";
import Category from "./pages/Category";
import SubCategory from "./pages/Subcategory";
import Navbar from './components/Navbar';



function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/product' exact element={<Product />} />
        <Route path='/category' exact element={<Category />} />
        <Route path='/subcategory' exact element={<SubCategory />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
