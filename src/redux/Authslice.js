import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/Instance";
import { toast } from "react-toastify";

export const RegisterUser = createAsyncThunk('registerUser', async (payload, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post(`register`, payload)
        console.log(res?.data);
        if(res?.data?.status) {
            toast.success(res?.data?.message)
        } else {
            toast.error(res?.data?.message)
        }
        return res?.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
        toast.error(error?.response?.data?.msg)
        return rejectWithValue(error?.response?.data)
    }
})

export const LoginUser = createAsyncThunk('loginUser', async (payload, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post(`login`, payload)
        console.log(res?.data);
        return res?.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data)
    }
})

export const Authslice = createSlice({
    name: 'Authslice',
    initialState: {
        status: 'idle',
        registerResponse: [],
        loginResponse: [],
        isLoggedIn: false
    },
    reducers : {
        logout: (state) => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')

            if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('user'))) {
                toast.error('something went wrong')
            } else {
                toast.success('Logged out successfully')
                state.isLoggedIn = false
            }
        },

        checkToken: (state) => {
            if (localStorage.getItem('token') || JSON.parse(localStorage.getItem('user'))){
                state.isLoggedIn = true
            } else {
                state.isLoggedIn = false
            }
        }
    },
     extraReducers: (builder) => {
        builder
            .addCase(RegisterUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(RegisterUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.registerResponse = action.payload
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                state.status = 'rejected'
                state.registerResponse = action.payload
            })
            .addCase(LoginUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.loginResponse = action.payload
                if(action.payload?.status){
                    toast.success(action.payload?.message)
                    localStorage.setItem('token', action.payload?.token)
                    localStorage.setItem('user', JSON.stringify(action.payload?.user))
                    state.isLoggedIn = true
                } else {
                    toast.error(action.payload?.message)
                }
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.status = 'rejected'
                state.loginResponse = action.payload
                toast.error(action.payload?.message)
            })
     }
})

export const {logout, checkToken} = Authslice.actions