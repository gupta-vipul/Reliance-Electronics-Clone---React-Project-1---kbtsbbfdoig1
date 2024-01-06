import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { USER_SIGNUP_API } from '../Constants/APIs';
import { AuthContext } from '../Context/AuthContext';
import Toast from '../components/Toast/Toast';

function Register() {
  const navigate = useNavigate();
  const {setIsLoggedIn} = useContext(AuthContext);
  const [registrationData, setregistrationData] = useState({
    "firstname" : "",
    "lastname" : "",
    "email" : "",
    "password" : "",
    "appType" : "ecommerce"
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const registerForm = [
    {
      id: "firstname",
      name: "firstname",
      type: "text",
      label: "Enter First Name",
      size: 'small',
      helperText: "",
      required: true
    },
    {
      id: "lastname",
      name: "lastname",
      type: "text",
      label: "Enter Last Name",
      size: 'small',
      helperText: "",
      required: true
    },
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Enter Email Address",
      size: 'small',
      helperText: "Your email address will be used to send order invoice, order updates etc.",
      required: true
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Enter Password",
      size: 'small',
      helperText: "",
      required: true
    },
    {
      id: "mobile",
      name: "mobile",
      type: "number",
      label: "Enter Mobile Number",
      size: 'small',
      helperText: "Mobile verification feature is inactive[As per requirement.]",
      required: false,
      disabled: true
    }

  ];
  function handleSubmit(e) {
    e.preventDefault();
    const updatedRegistrationData = {...registrationData};
    const formData = new FormData(e.currentTarget);
    formData.forEach((value,key)=>{
      updatedRegistrationData[key] = value;
    })
    setregistrationData(updatedRegistrationData);
    registerNewUser(updatedRegistrationData);
  }
  function handleSnackbarClose(e, reason) {
    if(reason === 'clickaway') {
        return;
    }
    setOpen(false);
  }
  async function registerNewUser(data) {
    try{
      const response = await fetch(USER_SIGNUP_API, {
      method: 'POST',
      headers: { 'projectID' : 'kbtsbbfdoig1', "Content-Type": "application/json",},
      body: JSON.stringify({...data, name: data.firstname}),
      })
      const jsonData = await response.json();
      if(jsonData.status === "success"){
        localStorage.setItem("token", jsonData.token);
        delete jsonData['token'];
        localStorage.setItem('userInfo', JSON.stringify(jsonData.data.user));
        setIsLoggedIn(true);
        navigate("/");
      }
      else if(jsonData.status === "fail"){
        setOpen(true);
        setMessage(jsonData.message);
        setSeverity('error');
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('token')) {
      navigate("/");
    }
  },[])

  return (
    <div className='register'>
      <Toast 
          open={open}
          duration={5000}
          onClose={handleSnackbarClose}
          severity={severity}
          message={message}
        />
        <div className='register-form-container'>
          <h3>Register New Account</h3>
          <form className='register-form' onSubmit={handleSubmit}>
            {
              registerForm.map((formItem)=>{
                return (
                  <TextField 
                    key={formItem.id}
                    id={formItem.id}
                    name={formItem.name}
                    label={formItem.label}
                    size={formItem.size}
                    type={formItem.type}
                    helperText={formItem.helperText}
                    required={formItem.required}
                    disabled={formItem.disabled}
                  />
                )
              })
            }
            <Button sx={{backgroundColor: 'var(--primary-color)'}} variant="contained" type='submit' fullWidth>PROCEED</Button>
            <div className='already-register-user'>Already Registered? <Link to="/login">LOGIN</Link></div>
          </form>
        </div>
    </div>
  )
}

export default Register;