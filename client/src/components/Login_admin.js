import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import '../styles/Style.css';
import adminlogo from '../assets/Admin-black.svg'
import {validateLoginForm} from '../helper/FormValidation';
function Login() {
    
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [formErrors, setFormErrors] = useState({});
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setFormErrors(validateLoginForm({ ...data, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateLoginForm(data);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return; 
        }
        try {
            toast.loading("Logging in...")
            const response = await axios.post('http://localhost:8080/adminlogin', data);
            console.log(response)
            if (response.data.message === 'success') {
                sessionStorage.setItem('account_type', 'admin');
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('admin_id', response.data.admin_id);
                sessionStorage.setItem('name', response.data.admin_name);
                toast.dismiss();
                toast.success('Successfully Logged in as Admin');
                navigate('/admin/admindashboard');
            }else{
                setData({...data,password:''});
                toast.dismiss();
                toast.error(response.data.message)
            }

        } catch (error) {
            // console.error(error)
            toast.dismiss();
            toast.error('unable to connect Server')
        }
    }
    return (
        <>
            <section className='body'>
                <div className='box'>
                    <Link to='/adminregister' className='box-title'>
                        <img src={adminlogo} className='w-10 mix-blend-plus-darker' alt='Admin'/>
                        <h1 className='text-center font-semibold text-4xl p-4'>Admin Login</h1>
                    </Link>
                    <form className='flex flex-col' onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email</label>
                        <input type='email' className='input' name='email' onChange={handleChange} placeholder='example@gmail.com' required />
                        {formErrors.email&&<p className='error'>{formErrors.email}</p>}
                        <label htmlFor='password'>Password</label>
                        <input type='password' className='input' name='password' onChange={handleChange} placeholder='password' required />
                        {formErrors.password&&<p className='error'>{formErrors.password}</p>}
                        <button type='submit' className='button' >Login</button>
                    </form>
                    <p className='text-center'>Don't have an Account ?
                        <Link to='/adminregister' className='text-red-600'>Register</Link>
                    </p>
                </div>
            </section>
        </>
    )
}

export default Login