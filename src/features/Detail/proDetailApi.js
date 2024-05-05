import axios from 'axios';


export async function ProductSingleApi(id){

    const response = await axios.get('/products?_id='+id)
    return response.data
}