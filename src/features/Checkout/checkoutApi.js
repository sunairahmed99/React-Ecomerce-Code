import axios from 'axios';

export async function AddAddressApi(data){

    const response = await axios.post('/address/add',data)
    return response.data
}

export async function getAddressApi(userid){

    const response = await axios.get(`/address/get?userid=${userid}`)

    return response.data
}

export async function removeAddressApi(person){


    const response = await axios.delete(`/address/del/${person._id}`)
    return response.data
}



