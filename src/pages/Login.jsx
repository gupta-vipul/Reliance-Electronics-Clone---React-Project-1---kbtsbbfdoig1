import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { USER_LOGIN_API } from '../Constants/APIs';
import { AuthContext } from '../Context/AuthContext';
import Toast from '../components/Toast/Toast';

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
            required: true,
        },
        {
            id: "password",
            name: "password",
            label: "Enter Password",
            type: "password",
            size: "small",
            fullWidth: true,
            helperText: "",
            required: true,
        }
    ];
    const [loginCredentials, setLoginCredentails] = useState({
        email : "",
        password : "",
        appType : "ecommerce"
    });
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("info");
    const navigate = useNavigate();

    async function userLogin(userData) {
        try{
            const response = await fetch(USER_LOGIN_API, {
                method: 'POST',
                headers: { 'projectID' : 'kbtsbbfdoig1', "Content-Type": "application/json",},
                body: JSON.stringify(userData),
            });
            const jsonData = await response.json();
            if(jsonData.status === "success") {
                setOpen(true);
                setSeverity("success");
                setMessage(jsonData.message);
                localStorage.setItem('token', jsonData.token);
                delete jsonData['token'];
                navigate("/");
                setIsLoggedIn(true);
            }else {
                setSeverity('error');
                setMessage(jsonData.message);
                setOpen(true);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    function handleSnackbarClose(e, reason) {
        if(reason === 'clickaway') {
            return;
        }
        setOpen(false);
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
        <Toast 
            open={open}
            duration={5000}
            onClose={handleSnackbarClose}
            severity={severity}
            message={message}
        />
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
                                required={formItem.required}
                            />
                        )
                    })
                }
                <Button sx={{backgroundColor: 'var(--primary-color)'}} variant="contained" type='submit' fullWidth>PROCEED</Button>
                <div className='register-new-user'>Don't have an account? <Link to="/register">Register</Link></div>
            </form>
        </div>
    </div>
  )
}

export default Login;