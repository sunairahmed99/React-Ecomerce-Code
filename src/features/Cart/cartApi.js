import axios from 'axios'

export async function addtocartApi(item){


        const response = await axios.post('/carts/addcart',item)
        return response
}

export async function getcartApi(userid){


        const response = await axios.get(`/carts/getcart?userid=${userid}`)

    return response.data

    
}

export async function updatecartApi(item){

    const response = await axios.patch(`/carts/updateCart/${item.id}`,item)
  
    return response.data
}

export async function deletecartApi(item){
    const response = await axios.delete(`/carts/delcart/${item.id}`)
    return response.data
}

export async function deleteallcartdataafterorderApi(id){

    const {data} = await axios.get(`/carts/getcart?userid=${id}`,)

    let datas = data.data


    for( let items of datas){

        if(items){

            await axios.delete(`/carts/delcart/${items.id}`)

        }
    }
    return ({status:'success'})
}


