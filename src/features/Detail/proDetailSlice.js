import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProductSingleApi } from './proDetailApi'

export const fetchSingleProduct = createAsyncThunk(
    'product/Singlefetch',
    async (id,{rejectWithValue}) => {
        try{

            const response = await ProductSingleApi(id)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

const initialState = {
     Singleproduct: [],
     loading:false,
     error:false,
     errmsg:null,
    } 

const SingleproductSlice = createSlice({
  name: 'Singleproducts',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchSingleProduct.pending, (state) => {
      state.loading = true
    })
    .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.Singleproduct = action.payload
      })
    .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.errmsg = action.payload
    })
  },
})

export const { increment} = SingleproductSlice.actions
export const allSingleproduct = state => state.Singleproducts
export default SingleproductSlice.reducer