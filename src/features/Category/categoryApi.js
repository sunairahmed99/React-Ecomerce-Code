import axios from 'axios';


export async function CategoryApi(){

    const response = await axios.get('/category')
    return response.data
}