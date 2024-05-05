import axios from 'axios';

export async function fetchproductApi({filter,sort}){

   
    let querystring = ''

    for(let key in filter){
        
        let category = filter[key]
        
        if(category.length){
            let lastcat = category[category.length -1]
            querystring = querystring + `${key}=${lastcat}&` 
        }
        else{
            querystring =''
        }
    }


    for(let key in sort){
        
        querystring = querystring + `${key}=${sort[key]}&`

    }

    const response = await axios.get('/products/?'+querystring)
    return response.data
}

export async function resetfilterApi(){

    const response = await axios.get('/products/')
    return response.data
}