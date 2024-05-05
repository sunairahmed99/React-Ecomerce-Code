import axios from 'axios';
let token = localStorage.getItem('token')

export async function fetchproductApi({filter,sort}){

    let querystring = ''

    for(let key in filter){
        
        let category = filter[key]
        
        console.log(category.length)

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

    const response = await axios.get('http:/localhost:8000/products')
    return response
}

export async function geteditproductApi(id){
    console.log(id)

    const response = await axios.get(`/products/?_id=${id}`,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export async function patchproductApi(item){
    console.log(item)

    const response = await axios.patch(`/admin/updateproduct/${item.id}`,item,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return response
}

export async function addproductApi(item){

    const response = await axios.post(`/admin/addproduct`,item,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    console.log(response.data)
    return response.data
}

export async function getproductApi(){

    const response = await axios.get(`/admin/getpro`,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}


