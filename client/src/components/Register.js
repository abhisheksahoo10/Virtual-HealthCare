import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Style.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import userlogo from '../assets/user.svg'
import {validateUserForm }from '../helper/FormValidation'; // Importing the validate function

function Register() {
    const navigate = useNavigate();
    
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        mobile: '',
        address: ''
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        // Perform validation on each change and set the errors state accordingly
        setFormErrors(validateUserForm({ ...data, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate one more time before submitting the form
        const errors = validateUserForm(data);
        console.log(Object.keys(errors))
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return; // If there are errors, do not submit the form
        }

        try {
            toast.loading("Saving...");
            const response = await axios.post('http://localhost:8080/register',data);
            console.log(response)
            if(response.data.message==='success'){
                navigate('/login');
                toast.dismiss();
                toast.success("User registered successfully");
                setTimeout(() => {
                    toast('You can login now', {
                        icon: '👏',
                    });
                }, 500);
            }else{
                toast.dismiss();
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error)
            toast.dismiss();
            toast.error("unable to connect server")
        }
    }

    return (
        <section className='body'>
            <div className='box'>
                <Link to='/login' className='box-title'>
                    <img src={userlogo} className='w-10 ' alt='user'/>
                    <h1 className='text-center font-semibold text-4xl p-4'>Signup</h1>
                </Link>
                <form className='flex flex-col ' onSubmit={handleSubmit}>
                    <div className='sm:flex gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor='firstname'>First name</label>
                            <input type='text' id='firstname' className='input' name='firstname' onChange={handleChange} required />
                            
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='lastname'>Last name</label>
                            <input type='text' id='lastname' className='input' name='lastname' onChange={handleChange} />
                        </div>
                        
                    </div>
                    {formErrors.firstname && <p className="error">{formErrors.firstname}</p>}
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' className='input' name='email' onChange={handleChange} placeholder='Example@gmail.com' required />
                    {formErrors.email && <p className="error">{formErrors.email}</p>}

                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' className='input' name='password' onChange={handleChange} placeholder='password' required />
                    {formErrors.password && <p className="error">{formErrors.password}</p>}

                    <label htmlFor='mobile'>Mobile</label>
                    <input type='number' id='mobile' className='input' name='mobile' onChange={handleChange} required />
                    {formErrors.mobile && <p className="error">{formErrors.mobile}</p>}

                    <label htmlFor='address'>Address</label>
                    <input type='text' id='address' className='input' name='address' onChange={handleChange} />

                    <button type='submit' className='button' >Register</button>
                </form>
                <p className='text-center'>Already have an Account
                    <Link to='/login' className='text-red-600'> Login</Link>
                </p>
            </div>
        </section>
    )
}

export default Register;
