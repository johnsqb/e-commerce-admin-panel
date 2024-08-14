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


const columns = [
    { id: 'id', label: 'Id', minWidth: 170 },
    { id: 'name', label: 'Category Name', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 170, align: 'center' },
    { id: 'createdAt', label: 'Created At', minWidth: 170, align: 'center' },
    { id: 'deletedAt', label: 'Deleted At', minWidth: 170, align: 'center' },
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



  if(status===StatusCode.LOADING){
    return <p>Loading...</p>
  }
  if(status===StatusCode.ERROR){
     
      return < p> Something went wrong..try again</p>
       
      }


  return (
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

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }} // Making headers bold and adding background color

                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={category.id}>
                    {columns.map((column) => {
                      const value = category[column.id];
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
  );
}