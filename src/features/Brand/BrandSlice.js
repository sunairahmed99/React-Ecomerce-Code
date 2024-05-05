import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BrandApi } from './BrandApi'

export const fetchBrand = createAsyncThunk(
    'brand/fetch',
    async (_,{rejectWithValue}) => {
        try{

            const response = await BrandApi()
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

const initialState = {
     brand: [],
    } 

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchBrand.fulfilled, (state, action) => {
        state.brand = action.payload
      })
  },
})

export const { increment} = brandSlice.actions
export const allbrand = state => state.brands
export default brandSlice.reducer