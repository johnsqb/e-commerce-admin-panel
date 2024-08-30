import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from 'sweetalert2';
import { deleteSubCategory } from '../../Redux/Reducers/subCategories/DeleteSubCategoryApi';
import { getCategory } from '../../Redux/Reducers/categories/CategoryApi';
import { Tooltip } from '@mui/material';
import {getsubCategory} from '../../Redux/Reducers/subCategories/SubCategoryApi';


const DeleteSubCategory = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteSubCategory(id)); // Pass the ID directly
      dispatch(getsubCategory()); // Fetch the latest categories to update the table
      console.log("deleted");
      

      Swal.fire({
        icon: 'success',
        title: 'Sub-Category Deleted',
        text: 'The Sub-Category has been successfully deleted.',
      });
    } catch (error) {
      console.error('Failed to delete Sub-Category:', error);
      Swal.fire({
        icon: 'error',
        title: 'Deletion Failed',
        text: 'There was an error deleting the Sub-Category.',
      });
    }
  };

  return (
    <Tooltip title="Delete">
      <DeleteIcon
        style={{
          fontSize: "20px",
          color: "darkred",
          cursor: "pointer",
        }}
        onClick={handleDelete}
      />
    </Tooltip>
  );
};

export default DeleteSubCategory;
