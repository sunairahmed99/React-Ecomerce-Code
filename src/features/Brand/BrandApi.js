import axios from 'axios';


export async function BrandApi(){

    const response = await axios.get('/brand')
    return response.data
}