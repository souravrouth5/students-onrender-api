import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../redux/Productsslice';

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


export function Addproducts() {

    const {register, handleSubmit, formState: {errors}} = useForm()

    const {isPending, mutate, data} = useMutation({
        mutationFn: (payload) => createProduct(payload)
    })

    const onSubmit = () => {
        const formdata = new FormData(document.getElementsByTagName('form')[0])
        mutate(formdata)
    }

    console.log(data);

    return (
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
                            {...register('name', { required: true})}
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
                            id="price"
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
                            id="email"
                            name="email"
                            {...register('image', { required: true })}
                        />
                        {errors.image?.type === 'required' && <span>@image is required</span>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isPending ? 'Adding' : 'Add Product'}
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    )
}

