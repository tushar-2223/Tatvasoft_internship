import React, { useState, useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import axios from 'axios';
import Contextpage from '../ContextPage';

const initialValues = {
    name: "",
};

const AddCategory = () => {
  const {LoadinContainer,getCategory} = useContext(Contextpage)

  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: (values, action) => {
        var config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://book-e-sell-node-api.vercel.app/api/category',
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify(values)
        };

        axios(config)
          .then(function () {
            toast.success("Category added successfully");
            getCategory();
            navigate("/category");
          })
          .catch(function () {
            toast.error("Invalid");
          });

        action.resetForm();

      },
    });

  useEffect(() => {
    LoadinContainer();
  }, [])

  return (
    <div className="py-8">
      <div className="flex justify-center flex-col items-center p-4">
        <h1 className="text-4xl font-bold text-center p-3">Add New Category</h1>
        <div className="w-40 h-1 bg-red-400 rounded-full"></div>
      </div>

      {/* <====== SignUp Form ===========> */}
      <form method='POST' onSubmit={handleSubmit} className='flex justify-center items-center gap-5'>
        <div className='border-2 rounded-xl p-5 flex flex-col gap-5 shadow-lg w-[40rem]'>

          <TextField
            type='text'
            id="outlined-basic"
            label="Category Name"
            variant="outlined"
            name='name'
            className='w-full'
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Button type='submit' variant="contained">Add Category</Button>
        </div>
      </form>

    </div>
  )
}

export default AddCategory