import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AddAddressApi,getAddressApi, removeAddressApi} from './checkoutApi'

export const fetchAddaddress = createAsyncThunk(
    'address/addaddress',
    async (data,{rejectWithValue}) => {

        try{

            const response = await AddAddressApi(data)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchgetaddress = createAsyncThunk(
    'address/getaddress',
    async (userid,{rejectWithValue}) => {

        try{

            const response = await getAddressApi(userid)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

  export const fetchremoveShippingaddress = createAsyncThunk(
    'address/removeShipingaddress',
    async (person,{rejectWithValue}) => {

        try{

            const response = await removeAddressApi(person)
            return response.data

        }catch(error){
            return rejectWithValue(error.message)

        }
    },
  )

const initialState = {
     address: [],
     loading:false,
     error:false,
     errmsg:null
    }

const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    }, 
  },
  extraReducers: (builder) => {
    
    builder.addCase(fetchAddaddress.pending, (state) => {
        
        state.loading = true
    })
    builder.addCase(fetchAddaddress.fulfilled, (state, action) => {
        
           state.loading = false
           state.error = false
           state.address.push(action.payload)
      })
    builder.addCase(fetchAddaddress.rejected, (state, action) => {
    
        state.loading = false
        state.error = true
        state.errmsg = action.payload
    })
    builder.addCase(fetchgetaddress.fulfilled, (state, action) => {
    
        state.loading = false
        state.error = false
        state.address = action.payload
    })
   
    builder.addCase(fetchremoveShippingaddress.fulfilled, (state, action) => {
    
        state.loading = false
        state.error = false
        let index = state.address.findIndex(el => el._id === action.payload._id)
        state.address.splice(index,1)
    })
  },
})

export const { increment} = addressSlice.actions
export const addressdata = state => state.addresses
export default addressSlice.reducer