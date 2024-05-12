import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import adminlogo from '../assets/Admin.svg';
import AdminSidebar from './AdminSidebar';
import '../styles/Style.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function AdminProfile() {
    const Adminid = sessionStorage.getItem('admin_id');
    const [data, setData] = useState({
        name: '',
        email: '',
        hospital: '',
        address: ''
    });
    useEffect(() => {
        axios.get(`http://localhost:8080/adminprofile/${Adminid}`)
            .then(response => {
                console.log(response);
                setData({
                    name: response.data[0].name,
                    email: response.data[0].Email,
                    hospital: response.data[0].hospital,
                    address: response.data[0].address
                });
            })
            .catch(error => {
                console.error(error);
                toast.error('Server connection error');
            });
    }, [Adminid]);
    return (
        <>
            <AdminNav active='profile' />
            <div className='flex'>
                <AdminSidebar />
                <section className='content'>
                    <div className="container mx-auto py-8">
                        <div className="max-w-md mx-auto bg-white shadow-md rounded-xl ">
                            <div className='w-full pt-8 pb-6 flex justify-center items-center'>
                                <img className='w-10' src={adminlogo} alt='admin' />
                                <h2 className="sm:text-2xl font-semibold mx-3">Hospital Admin</h2>
                            </div>
                            <hr className='p-1  mx-3 lg:mx-10 rounded-full bg-green-300' />
                            <div className="p-6 text-center">
                                <h2 className="text-xl sm:text-2xl font-semibold mb-4">{data.name}</h2>
                                <p className="text-gray-600 mb-2">✉️{data.email}</p>
                                <p className="text-gray-600 mb-2">🏥{data.hospital}</p>
                                <p className="text-gray-600 mb-2">📍{data.address}</p>
                            </div>
                            <div className="mt-12 text-center">
                                <Link to={`/admin/updateadmin/${Adminid}`} className=" bg-emerald-300 hover:bg-emerald-400   font-semibold py-3 px-10 rounded-xl focus:outline-none focus:shadow-outline">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AdminProfile