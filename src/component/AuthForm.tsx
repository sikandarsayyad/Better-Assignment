import { useEffect, useState } from 'react'
import { User } from './User';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

type ValidationErrorType = {
    email?: string;
    password?: string;
    confirm_password?: string;
};

const initialFormValues1 = {
    email: "",
    password: ""
}
const initialFormValues2 = {
    email: "",
    password: "",
    confirm_password: ""
}


function AuthForm() {
    let userObj: User = new User();
    let userArr: User[] = [];
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [userList, setUserList] = useState([userObj])

    useEffect(() => {
        const localData = localStorage.getItem('userList')
        if (localData != null) {
            userArr = JSON.parse(localData);
        }
        setUserList(userArr)
    }, [])


    const loginHandler = (values: typeof initialFormValues1) => {
        const currentRecord = userList.find((m) => m.userEmail == values.email)
        if (currentRecord != undefined) {
            if (currentRecord.userPassword == values.password) {
                alert("Login Successful")
                navigate("/home")
            } else {
                alert("wrong password")
            }
        } else {
            alert("User is not registerd")
        }
    }

    const submitHandler = (values: typeof initialFormValues2) => {
        const isLocalPresent = localStorage.getItem('userList')
        const currentRecord = userList.find((m) => m.userEmail == values.email)
        let maxId: number = 0
        if (isLocalPresent != null) {
            if (currentRecord != undefined) {
                alert("Email id already registerd")
            } else {
                const oldArr = JSON.parse(isLocalPresent)
                for (let item of oldArr) {
                    if (item.id > maxId) {
                        maxId = item.id
                    }
                }
                userObj.id = maxId + 1
                userObj.userEmail = values.email
                userObj.userPassword = values.password
                userObj.userConformPassword = values.confirm_password
                oldArr.push(userObj);
                userArr = oldArr
                localStorage.setItem('userList', JSON.stringify(oldArr))
                alert("Sign Up Successful");
                setIsLogin(true)
            }
        } else {
            const newArr = []
            userObj.id = 1
            userObj.userEmail = values.email
            userObj.userPassword = values.password
            userObj.userConformPassword = values.confirm_password
            newArr.push(userObj)
            userArr = newArr
            localStorage.setItem('userList', JSON.stringify(newArr))
            alert("Sign Up Successful");
            setIsLogin(true)
        }
        userObj = new User();


    }


    function validate1(values: typeof initialFormValues1) {
        const errors: ValidationErrorType = {};

        const { email, password } = values;

        if (!email)
            errors.email = "Email is required.";


        if (!password)
            errors.password = "Password is required.";

        return errors;

    }

    function validate2(values: typeof initialFormValues2) {
        const errors: ValidationErrorType = {};

        const { email, password, confirm_password } = values;

        if (!email)
            errors.email = "Email is required.";


        if (!password)
            errors.password = "Password is required.";


        if (!confirm_password)
            errors.confirm_password = "Confirm Password is required.";


        if (password !== confirm_password)
            errors.confirm_password = "Password and confirm password should be same."

        return errors;

    }


    return (<div className="container">
        <div className="form-container">
            <div className="form-toggle">
                <button className={
                    isLogin ? 'active' : ""
                }
                    onClick={
                        () => setIsLogin(true)
                    }>Login</button>
                <button className={
                    !isLogin ? 'active' : ""
                }
                    onClick={
                        () => setIsLogin(false)
                    }>SignUp</button>
            </div>
            {
                isLogin ? <>
                    <Formik initialValues={initialFormValues1}
                        onSubmit={loginHandler}
                        validate={validate1}>
                        <Form className="form">
                            <h2>LogIn Form</h2>
                            <Field type='email' autoComplete='off' name='email' id='email' placeholder='Email' />
                            <ErrorMessage name='email' className='error' component='small' />

                            <Field type='password' autoComplete='off' name='password' id='password' placeholder='Password' />
                            <ErrorMessage name='password' className='error' component='small' />

                            <button type='submit'>Login</button>

                            <p>Didn't have an account?
                                <a href='#'
                                    onClick={
                                        () => setIsLogin(false)
                                    }>SignUp</a>
                            </p>
                        </Form>

                    </Formik>
                </> : <Formik initialValues={initialFormValues2}
                    onSubmit={submitHandler}
                    validate={validate2}>
                    <Form className="form">
                        <h2>SignUp Form</h2>
                        <Field type='email' autoComplete='off' name='email' id='email' placeholder='Email' />
                        <ErrorMessage name='email' className='error' component='small' />

                        <Field type='password' autoComplete='off' name='password' id='password' placeholder='Password' />
                        <ErrorMessage name='password' className='error' component='small' />

                        <Field type='password' autoComplete='off' name='confirm_password' id='confirm_password' placeholder='Confirm Password' />
                        <ErrorMessage name='confirm_password' className='error' component='small' />

                        <button type='submit'>SignUp</button>

                        <p>Already have an Account?
                            <a href='#'
                                onClick={
                                    () => setIsLogin(true)
                                }>Login/Signin</a>
                        </p>
                    </Form>

                </Formik>
            } </div>
    </div>
    )
}

export default AuthForm

