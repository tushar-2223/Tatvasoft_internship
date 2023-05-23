import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Register = () => {

    const [user, setUser] = useState({
        firstname: "", lastname: "", email: "", password: "", cpassword: ""
    });

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }


    const SubmitForm = () => {
        console.log(user);

    }
    

    return (
        <div className="p-7">
            <h1 className="text-2xl font-bold text-center p-5">Login or Create an Account</h1>


            <form className='flex justify-center items-center gap-5'>
                <div className='border-2 rounded-xl p-5 flex flex-col gap-5 shadow-lg'>
                    <div className='flex gap-5'>
                        <TextField id="outlined-basic" label="First name" variant="outlined" name='firstname' value={user.name}
                            onChange={handleInputs} />
                        <TextField id="outlined-basic" label="Last name" variant="outlined" name="lastname" value={user.name}
                            onChange={handleInputs} />
                    </div>
                    <TextField id="outlined-basic" label="Email" variant="outlined" className='w-full' name='email' value={user.name}
                        onChange={handleInputs} />

                    <div className='flex gap-5'>
                        <TextField id="outlined-basic" label="Password" variant="outlined" name='password' value={user.name}
                            onChange={handleInputs} />
                        <TextField id="outlined-basic" label="Confirm Password" variant="outlined" name="cpassword" value={user.name}
                            onChange={handleInputs} />
                    </div>

                    <Button variant="contained" onClick={SubmitForm}> Submit</Button>
                </div>
            </form>

        </div>
    )
}

export default Register