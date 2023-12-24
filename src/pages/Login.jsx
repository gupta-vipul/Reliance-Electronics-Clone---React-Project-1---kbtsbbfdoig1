import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { USER_LOGIN_API } from '../Constants/APIs';
import { AuthContext } from '../Context/AuthContext';

function Login() {
    const loginFormData = [
        {
            id: "email",
            name: "email",
            label: "Enter Email Address",
            type: "email",
            size: "small",
            fullWidth: true,
            helperText: "",
        },
        {
            id: "password",
            name: "password",
            label: "Enter Password",
            type: "password",
            size: "small",
            fullWidth: true,
            helperText: "",
        }
    ];
    const [loginCredentials, setLoginCredentails] = useState({
        email : "",
        password : "",
        appType : "ecommerce"
    });
    const navigate = useNavigate();
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    async function userLogin(userData) {
        try{
            const response = await fetch(USER_LOGIN_API, {
                method: 'POST',
                headers: { 'projectID' : 'kbtsbbfdoig1', "Content-Type": "application/json",},
                body: JSON.stringify(userData),
            });
            const jsonData = await response.json();
            localStorage.setItem('token', jsonData.token);
            delete jsonData['token'];
            navigate("/");
            setIsLoggedIn(true);
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')) {
            navigate('/');
        }
    },[])
    function handleSubmit(e) {
        e.preventDefault();
        const updatedLoginCredentails = {...loginCredentials};
        const formData = new FormData(e.currentTarget);
        formData.forEach((value, key)=>{
            updatedLoginCredentails[key] = value;
        })
        userLogin(updatedLoginCredentails);
    }
  return (
    <div className="login-container">
        <img src="LoginWebBanner.jpeg" alt="Login-placeholder-banner" />
        <div className='login-form-container'>
            <h3>Login</h3>
            <form className='login-form' onSubmit={handleSubmit}>
                {
                    loginFormData.map((formItem)=>{
                        return (
                            <TextField 
                                key={formItem.id}
                                id={formItem.id}
                                name={formItem.name}
                                type={formItem.type}
                                label={formItem.label}
                                size={formItem.size}
                                helperText={formItem.helperText}
                                fullWidth={formItem.fullWidth}
                            />
                        )
                    })
                }
                <Button sx={{backgroundColor: 'var(--primary-color)'}} variant="contained" type='submit' fullWidth>PROCEED</Button>
                <div className='register-new-user'>New User: <Link to="/register">Register New Account</Link></div>
            </form>
        </div>
    </div>
  )
}

export default Login;