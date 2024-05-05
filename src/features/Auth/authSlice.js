import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginPostApi, RegisterPostApi, forgotpasswordApi, getuserApi, resetpasswordApi} from './authApi'

export const RegisterPost = createAsyncThunk(
    'users/registerpost',
    async (data,{rejectWithValue}) => {
        try{

            const response = await RegisterPostApi(data)
            let token = response.token
            if(token){

              localStorage.setItem('token',token)
              return response.data

            }
        }catch(error){
            return rejectWithValue(error.response.data.message)
        }
    },
  )

  export const LoginPost = createAsyncThunk(
    'users/loginpost',
    async (data,{rejectWithValue}) => {
        try{

            const response = await LoginPostApi(data) 
            let token = response.token
            if(token){

              localStorage.setItem('token',token)
            
              return response.data

            }
        }catch(error){
          console.log(error.response)
            return rejectWithValue(error.response.data.message)
        }
    },
  )

  export const fetchgetUser = createAsyncThunk(
    'users/getuser',
    async (_,{rejectWithValue}) => {
        try{


          const response = await getuserApi()
          return response

        }catch(error){

            localStorage.removeItem('token')
            return rejectWithValue(error.message)
        }
    },
  )

  export const fetchforgotpassword = createAsyncThunk(
    'users/forgotpassword',
    async (data,{rejectWithValue}) => {
        try{


          const response = await forgotpasswordApi(data)
          console.log(response.message)
          return response

        }catch(error){

            localStorage.removeItem('token')
            console.log(error.response.data.message)
            return rejectWithValue(error.response.data.message)
        }
    },
  )

  export const fetchresetpassword = createAsyncThunk(
    'users/resetpassword',
    async ({restoken,data},{rejectWithValue}) => {
        try{


          const response = await resetpasswordApi({restoken,data})
          localStorage.setItem('token',response.tokenn)
          console.log(response.token)
          console.log(response.data)
        
          return response.data

        }catch(error){

            localStorage.removeItem('token')
            return rejectWithValue(error.message)
        }
    },
  )

 

const initialState = { 
    loginUser:null,
    loginloading:false,
    loginerror:false,
    loginerrmsg:null
} 


const authSlice = createSlice({
  name: 'AuthUser',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    logoutdata(state){
      state.loginUser = null;
      localStorage.removeItem('token')
    }
  },
  extraReducers: (builder) => {
    // / Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(RegisterPost.pending, (state) => {
      state.loginloading = true
    })
    .addCase(RegisterPost.fulfilled, (state, action) => {
        state.loginloading = false
        state.loginerror = false
        state.loginUser = action.payload
      })
    .addCase(RegisterPost.rejected, (state, action) => {
        state.loginloading = false
        state.loginerror = true
        state.loginerrmsg = action.payload
    })
    .addCase(LoginPost.pending, (state) => {
        state.loginloading = true
      })
    .addCase(LoginPost.fulfilled, (state, action) => {
        state.loginloading = false
        state.loginerror = false
        state.loginUser = action.payload
    })
    .addCase(LoginPost.rejected, (state, action) => {
        state.loginloading = false
        state.loginerror = true
        state.loginerrmsg = action.payload
    })
    .addCase(fetchgetUser.fulfilled, (state, action) => {
      state.loginloading = false
      state.loginerror = false
      state.loginUser = action.payload
  })
  .addCase(fetchforgotpassword.fulfilled, (state, action) => {
    state.loginloading = false
    state.loginerror = false
    state.loginUser = action.payload
})
.addCase(fetchforgotpassword.rejected, (state, action) => {
  state.loginloading = false
  state.loginerror = true
  state.loginerrmsg = action.payload
})
.addCase(fetchresetpassword.fulfilled, (state, action) => {
  state.loginloading = false
  state.loginerror = false
  state.loginUser = action.payload
})
 
  },
})

export const { increment, logoutdata} = authSlice.actions
export const Authdata = state => state.AuthUser
export default authSlice.reducer