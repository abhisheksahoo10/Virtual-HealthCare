import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import adminlogo from '../assets/Admin.svg';
import AdminSidebar from './AdminSidebar';
import '../styles/Style.css';
import toast from 'react-hot-toast';

function AdminProfileupdate() {
    const Adminid = sessionStorage.getItem('admin_id');
    const [data, setData] = useState({
        name: '',
        Email: '',
        Password: '',
        hospital: '',
        address: ''
    });
    useEffect(() => {
        axios.get(`http://localhost:8080/adminprofile/${Adminid}`)
            .then(response => {
                console.log(response);
                setData({
                    name: response.data[0].name,
                    Email: response.data[0].Email,
                    Password: response.data[0].Password,
                    hospital: response.data[0].hospital,
                    address: response.data[0].address
                });
            })
            .catch(error => {
                console.error(error);
                toast.error('Server connection error');
            });
    }, [Adminid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            toast.loading('Updating...');
            console.log(data)
            const res = await axios.put(`http://localhost:8080/updateadmin/${Adminid}`, data);
            console.log(res)
            if (res.data.message === 'updated') {
                toast.dismiss();
                toast.success('Admin Profile updated successfully');
            } else {
                console.log(res);
                toast.dismiss();
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error)
            toast.dismiss();
            toast.error("unable to connect server")
        }

    };

    return (
        <>
            <AdminNav active='profile' />
            <div className='flex'>
                <AdminSidebar />
                <section className='content'>
                    <div className=" bg-white shadow-md rounded-xl ">
                        <div className='w-full pt-8 pb-6 flex justify-center items-center'>
                            <img className='w-10' src={adminlogo} alt='admin' />
                            <h2 className="sm:text-2xl font-semibold mx-3">Hospital Admin</h2>
                        </div>
                        <hr className='p-1 mb-5  mx-3 lg:mx-10 rounded-full bg-green-300' />
                        <form onSubmit={handleSubmit} className='md:mx-12'>
                            <div className='grid sm:grid-cols-1 lg:grid-cols-2  gap-4'>
                                <div className="input-box">
                                    <label htmlFor="firstname" className="input-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className="input-inside"
                                    />
                                </div>

                                <div className="input-box">
                                    <label htmlFor="email" className="input-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="Email"
                                        name="Email"
                                        value={data.Email}
                                        onChange={handleChange}
                                        className="input-inside"
                                    />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="password" className="input-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="Password"
                                        name="Password"
                                        value={data.Password}
                                        onChange={handleChange}
                                        className="input-inside"
                                    />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="hospital" className="input-label">
                                        Hospital
                                    </label>
                                    <input
                                        type="text"
                                        id="hospital"
                                        name="hospital"
                                        value={data.hospital}
                                        onChange={handleChange}
                                        className="input-inside"
                                    />
                                </div>
                                <div className="input-box col-span-2">
                                    <label htmlFor="address" className="input-label">
                                        Address
                                    </label>
                                    <input
                                        id="address"
                                        name="address"
                                        value={data.address}
                                        onChange={handleChange}
                                        className="input-inside"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-emerald-400 mx-auto my-8 py-3 w-full shadow-lg border-2 border-black rounded-xl hover:bg-green-500 focus:outline-none focus:bg-emerald-200"
                            >
                                Save
                            </button>
                        </form>

                    </div>

                </section>
            </div>
        </>
    )
}

export default AdminProfileupdate