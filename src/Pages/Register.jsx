import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Formik, useFormik } from "formik";
import { RegisterSchema } from "../schema";

const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: ""
};

const Register = () => {

    // <=========== form handling using formik =================>

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: RegisterSchema,
            onSubmit: (values, action) => {
                console.log(values);
                action.resetForm();
            },
        });
    console.log(errors);


    // <========== before Formik =============>

    // const [user, setUser] = useState({
    //     firstname: "", lastname: "", email: "", password: "", cpassword: ""
    // });

    // let name, value;

    // const handleInputs = (e) => {
    //     name = e.target.name;
    //     value = e.target.value;

    //     setUser({ ...user, [name]: value });
    // }


    // const SubmitForm = () => {
    //     console.log(user);

    // }


    return (
        <div className="py-14">
            <h1 className="text-2xl font-extrabold text-center p-5">Create an Account</h1>

            {/* <====== SignUp Form ===========> */}
            <form onSubmit={handleSubmit} className='flex justify-center items-center gap-5'>
                <div className='border-2 rounded-xl p-5 flex flex-col gap-5 shadow-lg'>
                    <div className='flex gap-5 flex-wrap'>
                        <div className='w-80'>
                            <TextField
                                type='text'
                                id="outlined-basic"
                                label="First name"
                                variant="outlined"
                                name='firstname'
                                className='w-full'
                                autocomplete="off"
                                value={values.firstname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.firstname && touched.firstname ? (
                                <p className="text-red-500 overflow-hidden text-ellipsis w-full">{errors.firstname}</p>
                            ) : null}
                        </div>

                        <div className='w-80'>
                            <TextField
                                type='text'
                                id="outlined-basic"
                                label="Last name"
                                variant="outlined"
                                name="lastname"
                                className='w-full'
                                autoComplete='off'
                                value={values.lastname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lastname && touched.lastname ? (
                                <p className="text-red-500 overflow-hidden text-ellipsis w-full">{errors.lastname}</p>
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

                    <div className='flex gap-5 flex-wrap'>
                        <div className='w-80'>
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
                            {errors.password && touched.password ? (
                                <p className="text-red-500 overflow-hidden text-ellipsis w-full">{errors.password}</p>
                            ) : null}
                        </div>

                        <div className='w-80'>
                            <TextField
                                id="outlined-basic"
                                label="Confirm Password"
                                variant="outlined"
                                name="cpassword"
                                className='w-full'
                                autoComplete="off"
                                value={values.cpassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.cpassword && touched.cpassword ? (
                                <p className="text-red-500 overflow-hidden text-ellipsis w-full">{errors.cpassword}</p>
                            ) : null}
                        </div>
                    </div>

                    <Button type='submit' variant="contained">Submit</Button>

                    <div className='text-center font-semibold'>Already have an account <Link to="/login" className="text-blue-500">sign in</Link></div>
                </div>
            </form>

        </div>
    )
}

export default Register