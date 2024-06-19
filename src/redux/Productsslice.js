import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/Instance";


export const FetchProducts = createAsyncThunk ('fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get(`product`)
        console.log(res?.data);
        return res?.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data)
    }
})

export const RemoveProduct = async (payload) => {
    try {
        const res = await axiosInstance.delete(`delete/product/${payload}`)
        console.log(res?.data);
        return res?.data
    } catch (error) {
        console.log(error);
        return error?.response?.data
    }
}

export const createProduct = async (payload) => {
    try {
        const res = await axiosInstance.post(`create/product`, payload)
        console.log(res?.data);
        return res?.data
    } catch (error) {
        console.log(error);
        return error?.response?.data
    }
}

export const ProductsSlice = createSlice({
    name: 'ProductsSlice',
    initialState: {
        status: 'idle',
        allProductsResponse: []
    },
     reducers : {},
     extraReducers: (builder) => {
        builder
            .addCase(FetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(FetchProducts.fulfilled, (state, action) => {
                state.status = 'success'
                state.allProductsResponse = action.payload
            })
            .addCase(FetchProducts.rejected, (state,action) => {
                state.status = 'rejected'
                state.allProductsResponse = action.payload
            })
     }
})