import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CategoryApi } from './categoryApi'

export const fetchCategory = createAsyncThunk(
    'category/fetch',
    async (_,{rejectWithValue}) => {
        try{

            const response = await CategoryApi()
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

const initialState = {
     category: [],
     catloading:false,
     caterror:false,
     caterrmsg:null,
    } 

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCategory.pending, (state) => {
      state.catloading = true
    })
    .addCase(fetchCategory.fulfilled, (state, action) => {
        state.catloading = false
        state.caterror = false
        state.category = action.payload
      })
    .addCase(fetchCategory.rejected, (state, action) => {
        state.catloading = false
        state.caterror = true
        state.caterrmsg = action.payload
    })
  },
})

export const { increment} = categorySlice.actions
export const allcategories = state => state.categories
export default categorySlice.reducer