import React from 'react'
import { useSelector } from 'react-redux'
import { Authdata} from './Auth/authSlice'
import { Navigate } from 'react-router-dom'

export default function Protect({children}) {
    let {loginUser} = useSelector(Authdata)    

    if(loginUser){
        return children
    }
    else{
        return(
            
             <Navigate to={'/login/page'} replace={true}></Navigate>
            
        ) 
    }
}
