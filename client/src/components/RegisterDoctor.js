import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Style.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import doctorlogo from '../assets/doctor-black.svg'
import {validateDoctorForm} from '../helper/FormValidation';
function RegisterDoctor() {
    const navigate = useNavigate();

    const [hospitals,setHospitals] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/hospitals')
          .then(response=>{
            console.log(response.data);
            setHospitals(response.data);
          })
          .catch(error=>{
            console.error(error);
            toast.error('Server connection error');
          })
    },[])

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        hospital_id: '',
        speciality: '',
        experience: '',
        qualification: '',
        fee: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        setFormErrors(validateDoctorForm({ ...data, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data);
        const errors = validateDoctorForm(data);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            toast.loading("Saving...");
            const response = await axios.post('http://localhost:8080/doctorregister', data);
            console.log(response)
            if (response.data.message === 'success') {
                toast.dismiss();
                toast.success("Doctor registered successfully");
                navigate('/doctorlogin');
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
        <section className='body h-full'>
            <div className='box'>
                <Link to='/adminlogin' className='box-title'>
                    <img src={doctorlogo} className='w-10 mix-blend-plus-darker' alt='Doctor' />
                    <h1 className='text-center font-semibold text-4xl p-4'>Doctor Signup</h1>
                </Link>
                <form className='flex flex-col ' onSubmit={handleSubmit}>
                    <div className='sm:grid grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' id='name' className='input' name='name' onChange={handleChange} required />
                            {formErrors.name&&<p className='error'>{formErrors.name}</p>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' className='input' name='email' onChange={handleChange} placeholder='Example@gmail.com' required />
                            {formErrors.email&&<p className='error'>{formErrors.email}</p>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='mobile'>Mobile</label>
                            <input type='number' min='0' id='mobile' className='input' name='mobile' onChange={handleChange} required />
                            {formErrors.mobile&&<p className='error'>{formErrors.mobile}</p>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' className='input' name='password' onChange={handleChange} placeholder='password' required />
                            {formErrors.password&&<p className='error'>{formErrors.password}</p>}
                        </div>
                    </div>

                    <label htmlFor='hospital'>Hospital</label>
                    <select id='hospital' className='input appearance-none bg-white border border-gray-300 hover:border-gray-500 rounded p-2 pr-8 leading-tight focus:outline-none focus:border-gray-500' name='hospital_id' value={data.hospital_id} onChange={handleChange} required >
                        <option value=''>-select-</option>
                        {
                            hospitals.map((object,index)=>{
                                return(<option key={index+1} className='p-2' value={object.hospital_id} >{object.hospital_id}. {object.hospital}</option>)
                            })
                        }
                    </select>

                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor='qualification'>Qualification</label>
                            <input type='text' id='qualification' className='input' name='qualification' onChange={handleChange} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='speciality'>Speciality</label>
                            <input type='text' id='speciality' className='input' name='speciality' onChange={handleChange} required />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='experience'>Years of Experience</label>
                            <input type='number' id='experience' className='input' name='experience' onChange={handleChange} required />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='fee'>Appointment charges</label>
                            <input type='number' id='fee' className='input' name='fee' onChange={handleChange} />
                        </div>
                    </div>

                    <button type='submit' className='button' >Register</button>
                </form>
                <p className='text-center'>Already have an Account
                    <Link to='/doctorlogin' className='text-red-600'> Login</Link>
                </p>
            </div>
        </section>
    )
}

export default RegisterDoctor