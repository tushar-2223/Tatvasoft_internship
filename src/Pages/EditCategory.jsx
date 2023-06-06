import React, { useState, useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import axios from 'axios';
import Contextpage from '../ContextPage';

const EditCategory = () => {

    const { id } = useParams();

    const { LoadinContainer } = useContext(Contextpage);
    const [getCategoryid, setCategory] = useState([]);

    const navigate = useNavigate();

    const getCategorybyId = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://book-e-sell-node-api.vercel.app/api/category/byId?id=${id}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                setCategory(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
        });
    }

    useEffect(() => {
        getCategorybyId();
        LoadinContainer();
    }, [])

    const initialValues = {
        id: id,
        name: "",
    };

    const { values, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            onSubmit: (values, action) => {
                var config = {
                    method: 'put',
                    maxBodyLength: Infinity,
                    url: 'https://book-e-sell-node-api.vercel.app/api/category',
                    headers: { "Content-Type": "application/json" },
                    data: JSON.stringify(values)
                };

                axios(config)
                    .then(function () {
                        toast.success("Category Edit successfully");
                        navigate("/category");
                    })
                    .catch(function () {
                        toast.error("Invalid");
                    });

                action.resetForm();
            },
        });


    return (
        <div className="py-8">
            <div className="flex justify-center flex-col items-center p-4">
                <h1 className="text-4xl font-bold text-center p-3">Edit Category</h1>
                <div className="w-40 h-1 bg-red-400 rounded-full"></div>
            </div>

            <form method='POST' onSubmit={handleSubmit} className='flex justify-center items-center gap-5'>
                <div className='border-2 rounded-xl p-5 flex flex-col gap-5 shadow-lg w-[40rem]'>

                    <h1>Current Category : {getCategoryid.name}</h1>

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

                    <Button type='submit' variant="contained">Edit Category</Button>
                </div>
            </form>

        </div>
    )
}

export default EditCategory