import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Authdata,logoutdata} from './authSlice'
import { Navigate } from 'react-router-dom'

export default function Logoutt() {
  
    const { loginUser } = useSelector(Authdata);
    const dispatch = useDispatch();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (loginUser || token) {
            dispatch(logoutdata());
        }
    }, [dispatch, loginUser]);

    // / Redirect to home page after logout
    return <Navigate to={'/'} replace={true} />;
}
