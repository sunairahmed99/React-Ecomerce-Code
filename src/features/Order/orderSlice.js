import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AddOrderApi, delorderApi, getOrderApi, getOrderApiToken, getallOrderApi, patchOrderApi } from './orderApi'


export const fetchAddOrder = createAsyncThunk(
    'order/fetchadd',
    async (data,{rejectWithValue}) => {
        try{

            const response = await AddOrderApi(data)
            return response

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchgetOrder = createAsyncThunk(
    'order/fetchget',
    async (id,{rejectWithValue}) => {
        try{

            const response = await getOrderApi(id)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchgetOrderToken = createAsyncThunk(
    'order/fetchgetToken',
    async (token,{rejectWithValue}) => {
        try{

            const response = await getOrderApiToken(token)
            console.log(response.data)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchgetallOrder = createAsyncThunk(
    'order/fetchgetall',
    async (_,{rejectWithValue}) => {
        try{
            console.log("helloooooo")
            const response = await getallOrderApi()
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchpatchOrder = createAsyncThunk(
    'order/fetchpatch',
    async (item,{rejectWithValue}) => {
        try{

            const response = await patchOrderApi(item)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchdelOrder = createAsyncThunk(
    'order/fetchdel',
    async (code,{rejectWithValue}) => {
        try{

            const response = await delorderApi(code)
            console.log('sliceeeeeeeeeee',response.data)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )




const initialState = {
     Order: [],
     loading:false,
     error:false,
     errmsg:null
    }

const counterSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
  },
  extraReducers: (builder) => {
    
    builder
    .addCase(fetchAddOrder.pending, (state) => {
      state.loading = true
    })
    .addCase(fetchAddOrder.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.Order = action.payload
      })
    .addCase(fetchAddOrder.rejected, (state, action) => {
       state.loading = false
       state.error = true
       state.errmsg = action.payload
    })
     .addCase(fetchgetOrder.fulfilled, (state, action) => {
       state.loading = false
       state.error = false
       state.Order = action.payload
    })
    .addCase(fetchgetOrderToken.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      state.Order = action.payload
   })
    .addCase(fetchdelOrder.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      let index = state.Order.findIndex(el => el.ordercode === action.payload.ordercode)
      console.log(index)
      state.Order.splice(index,1)
   })
   .addCase(fetchgetallOrder.fulfilled, (state, action) => {
    state.loading = false
    state.error = false
    state.Order = action.payload
  })
  .addCase(fetchpatchOrder.fulfilled, (state, action) => {
    state.loading = false
    state.error = false
    let index = state.Order.findIndex(el => el.id === action.payload.id)
    state.Order[index] = action.payload
  })
  },
})

export const { increment} = counterSlice.actions
export const orderdata = state => state.orders
export default counterSlice.reducer