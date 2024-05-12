
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorNav from './DoctorNavbar';
import doctorlogo from '../assets/doctor-prime.svg';
import DoctorSidebar from './DoctorSidebar';
import '../styles/Style.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Doctorprofile() {
    const id = sessionStorage.getItem('doctor_id');
    const [doctorData, setDoctorData] = useState(null);

    useEffect(() => {
        const fetchDoctorProfile = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/doctorprofile/${id}`);
            setDoctorData(response.data[0]);
          } catch (error) {
            toast.error("Error fetching doctor profile:")
          }
        };
    
        fetchDoctorProfile();
      }, []);
    return (
        <>
            <DoctorNav active='profile' />
            <div className='flex'>
                <DoctorSidebar/>
                <div className="container mx-auto py-8">
                    {doctorData ? (
                        <div className="max-w-md mx-auto bg-emerald-50 shadow-md rounded-md">
                            <div className='w-full pt-8 pb-6 flex justify-center items-center'>
                                <img className='w-10' src={doctorlogo} alt='doctor' />
                                <h2 className="sm:text-2xl font-semibold mx-3">Doctor Profile</h2>
                            </div>
                            <hr className='p-1  mx-3 lg:mx-10 rounded-full bg-green-300' />
                            <div className="p-6 lg:px-12 mx-auto">
                                <h2 className="text-2xl font-semibold mb-4">{doctorData.name}</h2>
                                <p className="text-gray-600 mb-2">✉️ {doctorData.email}</p>
                                <p className="text-gray-600 mb-2">📱 {doctorData.mobile}</p>
                                <p className="text-gray-600 mb-2"> </p>
                                <p className="text-gray-600 mb-2">Speciality: {doctorData.speciality}</p>
                                <p className="text-gray-600 mb-2">Experience: {doctorData.experience}</p>
                                <p className="text-gray-600 mb-2">Qualification: {doctorData.qualification}</p>
                                <p className="text-gray-600 mb-2">Fee: {doctorData.fee}</p>
                            </div>
                            <div className="mt-12 text-center">
                                <Link to={`/doctor/updatedoctor/${id}`} className=" bg-emerald-300 hover:bg-emerald-400   font-semibold py-3 px-10 rounded-xl focus:outline-none focus:shadow-outline">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>

        </>
    )
}

export default Doctorprofile