
import { createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
// import axios from 'axios';


 const jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlJPTEVfU0VMTEVSIiwic3ViIjoiam9obnMiLCJpYXQiOjE3MjMxODU5MDIsImV4cCI6MTcyMzE4OTUwMn0.59L-KaRt4pVc_s2u54N-pEfyWfzhkhc8N-Xth1prd5E'

export  const getCategory = createAsyncThunk('categories/fetchCategories',async()=>{

 try{
 const response = await axios.get("http://localhost:8080/api/categories/getall",{

   //  headers:{
   //     Authorization: `Bearer ${jwtToken}`
   //  }
    

    
 });
 return response.data; // Assuming the API response contains data field

} catch (error) {
console.error('Error fetching categories:', error);
throw error; // Rethrow the error so that the rejected action contains the error object
}
});