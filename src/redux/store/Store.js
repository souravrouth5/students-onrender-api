import { configureStore } from "@reduxjs/toolkit";
import { Authslice } from "../Authslice";
import { ProductsSlice } from "../Productsslice";
import { Updateproductslice } from "../Updateproductslice";


export const Store = configureStore({
    reducer: {
        auth: Authslice.reducer,
        products: ProductsSlice.reducer,
        update: Updateproductslice.reducer,
    }
})