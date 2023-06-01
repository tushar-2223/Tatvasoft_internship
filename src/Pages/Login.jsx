import React, { useState ,useContext, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import axios from 'axios';
import Contextpage from '../ContextPage';

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {

  const { LoadinContainer,setLogindata } = useContext(Contextpage)
  
  useEffect(() => {
    LoadinContainer();
  }, []);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: async(values, action) => {

        var config = {
          method: 'POST',
          maxBodyLength: Infinity,
          url: 'https://book-e-sell-node-api.vercel.app/api/user/login',
          headers: {"Content-Type": "application/json" },
          data : JSON.stringify(values)
        };
        
        axios(config)
        .then(function () {
          toast.success("Login successfull");
          setLogindata(values);          
        })
        .catch(function (error) {
          toast.error(error);
        });
    
        action.resetForm();
      },
    });
  // console.log(errors);


  return (
    <div className="py-8">
         <div className="flex justify-center flex-col items-center p-4">
                <h1 className="text-4xl font-bold text-center p-3">Login or Create an Account</h1>
                <div className="w-40 h-1 bg-red-400 rounded-full"></div>
            </div>

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
            type='password'
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