import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { toast } from 'react-toastify';

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: async(values, action) => {
        const res = await fetch('http://localhost:5000/signin', {
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        })
    
        const data = res.json();
    
        if (res.status === 400 || !data) {
          toast.error("Invalid Credential");
        } else {
          toast.success("Login successfull");
          navigate("/");
        }
    
        action.resetForm();
      },
    });
  console.log(errors);


  return (
    <div className="py-14">
      <h1 className="text-2xl font-extrabold text-center p-5">Sign In</h1>

      {/* <====== Login Form ===========> */}
      <form method='POST' onSubmit={handleSubmit} className='flex justify-center items-center gap-5'>
        <div className='border-2 rounded-xl p-5 flex flex-col gap-5 shadow-lg w-[700px]'>

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className='w-full'
            name='email'
            autoComplete='off'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name='password'
            className='w-full'
            autoComplete='off'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />


          <Button type='submit' variant="contained">Sign In</Button>

          <div className='text-center font-semibold'>Don't have an account <Link to="/register" className="text-blue-500">Register</Link></div>
        </div>
      </form>

    </div>
  )
}

export default Login