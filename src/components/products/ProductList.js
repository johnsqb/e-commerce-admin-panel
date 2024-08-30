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
import {getProduct} from '../../Redux/Reducers/products/ProductApi';
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
import AddProduct from './AddProduct';
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct';
import Swal from 'sweetalert2';
// import DeleteCategory from './DeleteCategory';






const columns = [
    { id: 'id', label: 'Id', minWidth: 50 ,width: '4%' },
    { id: 'name', label: 'Product Name', minWidth: 50,width: '10%'  },
    { id: 'description', label: 'Description', minWidth: 50, align: 'center',width: '18%'  },
    { id: 'createdAt', label: 'Created At', minWidth: 50, align: 'center',width: '17%'  },
    { id: 'deletedAt', label: 'Deleted At', minWidth: 50, align: 'center',width: '10%'  },
    { id: 'price', label: 'Price', minWidth: 50, align: 'center',width: '10%'  },
    { id: 'summary', label: 'Summary', minWidth: 50, align: 'center',width: '17%'  },
    { id: 'cover', label: 'Cover', minWidth: 50, align: 'center',width: '17%'  },
    { id: 'subCategories', label: 'Category Name', minWidth: 50, align: 'center',width: '17%'  },
    { id: 'sku', label: 'Sku', minWidth: 50, align: 'center',width: '15%'  },


    { id: 'action', label: 'Action', minWidth: 30, align: 'center',width: '10%'  },
  ];

export default function ProductList() {
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

    const {products,status } = useSelector(state => state.product);
    console.log();

    // const filteredProducts = products.filter(product => (product.parentCategory.id===id));

    // console.log(categories);
    
    
    useEffect(()=>{

       dispatch(getProduct());
        
  
 },[dispatch]);


 useEffect(() => {
  setFilteredCategories(products);
}, [products]);
console.log(products);




// useEffect(() => {
//   if (products.length > 0) {
//     setFilteredCategories(products);
//   }
// }, [products]);


const filterData = (v) => {

  
  if (v) {
    setFilteredCategories([v]);
    
  } else {
    setFilteredCategories(products);
  }
  
  
};

const editData = (id,name,description,subCategories,cover,summary,sku,price) => {
  const data = {
    id : id,
    name : name,
    description : description,
    subCategories:subCategories.id,
    cover:cover,
    summary:summary,
    sku:sku,
    price:price
  };
  setFormid(data);
  handleEditOpen();
};



 
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
         <AddProduct closeEvent={handleClose} />
        </Box>
      </Modal>

      <Modal
          open={editopen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <EditProduct closeEvent={handleEditClose} data={formid}/>
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
            Product List
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2"  sx={{ mb: 2 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={products}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(products) => products.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Product" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
              Add Product
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
                      let value = category[column.id];

                      if (column.id === 'subCategories') {
                        value = category.subCategories ? category.subCategories.name : 'Unknown Category';
                        }
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
                                            marginLeft:"30px",
                                            

                                        }}

                                        onClick={() => {
                                          
                                          console.log(category.subCategories.id);
                                          
                                          editData(category.id,category.name,category.description,category.subCategories,category.cover,category.summary,
                                            category.sku,category.price)
                                          
                                        }}
                                    />
                                    </Tooltip>

                                    <DeleteProduct id={category.id}  />
                                    {/* <Tooltip  title="Delete">

                                    <DeleteIcon
                                        style={{
                                            fontSize: "20px",
                                            color: "darkred",
                                            cursor: "pointer",
                                        }}

                                        onClick={() => {
                                          DeleteProduct(category.id)
                                        }}
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
        // count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}

