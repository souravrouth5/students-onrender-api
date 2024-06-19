import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchProductDetails, updateSingle } from "../redux/Updateproductslice"
import { useMutation } from '@tanstack/react-query';
// import axiosInstance from '../axios/Instance';
import { toast } from 'react-toastify';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export function Updateproduct(){

    const { id } = useParams()
    const disptach = useDispatch()
    const { singleData } = useSelector(state => state.update)
    const [img, setImg] = React.useState(false)
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            name: singleData?.data?.name,
            brand: singleData?.data?.brand,
            description: singleData?.data?.description,
            price: singleData?.data?.price,
        }
    })

    console.log(singleData);
    console.log(id);

    const { isPending, mutate } = useMutation({
        // mutationFn: (payload) => axiosInstance.post(`update/product/${id}`, payload),
        mutationFn: (payload) => updateSingle(payload),
        onSuccess: (data) => {
            console.log(data)
            toast.success(data?.data?.message)
        },
        onError: (data) => console.log(data)
    })

    const onSubmit = (data) => {
        const formdata = new FormData()
        formdata.append('name', data.name)
        formdata.append('price', data.price)
        formdata.append('description', data.description)
        formdata.append('brand', data.brand)
        formdata.append('image', data.image[0])
        mutate({ formdata, id })
    }

    useEffect(() => {
        disptach(fetchProductDetails(id))
        setImg(singleData?.data?.image)
        // eslint-disable-next-line
    }, [id,disptach])

    return(
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Add Product
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            {...register('name', { required: true })}
                        />
                        {errors.name?.type === 'required' && <span>@Name is required</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="price"
                            name="price"
                            autoComplete="price"
                            {...register('price', { required: true })}
                        />
                        {errors.price?.type === 'required' && <span>@price is required</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="description "
                            name="description"
                            autoComplete="description"
                            {...register('description', { required: true })}
                        />
                        {errors.description?.type === 'required' && <span>@Description is required</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="brand"
                            label="brand "
                            name="brand"
                            autoComplete="brand"
                            {...register('brand', { required: true })}
                        />
                        {errors.brand?.type === 'required' && <span>@brand is required</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type='file'
                            id="image"
                            name="image"
                            {...register('image', { required: true })}
                            onChange={(e) => {setImg(URL.createObjectURL(e.target.files[0]))}}
                        />
                        {errors.image?.type === 'required' && <span>@image is required</span>}
                        {img && <img src={img} alt='' style={{width: '200px', height: '150px'}}/>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isPending ? 'Updating' : 'Update Product'}
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    )
}