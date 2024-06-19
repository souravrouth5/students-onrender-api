import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from '../../redux/Authslice';

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export function Register() {

    const dispatch = useDispatch()
    const { status, registerResponse } = useSelector(state => state.auth)
    const {register, handleSubmit, formState:{errors}} = useForm()

    console.log(registerResponse);

    const onSubmit = () => {
        const formdata = new FormData(document.getElementsByTagName('form')[0])
        dispatch(RegisterUser(formdata))
    }

    return (
        <ThemeProvider theme={defaultTheme}>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
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
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            {...register('email', {required: true})}
                        />
                        {errors.email?.type === 'required' && <span>@Email is required</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="mobile"
                            label="Mobile"
                            name="mobile"
                            autoComplete="mobile"
                            autoFocus
                            {...register('mobile', { required: true })}
                        />
                        {errors.mobile?.type === 'required' && <span>@Mobile is required</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="first_school"
                            label="first_school"
                            name="first_school"
                            autoComplete="first_school"
                            autoFocus
                            {...register('first_school', { required: true })}
                        />
                        {errors.first_school?.type === 'required' && <span>@First_school is required</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type='file'
                            id="image"
                            label="image"
                            name="image"
                            {...register('image', { required: true })}
                        />
                        {errors.image?.type === 'required' && <span>@Image is required</span>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {status !== 'loading' ? 'Register' : 'Loading...'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    {"Already have an account ? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}