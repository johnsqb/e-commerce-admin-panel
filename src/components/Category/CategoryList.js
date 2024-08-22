import * as React from 'react';
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
import {getCategory} from '../../Redux/Reducers/categories/CategoryApi';
import StatusCode from "../../Redux/Reducers/utils/StatusCode";
import { useEffect,useState } from 'react';
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Stack from '@mui/material/Stack';

import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from '@mui/material';
import Modal from '@mui/material/Modal';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import { deleteCategory } from '../../Redux/Reducers/categories/DeleteCategoryApi';
import Swal from 'sweetalert2';
import DeleteCategory from './DeleteCategory';






const columns = [
    { id: 'id', label: 'Id', minWidth: 50 ,width: '4%' },
    { id: 'name', label: 'Category Name', minWidth: 50,width: '10%'  },
    { id: 'description', label: 'Description', minWidth: 50, align: 'center',width: '15%'  },
    { id: 'createdAt', label: 'Created At', minWidth: 50, align: 'center',width: '17%'  },
    { id: 'deletedAt', label: 'Deleted At', minWidth: 50, align: 'center',width: '17%'  },
    { id: 'action', label: 'Action', minWidth: 50, align: 'center',width: '17%'  },
  ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

export default function CategoryList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editopen, setEditopen] = useState(false);

  const [formid, setFormid] = useState('');

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

    const {categories,status } = useSelector(state => state.category);
    // console.log();
    // const id =props.parentId;

    // const filteredProducts = products.filter(product => (product.parentCategory.id===id));

    console.log(categories);
    
    
    useEffect(()=>{

       dispatch(getCategory());
        
  
 },[dispatch]);


//  useEffect(() => {
//   setFilteredCategories(categories);
// }, [categories]);


useEffect(() => {
   console.log(filteredCategories);
   
}, [filteredCategories]);

useEffect(() => {
  if (categories.length > 0) {
    setFilteredCategories(categories);
  }
}, [categories]);


const filterData = (v) => {

  
  if (v) {
    setFilteredCategories([v]);
    
  } else {
    setFilteredCategories(categories);
  }
  
  
};

const editData = (id,name,description) => {
  const data = {
    id : id,
    name : name,
    description : description
  };
  setFormid(data);
  handleEditOpen();
};


const handleDelete = () => {
  dispatch(getCategory()); // Fetch the updated categories list after deletion
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
         <AddCategory closeEvent={handleClose} />
        </Box>
      </Modal>

      <Modal
          open={editopen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <EditCategory closeEvent={handleEditClose} data={formid}/>
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
            Category List
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2"  sx={{ mb: 2 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={categories}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(categories) => categories.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search category" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
              Add Category
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
            {filteredCategories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={category.id}>
                    {columns.map((column) => {
                      const value = category[column.id];
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
                                          editData(category.id,category.name,category.description)
                                        }}
                                    />
                                    </Tooltip>

                                    <DeleteCategory id={category.id} onDelete={handleDelete} />
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
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}

