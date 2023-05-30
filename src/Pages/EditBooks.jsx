import React, { useState, useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Contextpage from '../ContextPage';

const EditBooks = () => {

    const { id } = useParams();

    const { LoadinContainer, category } = useContext(Contextpage)

    const navigate = useNavigate();

    const [book, getBooks] = useState({});

    console.log(book.name)

    const getBookById = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://book-e-sell-node-api.vercel.app/api/book/byId?id=${id}`,
            headers: { "Content-Type": "application/json" }
        };

        axios(config)
            .then(function (response) {
                getBooks(response.data.result);
                // console.log(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const initialValues = {
        name: "",
        description: "",
        price: book.price,
        categoryId: 2,
        base64image: ""
    };

    const { values, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            onSubmit: (values, action) => {
                var config = {
                    method: 'put',
                    maxBodyLength: Infinity,
                    url: 'https://book-e-sell-node-api.vercel.app/api/book',
                    headers: { "Content-Type": "application/json" },
                    data: JSON.stringify(values)
                };

                axios(config)
                    .then(function () {
                        toast.success("Book Edit successfully");
                        navigate("/books");
                    })
                    .catch(function () {
                        toast.error("Invalid");
                    });

                action.resetForm();

            },
        });

    useEffect(() => {
        LoadinContainer();
        getBookById();
    }, [])

    return (
        <div className="py-8">
            <div className="flex justify-center flex-col items-center p-4">
                <h1 className="text-4xl font-bold text-center p-3">Edit Book</h1>
                <div className="w-40 h-1 bg-red-400 rounded-full"></div>
            </div>

            {/* <====== SignUp Form ===========> */}
            <form method='PUT' onSubmit={handleSubmit} className='flex justify-center items-center gap-5'>
                <div className='border-2 rounded-xl p-5 flex flex-col gap-5 shadow-lg w-[40rem]'>

                    <TextField
                        type='text'
                        id="outlined-basic"
                        label="Book Name"
                        variant="outlined"
                        name='name'
                        className='w-full'
                        autoComplete="off"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <TextField
                        type='text'
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        name="description"
                        className='w-full'
                        autoComplete='off'
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <FormControl >
                        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            label="roles"
                            value={values.categoryId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='categoryId'
                        >
                            {category.map((value) => (
                                <MenuItem value={value.id}>{value.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        className='w-full'
                        name='price'
                        autoComplete='off'
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Book cover page"
                        variant="outlined"
                        name='base64image'
                        className='w-full'
                        autoComplete='off'
                        value={values.base64image}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <p className='text-green-600'>Copy image address and paste it here</p>


                    <Button type='submit' variant="contained">Add Book</Button>
                </div>
            </form>
        </div>

    )
}

export default EditBooks