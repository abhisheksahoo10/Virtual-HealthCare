import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Style.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import adminlogo from '../assets/Admin-black.svg'
import {validateAdminForm} from '../helper/FormValidation';
function Register() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        hospital: '',
        address: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setFormErrors(validateAdminForm({ ...data, [e.target.name]: e.target.value }));

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data);
        const errors = validateAdminForm(data);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return; 
        }
        try {
            toast.loading("Saving...");
            const response = await axios.post('http://localhost:8080/adminregister', data);
            console.log(response)
            if (response.data.message === 'success') {
                toast.dismiss();
                toast.success("Admin registered successfully");
                navigate('/adminlogin');
                setTimeout(() => {
                    toast('You can login now', {
                        icon: '👏',
                    });
                }, 500);
            } else {
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
                <Link to='/adminlogin' className='box-title'>
                    <img src={adminlogo} className='w-10 mix-blend-plus-darker' alt='Admin'/>
                    <h1 className='text-center font-semibold text-4xl p-4'>Admin Signup</h1>
                </Link>
                <form className='flex flex-col ' onSubmit={handleSubmit}>
                    <div className='sm:flex gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' id='name' className='input' name='name' onChange={handleChange} placeholder='Admin' required />
                            {formErrors.name&&<p className='error'>{formErrors.name}</p>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' className='input' name='email' onChange={handleChange} placeholder='Example@gmail.com' required />
                            {formErrors.email&&<p className='error'>{formErrors.email}</p>}
                        </div>
                    </div>


                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' className='input' name='password' onChange={handleChange} placeholder='password' required />
                    {formErrors.password&&<p className='error'>{formErrors.password}</p>}


                    <label htmlFor='hospital'>Hospital</label>
                    <input type='text' id='hospital' className='input' name='hospital' onChange={handleChange} required />

                    <label htmlFor='address'>Address</label>
                    <input type='text' id='address' className='input' name='address' onChange={handleChange} required/>

                    <button type='submit' className='button' >Register</button>
                </form>
                <p className='text-center'>Already have an Account
                    <Link to='/adminlogin' className='text-red-600'> Login</Link>
                </p>
            </div>
        </section>
    )
}

export default Register