import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const RegisterSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("enter your firstname"),
    lastName: Yup.string().min(2).max(25).required("Enter your lastname"),
    email: Yup.string().email().required("Enter your email"),
    password: Yup.string().min(5).matches(passwordRules, { message: "Create a stronger password [min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit]" }).required("Enter your password")
    // cpassword: Yup.string()
    //     .required()
    //     .oneOf([Yup.ref("password"), null], "Password must match"),
});