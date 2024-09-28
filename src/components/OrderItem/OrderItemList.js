// import AddCircleIcon from "@mui/icons-material/AddCircle";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { getOrderItem } from '../../Redux/Reducers/orderItem/OrderItemApi';
import StatusCode from "../../Redux/Reducers/utils/StatusCode";

import Stack from '@mui/material/Stack';

import { Tooltip } from '@mui/material';
import Modal from '@mui/material/Modal';
// import AddOrderItem from './AddOrderItem';
// import axios from "axios";
import { editOrderItem } from '../../Redux/Reducers/orderItem/EditOrderItemApi';
import EditOrderItem from './EditOrderItem';







const columns = [
    { id: 'id', label: 'Id', minWidth: 50 ,width: '4%' },
    { id: 'products', label: 'Product Name', minWidth: 50, width: '10%' }, 
    { id: 'total', label: 'Total', minWidth: 50, width: '10%' }, 
    { id: 'orderDetails', label: 'Delivery Address', minWidth: 50, width: '10%' }, 
    { id: 'quantity', label: 'Quantity', minWidth: 50,width: '10%'  },

    { id: 'status', label: 'Status', minWidth: 50, align: 'center',width: '15%'  },


    { id: 'action', label: 'Action', minWidth: 50, align: 'center',width: '17%'  },

  ];


export default function OrderItemList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filteredOrderItem, setFilteredOrderItem] = useState([]);
  //  const [open, setOpen] = useState(false);
  const [editopen, setEditopen] = useState(false);

  const [formid, setFormid] = useState('');

  // const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditopen(true);
  const handleEditClose = () => setEditopen(false);


  //  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

 

  const dispatch = useDispatch();

    const {orderItems,status } = useSelector(state => state.orderItem);
    // console.log();
    // const id =props.parentId;

    // const filteredProducts = products.filter(product => (product.parentCategory.id===id));

    console.log(orderItems);
    
    
    useEffect(()=>{

       dispatch(getOrderItem());
        
  
 },[dispatch]);
 useEffect(() => {
  console.log('Updated orderItems:', orderItems); // Debugging line
  if (orderItems.length > 0) {
      setFilteredOrderItem(orderItems);
  }
}, [orderItems]);


//  useEffect(() => {
//   setFilteredCategories(categories);
// }, [categories]);
useEffect(() => {
  console.log('Fetched orderItems:', orderItems);
}, [orderItems]);



useEffect(() => {
   console.log(filteredOrderItem);
   
}, [filteredOrderItem]);

useEffect(() => {
  if (orderItems.length > 0) {
    setFilteredOrderItem(orderItems);
  }
}, [orderItems]);


const filterData = (v) => {

  
  if (v) {
    setFilteredOrderItem([v]);
    
  } else {
    setFilteredOrderItem(orderItems);
  }
  
  
};
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};
// const handleStatusUpdate = async (orderItemId, newStatus) => {
//   try {
//       const response = await axios.put(`/api/orderItem/updateStatus/${orderItemId}?status=${newStatus}`, {
          
//           headers: {
//               'Content-Type': 'application/json',
//           },
//       });

//       if (!response.ok) {
//           throw new Error('Failed to update status');
//       }

//       // Optionally refetch or update local state to reflect changes
//       dispatch(getOrderItem()); // Assuming this will refetch the updated list
//   } catch (error) {
//       console.error('Error updating status:', error);
//   }
// };


const handleStatusUpdate = async (id,status)  => {
  
  
  // setFormid(updatedData);
  try {

    await dispatch(editOrderItem({ orderItemId: id, status })); // Use name.id to pass the ID
     dispatch(getOrderItem()); // Fetch the latest categories to update the table
    

    Swal.fire({
      icon: 'success',
      title: 'OrderItem Updated',
      text: 'The orderItem has been successfully updated.',
    });
  } catch (error) {
    console.error("Failed to update orderItem:", error);
  }
};


  // dispatch(editOrderItem(updatedData));




// const handleDelete = () => {
//   dispatch(getOrderItem()); // Fetch the updated categories list after deletion
//   filterData(); // Reset the search/filter after deletion
// };
// const DeleteCategory = ({ id }) => {
//   const dispatch = useDispatch();

//   const handleDelete = async () => {
//     try {
//       await dispatch(deleteCategory(id)); // Pass the ID directly
//       dispatch(getCategory()); // Fetch the latest categories to update the table

//       Swal.fire({
//         icon: 'success',
//         title: 'Category Deleted',
//         text: 'The category has been successfully deleted.',
//       });
//     } catch (error) {
//       console.error('Failed to delete category:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Deletion Failed',
//         text: 'There was an error deleting the category.',
//       });
//     }
//   };

 
  if(status===StatusCode.LOADING){
    return <p>Loading...</p>
  }
  if(status===StatusCode.ERROR){
     
      return < p> Something went wrong..try again</p>
       
      }
      


  return (
    
    <>

      <div>
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
       > */}
        {/* <Box sx={style}>
         <AddOrderItem closeEvent={handleClose} />
        </Box> */}
      {/* </Modal> */}

      <Modal
          open={editopen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <EditOrderItem closeEvent={handleEditClose} data={formid}/>
        </Box>
      </Modal>
    </div>
    
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Order List
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2"  sx={{ mb: 2 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={orderItems}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(orderItem) => orderItem.products.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search OrderItem" />
              )}
            />
            {/* <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography> */}
            {/* <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
              Add OrderItem
            </Button> */}
          </Stack>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth , width: column.width }}
                  sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }} // Making headers bold and adding background color

                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrderItem
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((orderItem) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={orderItem.id}>
                    {columns.map((column) => {
                      let value = orderItem[column.id];
                      
                      if(column.id==='total'){
                        value = orderItem.orderDetails
                        ? orderItem.orderDetails.total:'0'
                      
                      }
                      console.log(orderItem.orderDetails);
                     if (column.id === 'orderDetails') {
                    value = orderItem.orderDetails?.users?.addresses?.[0]?.address_line_2 || '0';
                    console.log(value);
                    }
                    console.log(orderItem.orderDetails?.users?.addresses?.[0]?.address_line_2);
                    // Also log address_line_2 directly
                      // If addresses is an array, access it by index
                      console.log(orderItem.products);
                     if (column.id === 'products') {
                    value = orderItem.products?orderItem.products.name:'0';
                    console.log(value);
                    }
                    if (column.id === 'status') {
                      value = value || "Pending";
                      console.log(value);
                    }

                    // Also log address_line_2 directly
                    console.log(orderItem.products?.[0]?.name);
                    if (column.id === 'action') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Stack spacing={2} direction="row" justifyContent="center">
                            <Tooltip title="Mark as Delivered">
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => handleStatusUpdate(orderItem.id, "Delivered")}
                              >
                                Delivered
                              </Button>
                            </Tooltip>
                            <Tooltip title="Mark as cancelled">
                              <Button
                                variant="contained"
                                color="warning"
                                size="small"
                                onClick={() =>{
                                
                                  handleStatusUpdate(orderItem.id, "Cancelled")
                                } }
                              >
                                cancelled
                              </Button>
                            </Tooltip>
                                    {/* <DeleteOrderItem id={orderItem.id} onDelete={handleDelete} /> */}
                                    {/* <Tooltip  title="Delete">

                                    <DeleteIcon
                                        style={{
                                            fontSize: "20px",
                                            color: "darkred",
                                            cursor: "pointer",
                                        }}

                                        // onClick={() => {
                                        //   DeleteCategory(category.id)
                                        // }}
                                    />
                                    </Tooltip> */}
                                    
                                </Stack>
                            </TableCell>
                        );
                    }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                            
                        </TableCell>
                        
                      );
                    })}
                   
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orderItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}



