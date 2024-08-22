import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from 'sweetalert2';
import { deleteCategory } from '../../Redux/Reducers/categories/DeleteCategoryApi';
import { getCategory } from '../../Redux/Reducers/categories/CategoryApi';
import { Tooltip } from '@mui/material';

const DeleteCategory = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteCategory(id)); // Pass the ID directly
      dispatch(getCategory()); // Fetch the latest categories to update the table
      console.log("deleted");
      

      Swal.fire({
        icon: 'success',
        title: 'Category Deleted',
        text: 'The category has been successfully deleted.',
      });
    } catch (error) {
      console.error('Failed to delete category:', error);
      Swal.fire({
        icon: 'error',
        title: 'Deletion Failed',
        text: 'There was an error deleting the category.',
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

export default DeleteCategory;
