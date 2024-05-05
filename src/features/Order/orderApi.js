import axios from 'axios';
let token = localStorage.getItem('token')

export async function AddOrderApi(data){

    const response = await axios.post('/order/add',data)
    return response.data
}

export async function getOrderApi(id){

    const response = await axios.get(`/order/get?userid=${id}`)

    return response.data
}

export async function getOrderApiToken(token){

    const response = await axios.get(`/order/getToken/${token}`)

    return response.data
}

export async function getallOrderApi(){


    const response = await axios.get(`/admin/getorder`,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    console.log(response)
    return response.data
}

export async function patchOrderApi(item){

    const response = await axios.patch(`/admin/updateord/${item._id}`,item,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export async function delorderApi(code){
    

    const response = await axios.delete(`/order/delorder/${code._id}`)

    return response.data
}

