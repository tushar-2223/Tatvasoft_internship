import React, { useState, useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { RegisterSchema } from "../schema";
import { toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Contextpage from '../ContextPage';

const UpdateProfile = () => {
    const { LoadinContainer, user } = useContext(Contextpage)

    const navigate = useNavigate();
    // <=========== form handling using formik =================>
    const [initialValues, setInitialValues] = useState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.roleId,
        role: user.role,
        password: ""
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: RegisterSchema,
            onSubmit: (values, action) => {
                var config = {
                    method: 'put',
                    maxBodyLength: Infinity,
                    url: 'https://book-e-sell-node-api.vercel.app/api/user',
                    headers: { "Content-Type": "application/json" },
                    data: JSON.stringify(values)
                };

                axios(config)
                    .then(function () {
                        toast.success("Profile Updated successfully");
                        navigate("/");
                    })
                    .catch(function () {
                        toast.error("Profile updated Unsuccessfully");
                    });

                action.resetForm();
            },
        });
    console.log(errors);

    useEffect(() => {
        LoadinContainer();
    }, [])



    return (
        <div className="py-8">
            <div className="flex justify-center flex-col items-center p-4">
                <h1 className="text-4xl font-bold text-center p-3">Update Profile</h1>
                <div className="w-40 h-1 bg-red-400 rounded-full"></div>
            </div>

            {/* <====== SignUp Form ===========> */}
            <form method='PUT' onSubmit={handleSubmit} className='flex justify-center items-center gap-5'>
                <div className='border-2 rounded-xl p-5 flex flex-col gap-5 shadow-lg'>
                    <div className='flex gap-5 flex-wrap'>
                        <div className='w-80'>
                            <TextField
                                type='text'
                                id="outlined-basic"
                                label="First name"
                                variant="outlined"
                                name='firstName'
                                className='w-full'
                                autoComplete="off"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.firstName && touched.firstName ? (
                                <p className="text-red-500 overflow-hidden text-ellipsis w-full">{errors.firstName}</p>
                            ) : null}
                        </div>

                        <div className='w-80'>
                            <TextField
                                type='text'
                                id="outlined-basic"
                                label="Last name"
                                variant="outlined"
                                name="lastName"
                                className='w-full'
                                autoComplete='off'
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lastName && touched.lastName ? (
                                <p className="text-red-500 overflow-hidden text-ellipsis w-full">{errors.lastName}</p>
                            ) : null}
                        </div>
                    </div>

                    <div>
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
                        {errors.email && touched.email ? (
                            <p className="text-red-500 overflow-hidden text-ellipsis w-full">{errors.email}</p>
                        ) : null}
                    </div>

                    {user.roleId == 1 ? null : <>
                        <FormControl >
                            <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                label="roles"
                                value={values.roleId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name='roleId'
                            >
                                {/* <MenuItem value="1">Admin</MenuItem> */}
                                <MenuItem value="3">Buyer</MenuItem>
                                <MenuItem value="2">Seller</MenuItem>
                            </Select>
                        </FormControl>
                    </>}



                    <div className='flex gap-5 flex-wrap'>
                        <div className='w-80'>
                            <TextField
                                id="outlined-basic"
                                label="New Password"
                                variant="outlined"
                                name='password'
                                className='w-full'
                                autoComplete='off'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? (
                                <p className="text-red-500 overflow-hidden text-ellipsis w-full">{errors.password}</p>
                            ) : null}
                        </div>

                        <div className='w-80'>
                            <TextField
                                id="outlined-basic"
                                label="Confirm Password"
                                variant="outlined"
                                // name="cpassword"
                                className='w-full'
                                autoComplete="off"
                            />
                            {/* {errors.cpassword && touched.cpassword ? (
                                <p className="text-red-500 overflow-hidden text-ellipsis w-full">{errors.cpassword}</p>
                            ) : null} */}
                        </div>
                    </div>

                    <Button type='submit' variant="contained">Save</Button>
                </div>
            </form>

        </div>
    )
}

export default UpdateProfile