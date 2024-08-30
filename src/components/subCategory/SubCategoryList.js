import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from 'react-redux';
import {getsubCategory} from '../../Redux/Reducers/subCategories/SubCategoryApi'
import StatusCode from "../../Redux/Reducers/utils/StatusCode";
import { useEffect,useState } from 'react';
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Stack from '@mui/material/Stack';

import { Tooltip } from '@mui/material';
import Modal from '@mui/material/Modal';
import AddSubCategory from './AddSubCategory';
import EditSubCategory from './EditSubCategory';
import DeleteSubCategory from './DeleteSubCategory'
import subCategorySlice from '../../Redux/Reducers/subCategories/subCategorySlice';






const columns = [
    { id: 'id', label: 'Id', minWidth: 50 ,width: '4%' },
    { id: 'name', label: 'Sub-Category ', minWidth: 50,width: '14%'  },
    { id: 'description', label: 'Description', minWidth: 50, align: 'center',width: '20%'  },
    { id: 'categories', label: 'Category Name', minWidth: 50, align: 'center',width: '15%'  },

    { id: 'createdAt', label: 'Created At', minWidth: 50, align: 'center',width: '17%'  },
    { id: 'deletedAt', label: 'Deleted At', minWidth: 50, align: 'center',width: '17%'  },
    { id: 'action', label: 'Action', minWidth: 50, align: 'center',width: '17%'  },
  ];



const SubCategoryList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editopen, setEditopen] = useState(false);

  const [subformid, setSubformid] = useState('');

  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditopen(true);
  const handleEditClose = () => setEditopen(false);


  const handleClose = () => setOpen(false);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dispatch = useDispatch();

  useEffect(()=>{

    dispatch(getsubCategory());
     

},[dispatch]);

    const {subcategories,status } = useSelector(state => state.subcategory);
    // console.log();
    // const id =props.parentId;

    // const filteredProducts = products.filter(product => (product.parentCategory.id===id));

    // console.log(subcategories);
    
    
    


//  useEffect(() => {
//   setFilteredCategories(categories);
// }, [categories]);


// useEffect(() => {
//    console.log(filteredSubCategories);
   
// }, [filteredSubCategories]);

useEffect(() => {
  if (subcategories.length > 0) {
    setFilteredSubCategories(subcategories);
  }
}, [subcategories]);
console.log(subcategories);


const filterData = (v) => {

  
  if (v) {
    setFilteredSubCategories([v]);
    
  } else {
    setFilteredSubCategories(subcategories);
  }
  
  
};

// useEffect(() => {
//     // Ensure that categories are fetched every time the subcategory page is visited
//     if (!subcategories.length) {
//       dispatch(getsubCategory());
//     }
//   }, [dispatch, subcategories]);



  const editData = (id,name,description,category) => {
  const data = {
    id : id,
    name : name,
    description : description,
    category:category.id
  };
  setSubformid(data);
  handleEditOpen();
};


const handleDelete = () => {
  dispatch(getsubCategory()); // Fetch the updated categories list after deletion
  filterData(); // Reset the search/filter after deletion
};
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
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
       >
        <Box sx={style}>
         <AddSubCategory closeEvent={handleClose} />
        </Box>
      </Modal>

      <Modal
          open={editopen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <EditSubCategory closeEvent={handleEditClose} data={subformid}/>
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
            Sub-Category List
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2"  sx={{ mb: 2 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={subcategories}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(subCategories) => subCategories.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search sub-category" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
              Add Sub-Category
            </Button>
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
            {filteredSubCategories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => {
                console.log(category);
                
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={category.id}>
                    {columns.map((column) => {
                        
                        let value = category[column.id];
                        if (column.id === 'categories') {
                          value = category.categories ? category.categories.name : 'Unknown Category';
                          }
                      console.log(value);
                      if (column.id === 'action') {
                        return (
                            <TableCell key={column.id} align={column.align}>
                                <Stack spacing={14} direction="row">
                                  <Tooltip  title="Edit">
                                  
                                    <EditIcon
                                        style={{
                                            fontSize: "20px",
                                            color: "blue",
                                            cursor: "pointer",
                                            marginLeft:"50px",
                                            

                                        }}

                                        onClick={() => {
                                          editData(category.id,category.name,category.description,category.categories)
                                        }}
                                    />
                                    </Tooltip>

                                    <DeleteSubCategory id={category.id}  />
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
        count={subcategories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
)
}

export default SubCategoryList