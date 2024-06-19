import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/Instance";
import { toast } from "react-toastify";


export const fetchProductDetails = createAsyncThunk('fetchProductDetail', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get(`edit/product/${id}`)
        console.log(res?.data);
        return res?.data
    } catch (error) {
        console.log(error);
        return error?.response?.data
    }
})

export const updateSingle = async (payload) => {
    try {
        const res = await axiosInstance.post(`update/product/${payload.id}`, payload.formdata)
        console.log(res?.data);
        if(res?.data?.status){
            toast.success(res?.data?.message)
        }
        return res?.data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
        return error?.response?.data
    }
}

export const Updateproductslice = createSlice({
    name: 'Updateproductslice',
    initialState: {
        status: 'idle',
        singleData: [],

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetails.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.status = 'successfull'
                state.singleData = action.payload
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.status = 'rejected'
                state.singleData = action.payload
            })
    }
})