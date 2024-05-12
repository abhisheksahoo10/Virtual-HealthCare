import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Profile from '../assets/profile.svg';
import '../styles/Style.css';
import axios from 'axios';
import toast from 'react-hot-toast';

function Userprofile() {
    const id = sessionStorage.getItem('user_id');

    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        mobile: '',
        address: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/userprofile/${id}`)
            .then(response => {
                console.log(response);
                setData(prevData => ({
                    ...prevData,
                    firstname: response.data[0].firstname,
                    lastname: response.data[0].lastname,
                    email: response.data[0].email,
                    password: response.data[0].password,
                    mobile: response.data[0].mobile,
                    address: response.data[0].address
                }));
            })
            .catch(error => {
                console.error(error);
                toast.error('Server connection error');
            });
    },[id]);

    return (
        <>
            <Navbar active='profile' />
            <section className='flex'>
                <Sidebar />
                <section className='content'>
                <div className='w-full pt-8 pb-6 flex justify-center items-center'>
                    <img className='w-10' src={Profile} alt='profile' />
                    <h2 className="text-2xl font-semibold mx-3">User Profile</h2>
                </div>
                <hr className='mx-16 p-[2px] rounded-full bg-green-200'/>
                    <div className='text-center m-4 '>
                        <h2 className='p-2 text-green-900 text-2xl font-semibold'>{data.firstname} {data.lastname}</h2>
                        <h3 className='p-1 text-gray-700 text-wrap sm:text-xl'>✉️{data.email}</h3>
                        <p className='p-1 text-gray-700'>📞{data.mobile}</p>
                        <p className='pt-3 text-gray-800'>📌Address :</p>
                        <p className='text-gray-700'>{data.address}</p>
                    </div>
                    <div className="mt-12 text-center">
                        <Link to={`/user/updateuser/${id}`}  className=" bg-emerald-400 hover:bg-emerald-400 border-2 border-black  font-semibold py-3 px-10 rounded-xl focus:outline-none focus:shadow-outline">
                            Edit
                        </Link>
                    </div>
                </section>
            </section>
        </>
    );
}

export default Userprofile;
