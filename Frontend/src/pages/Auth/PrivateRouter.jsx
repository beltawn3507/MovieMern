import React from 'react'
import {Navigate,Outlet,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';


const PrivateRouter = () => {
 const {userInfo} = useSelector((state)=>state.auth);
 const location = useLocation();
 return userInfo ? <Outlet /> : <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace/>
}

export default PrivateRouter
