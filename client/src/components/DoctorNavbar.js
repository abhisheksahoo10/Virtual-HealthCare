import React from 'react'
import logo from '../assets/Logo.svg'
import profile from '../assets/doctor-black.svg'
// import bell from '../assets/bell-icon.svg'
import '../styles/Style.css'
import { Link } from 'react-router-dom'

const DoctorNavbar = (props) => {
    const name = sessionStorage.getItem('name');
    const id = sessionStorage.getItem('doctor_id');
    return (
        <header className='z-50 top-0 py-2 w-full z-999 bg-[#70B5A6] flex justify-between items-center shadow-md'>
            <div className='flex items-center mx-10'>
                <img src={logo} className='w-10 my-4  pb-1' alt='logo' />
                <h1 className='sm:text-xl font-bold mx-4 drop-shadow-sm'>V+ HealthCare</h1>
            </div>
            <div className='flex justify-center items-center mx-3'>
                <Link to={`/doctor/doctorprofile/${id}`} className={`flex items-center px-3 mx-2 rounded-lg ${props.active==='profile'?'bg-emerald-100 border-2 border-black shadow-lg':'bg-emerald-200'}`}>
                    <img src={profile} className='w-8 p-1 my-3 border-2 border-black rounded-md' alt='user' />
                    <h2 className='hidden sm:inline mx-2'>Dr.{name}</h2>
                </Link>
                {/* <img src={bell} className='w-12 p-3 mx-4 bg-emerald-200 rounded-lg' alt='notification' /> */}
            </div>
        </header>
    );
};

export default DoctorNavbar;
