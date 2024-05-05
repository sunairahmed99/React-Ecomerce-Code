import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addproductApi, fetchproductApi, geteditproductApi, getproductApi, patchproductApi, resetfilterApi } from './adminProductApi'



export const fetchProduct = createAsyncThunk(
    'product/fetch',
    async ({filter,sort},{rejectWithValue}) => {
        try{

            const response = await fetchproductApi({filter,sort})
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchgetProduct = createAsyncThunk(
    'product/getfetch',
    async (_,{rejectWithValue}) => {
        try{

            const response = await getproductApi()
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

  export const fetchgeteditproduct = createAsyncThunk(
    'product/fetchgeteditproduct',
    async (id,{rejectWithValue}) => {
        try{

            const response = await geteditproductApi(id)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  ) 

  export const fetchpatchproduct = createAsyncThunk(
    'product/fetchpatchproduct',
    async (item,{rejectWithValue}) => {
        try{

            const response = await patchproductApi(item)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  ) 

  export const fetchaddproduct = createAsyncThunk(
    'product/fetchaddproduct',
    async (item,{rejectWithValue}) => {
        try{

            const response = await addproductApi(item)
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

const AdminproductSlice = createSlice({
  name: 'Adminproducts',
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
  .addCase(fetchgeteditproduct.fulfilled, (state, action) => {
    state.loading = false
    state.error = false
    state.product = action.payload
  })
  .addCase(fetchpatchproduct.fulfilled, (state, action) => {
    state.loading = false
    state.error = false
    state.product.push(action.payload)
  })
  .addCase(fetchaddproduct.fulfilled, (state, action) => {
    state.loading = false
    state.error = false
    state.product.push(action.payload)
  })
  .addCase(fetchgetProduct.fulfilled, (state, action) => {
    state.loading = false
    state.error = false
    state.product = action.payload
  })
  },
})

export const { increment} = AdminproductSlice.actions
export const Adminallproduct = state => state.Adminproducts
export default AdminproductSlice.reducer