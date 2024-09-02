import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteOrderItem } from '../../Redux/Reducers/orderItem/DeleteOrderItemApi';
import { getOrderItem } from '../../Redux/Reducers/orderItem/OrderItemApi';
const DeleteOrderItem = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteOrderItem(id)); // Pass the ID directly
      dispatch(getOrderItem()); // Fetch the latest categories to update the table
      console.log("deleted");
      

      Swal.fire({
        icon: 'success',
        title: 'OrderItem Deleted',
        text: 'The orderItem has been successfully deleted.',
      });
    } catch (error) {
      console.error('Failed to delete orderItem:', error);
      Swal.fire({
        icon: 'error',
        title: 'Deletion Failed',
        text: 'There was an error deleting the orderItem.',
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

export default DeleteOrderItem;
