import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

function IsAuth(Component) {

  return (props)=>{
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token'));
    return isAuthenticated ? (<Component {...props} />) : (<Navigate to="/login" />)
  }
}

export default IsAuth;