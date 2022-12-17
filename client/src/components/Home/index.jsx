import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  useEffect(()=> {
    if(localStorage.getItem('loggedin') !== 'true'){
      window.location.href = "/login";
    }
  }, []);
  const logout = () => {
    localStorage.setItem('loggedin', 'false');
    localStorage.setItem('user', '');
    window.location.href = "/login";
  }
  return (
    <div>Home sdjkflkdsjf
      <button onClick = {()=>{logout()}}>Logout</button>
    </div>
    
  )
}
