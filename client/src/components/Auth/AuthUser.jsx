import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

export default function AuthUser({children}) {
    const navigate = useNavigate();
    if(localStorage.getItem('loggedin') !== 'true'){
        navigate('/login');
      }
  return (
    <div>{children}</div>
  )
}
