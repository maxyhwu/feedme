import React from 'react';
import { Navigate} from "react-router-dom";
import {UseLoginContext} from '../Context/LoginCnt'


export default function ProtectedRoutes ({ children }) {
    const {login} = UseLoginContext();
    const authed = login
    
    return authed ? children : <Navigate to="/login" />;
  }