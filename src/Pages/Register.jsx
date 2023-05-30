import React, { useState ,useContext,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { RegisterSchema } from "../schema";
import { toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Contextpage from '../ContextPage';

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: 3,
    password: ""
};

// roleId
// 1 : admin,
// 2 : Seller,
// 3 : buyer

const Register = () => {
    const { LoadinContainer } = useContext(Contextpage)

    const navigate = useNavigate();
    // <=========== form handling using formik =================>

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: RegisterSchema,
            onSubmit: (values, action) => {

                var config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://book-e-sell-node-api.vercel.app/api/user',
                    headers: { "Content-Type": "application/json" },
                    data: JSON.stringify(values)
                };

                axios(config)
                    .then(function () {
                        toast.success("Register successfully");
                        navigate("/login");
                    })
                    .catch(function () {
                        toast.error("Invalid Registration");
                    });

                action.resetForm();
            }
        });
    console.log(errors);

    useEffect(() => {
        LoadinContainer();
    }, [])
    


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
        <div className="py-8">
            <div className="flex justify-center flex-col items-center p-4">
                <h1 className="text-4xl font-bold text-center p-3">Login or Create an Account</h1>
                <div className="w-40 h-1 bg-red-400 rounded-full"></div>
            </div>

            {/* <====== SignUp Form ===========> */}
            <form method='POST' onSubmit={handleSubmit} className='flex justify-center items-center gap-5'>
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
                            <MenuItem value="3">Buyer</MenuItem>
                            <MenuItem value="2">Seller</MenuItem>
                        </Select>
                    </FormControl>


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
                                // name="cpassword"
                                className='w-full'
                                autoComplete="off"
                            />
                            {/* {errors.cpassword && touched.cpassword ? (
                                <p className="text-red-500 overflow-hidden text-ellipsis w-full">{errors.cpassword}</p>
                            ) : null} */}
                        </div>
                    </div>

                    <Button type='submit' variant="contained">Sign Up</Button>

                    <div className='text-center font-semibold'>Already have an account <Link to="/login" className="text-red-400">sign in</Link></div>
                </div>
            </form>

        </div>
    )
}

export default Register