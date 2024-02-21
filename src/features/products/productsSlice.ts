import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/index'
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts', // Action type prefix
  async () => {
    const response = await fetch('http://localhost:5173/products');
    if (!response.ok){
      throw new Error('Failed to fetch products')
    }
    const data = response.json()
    return data as unknown as ProductType[]
  }
);

// Define a type for the slice state
interface ProductType {
    sku: string,
    name: string,
    price: number
}

interface ProductsState {
  products: ProductType[];
  loading: boolean;
  error: string | null;
}
// Define the initial state using that type
const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null
}

export const productsSlice = createSlice({ 
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state,action: PayloadAction<ProductType[]>) => { // our actions
      state.products = action.payload
    }
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch products';
      });
  },
})

export const { setProducts} = productsSlice.actions

// selector function
export const selectProducts = (state: RootState) => state.products.products

export default productsSlice.reducer