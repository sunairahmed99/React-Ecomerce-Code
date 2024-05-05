import React, { useEffect } from 'react'
import { Authdata } from './Auth/authSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
let token = localStorage.getItem('token')

export default function AdminProtect({children}) {    
    let {loginUser} = useSelector(Authdata)

   
    useEffect(()=>{

        if(!token){
            window.location.reload()
        }

    },[])


    

    if(loginUser && loginUser.role ==='admin'){
        return children
        
    }
    else{
        return <Navigate to={'/login/page'}></Navigate>
    }
  
}
