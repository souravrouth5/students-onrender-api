import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FetchProducts, RemoveProduct } from '../redux/Productsslice';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


export function ProductsList() {

    const dispatch = useDispatch()

    const queryClient = useQueryClient()


    const { data: productsResponse} = useQuery({
        queryKey: ['fetchproducts'],
        queryFn: () => dispatch(FetchProducts())
    })

    console.log(productsResponse?.payload);

    const deleteProduct = (payload) => {
        RemoveProduct(payload?._id)
        setTimeout(() => {
            queryClient.invalidateQueries(['fetchproducts'])
        }, 1000);
    }

    return (
        <>
            <Link to={'/addproduct'} style={{textAlign: 'left', margin: '10px'}}><Button variant='contained' >Add Product</Button></Link>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Thumbnail</TableCell>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Description</TableCell>
                            <TableCell align='center'>Brand</TableCell>
                            <TableCell align='center'>Price</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productsResponse?.payload?.data?.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <img src={`${row?.image}`} alt="" style={{width: '100px', height: '100px'}}/>
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{row.brand}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/update/${row?._id}`}><Button variant='contained' color='success' sx={{ mr: 1 }}>Edit</Button></Link>
                                    <Button variant='contained' color='error' onClick={() => deleteProduct(row)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
