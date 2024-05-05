import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addtocartApi, deleteallcartdataafterorderApi, deletecartApi, getcartApi, updatecartApi } from './cartApi'


export const fetchAddCart = createAsyncThunk(
    'cart/addcart',
    async (item,{rejectWithValue}) => {

        try{

            const response = await addtocartApi(item)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchgetCart = createAsyncThunk(
    'cart/getcart',
    async (userid,{rejectWithValue}) => {

        try{

            const response = await getcartApi(userid)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchUpdateCart = createAsyncThunk(
    'cart/updatecart',
    async (item,{rejectWithValue}) => {

        try{

            const response = await updatecartApi(item)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchdelCart = createAsyncThunk(
    'cart/delcart',
    async (item,{rejectWithValue}) => {

        try{

            const response = await deletecartApi(item)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchdelAllCartdataafterorder = createAsyncThunk(
    'cart/delallcartdata',
    async (id,{rejectWithValue}) => {

        try{

            const response = await deleteallcartdataafterorderApi(id)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

const initialState = {
     Cart: [],
     loading:false,
     error:false,
     errmsg:null
    } 

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
  },
  extraReducers: (builder) => {
    // / Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(fetchAddCart.pending, (state, action) => {
      state.loading = true
    })
    .addCase(fetchAddCart.fulfilled, (state, action) => {

        state.loading = false
        state.error = false
        state.Cart.push(action.payload)
      })
    .addCase(fetchAddCart.rejected, (state, action) => {

        state.loading = false
        state.error = true
        state.errmsg = action.payload
    })
    .addCase(fetchgetCart.pending, (state, action) => {
        state.loading = true
      })
    .addCase(fetchgetCart.fulfilled, (state, action) => {

        state.loading = false
        state.error = false
        state.Cart = action.payload
    })
    .addCase(fetchgetCart.rejected, (state, action) => {

        state.loading = false
        state.error = true
        state.errmsg = action.payload
    })
    .addCase(fetchUpdateCart.fulfilled, (state, action) => {

      let index = state.Cart.findIndex(el => el.id === action.payload.id)

      state.loading = false
      state.error = false
      state.Cart[index] = action.payload
  })
  .addCase(fetchdelCart.fulfilled, (state, action) => {

    let index = state.Cart.findIndex(el => el.id === action.payload.id)

    state.loading = false
    state.error = false
    state.Cart.splice(index,1)
})
.addCase(fetchdelAllCartdataafterorder.fulfilled, (state, action) => {

  state.loading = false
  state.error = false
  state.Cart = action.payload
  state.Cart =[]
})
  },
})

export const { increment,} = cartSlice.actions
export const allcartdata = state => state.carts
export default cartSlice.reducer