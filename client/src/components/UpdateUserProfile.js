import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Profile from '../assets/profile.svg'
import '../styles/Style.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import {validateUserForm }from '../helper/FormValidation'; 

function UpdateUserprofile() {
    const { id } = useParams();
    // const Navigate = useNavigate();

    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        mobile: '',
        address: ''
    })
    const [formErrors, setFormErrors] = useState({});

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
            })
    },[id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
        setFormErrors(validateUserForm({ ...data, [name]:value }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = validateUserForm(data);
        console.log(Object.keys(errors))
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        try{
            toast.loading('Updating...');
            const res = await axios.put(`http://localhost:8080/updateprofile/${id}`,data);
            console.log(res)
            if(res.data.message === 'updated'){
                toast.dismiss();
                toast.success('Profile updated successfully');
            }else{
                console.log(res);
                toast.dismiss();
                toast.error(res.data.message);
            }
        }catch(error) {
            console.error(error)
            toast.dismiss();
            toast.error("unable to connect server")
        }
        
    };

    return (
        <>
            <Navbar active='profile' />
            <section className='flex'>
                <Sidebar />
                <section className='content'>
                    <div className='w-full p-10 flex justify-center items-center'>
                        <img className='w-10' src={Profile} alt='profile' />
                        <h2 className="text-2xl font-semibold mx-3">User Profile</h2>
                    </div>
                    <form onSubmit={handleSubmit} className='mx-12'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                            <div className="input-box">
                                <label htmlFor="firstname" className="input-label">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    value={data.firstname}
                                    onChange={handleChange}
                                    className="input-inside"
                                />
                                {formErrors.firstname && <p className="error">{formErrors.firstname}</p>}
                            </div>
                            <div className="input-box">
                                <label htmlFor="lastname" className="input-label">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={data.lastname}
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
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className="input-inside"
                                />
                                {formErrors.email && <p className="error">{formErrors.email}</p>}
                            </div>
                            <div className="input-box">
                                <label htmlFor="password" className="input-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="input-inside"
                                />
                                {formErrors.password && <p className="error">{formErrors.password}</p>}
                            </div>
                            <div className="input-box">
                                <label htmlFor="mobile" className="input-label">
                                    Mobile
                                </label>
                                <input
                                    type="number"
                                    id="mobile"
                                    name="mobile"
                                    value={data.mobile}
                                    onChange={handleChange}
                                    className="input-inside"
                                />
                                {formErrors.mobile && <p className="error">{formErrors.mobile}</p>}
                            </div>
                            <div className="input-box">
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
                            className="bg-emerald-400 mx-auto my-8 py-3 w-full shadow-lg border-2 border-black rounded-xl hover:bg-green-300 focus:outline-none focus:bg-emerald-200"
                        >
                            Save
                        </button>
                    </form>
                </section>
            </section>

        </>
    )
}

export default UpdateUserprofile