import axios from 'axios';

export async function RegisterPostApi(data){

    const response = await axios.post('/users/register',data)
    return response.data

}

export async function LoginPostApi(data){
    

    const response = await axios.post(`/users/login`,data)

       return response.data
}

export async function getuserApi(){
    
    let token = localStorage.getItem('token');

    const response = await axios.get('/users/getuser',{
        headers: {
            Authorization: `Bearer ${token}`
          }
    })
    
    return response.data.data
}

export async function forgotpasswordApi(data){
    

    const response = await axios.post('/users/forgot/password/',data)
    
    return response.data
}

export async function resetpasswordApi({restoken,data}){
    

    const response = await axios.patch(`/users/reset/password/${restoken}`,data)
    console.log(response.data)
    
    return response.data
}


