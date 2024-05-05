import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchproductApi, resetfilterApi } from './productApi'

export const fetchProduct = createAsyncThunk(
    'product/fetch',
    async ({filter,sort,remov},{rejectWithValue}) => {
        try{

            const response = await fetchproductApi({filter,sort})
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchresetfilterProduct = createAsyncThunk(
    'product/fetchreset',
    async (_,{rejectWithValue}) => {
        try{

            const response = await resetfilterApi()
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )  

  

const initialState = {
     product: [],
     loading:false,
     error:false,
     errmsg:null,
    } 

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProduct.pending, (state) => {
      state.loading = true
    })
    .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.product = action.payload
      })
    .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.errmsg = action.payload
    })
    .addCase(fetchresetfilterProduct.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      state.product = action.payload
  })
  },
})

export const { increment} = productSlice.actions
export const allproduct = state => state.products
export default productSlice.reducer