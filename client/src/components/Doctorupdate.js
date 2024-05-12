
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorNav from './DoctorNavbar';
import doctorlogo from '../assets/doctor-prime.svg';
import DoctorSidebar from './DoctorSidebar';
import '../styles/Style.css';
import toast from 'react-hot-toast';
// import {validateDoctorForm} from '../helper/FormValidation';

function DoctorUpdate() {
    const id = sessionStorage.getItem('doctor_id');
    const [doctorData, setDoctorData] = useState([]);
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/hospitals')
            .then(response => {
                console.log(response.data);
                setHospitals(response.data);
            })
            .catch(error => {
                console.error(error);
                toast.error('Server connection error');
            })
    }, [])

    const fetchDoctorProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/doctorprofile/${id}`);
            setDoctorData(response.data[0]);
        } catch (error) {
            toast.error("Error fetching doctor profile:")
        }
    };
    useEffect(() => {
        fetchDoctorProfile();
    }, []);
    const [formErrors, setFormErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData({
            ...doctorData,
            [name]: value
        });
        // setFormErrors(validateDoctorForm({ ...doctorData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const errors = validateDoctorForm(doctorData);
        // console.log(Object.keys(errors))
        // if (Object.keys(errors).length > 0) {
        //     setFormErrors(errors);
        //     return; // If there are errors, do not submit the form
        // }
        try {
            toast.loading('Updating...');
            const res = await axios.put(`http://localhost:8080/updatedoctor/${id}`, doctorData);
            console.log(res)
            if (res.data.message === 'updated') {
                toast.dismiss();
                toast.success("Your doctor profile updated.");
            } else {
                console.log(res);
                toast.dismiss();
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error)
            toast.dismiss();
            toast.error("Server disconnected")
        }

    };
    return (
        <>
            <DoctorNav active='profile' />
            <div className='flex'>
                <DoctorSidebar />
                <section className='content'>
                    <div className='w-full py-4 flex justify-center items-center'>
                        <img className='w-10' src={doctorlogo} alt='doctor' />
                        <h2 className="sm:text-2xl font-semibold mx-3">Doctor Profile</h2>
                    </div>
                    <form onSubmit={handleSubmit} className='mx-12'>
                        <div className='grid grid-cols-1 md:grid-cols-2  gap-4 '>
                            <div className="input-box">
                                <label htmlFor="name" className="input-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={doctorData.name}
                                    onChange={handleChange}
                                    className="input-inside"
                                />
                                {/* {formErrors.name&&<p className='error'>{formErrors.name}</p>} */}
                            </div>

                            <div className="input-box">
                                <label htmlFor="email" className="input-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={doctorData.email}
                                    onChange={handleChange}
                                    className="input-inside"
                                    required
                                />
                                {/* {formErrors.email && <p className="error">{formErrors.email}</p>} */}
                            </div>
                            <div className="input-box">
                                <label htmlFor="mobile" className="input-label">
                                    Mobile
                                </label>
                                <input
                                    type="number"
                                    min='0'
                                    id="mobile"
                                    name="mobile"
                                    value={doctorData.mobile}
                                    onChange={handleChange}
                                    className="input-inside"
                                />
                                {/* {formErrors.mobile && <p className="error">{formErrors.mobile}</p>} */}
                            </div>
                            <div className="input-box">
                                <label htmlFor="password" className="input-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="Password"
                                    value={doctorData.Password}
                                    onChange={handleChange}
                                    className="input-inside"
                                    required
                                />
                                {/* {formErrors.password&&<p className='error'>{formErrors.password}</p>} */}
                            </div>
                            <div className="input-box md:col-span-2 flex flex-col">
                                <label htmlFor="hospital" className="input-label">
                                    Hospital
                                </label>
                                <select id='hospital' className='input appearance-none bg-white border border-gray-300 hover:border-gray-500 rounded p-2 pr-8 leading-tight focus:outline-none focus:border-gray-500' name='hospital_id' value={doctorData.hospital_id} onChange={handleChange}  required>
                                    <option value=''>-select-</option>
                                    {
                                        hospitals.map((object, index) => {
                                            return (<option key={index + 1} className='p-2' value={object.hospital_id} >{object.hospital_id}. {object.hospital}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="input-box">
                                <label htmlFor="speciality" className="input-label">
                                    Speciality
                                </label>
                                <input
                                    type="text"
                                    id="speciality"
                                    name="speciality"
                                    value={doctorData.speciality}
                                    onChange={handleChange}
                                    className="input-inside"
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="experience" className="input-label">
                                    Experience
                                </label>
                                <input
                                    type='number'
                                    min='0'
                                    id="experience"
                                    name="experience"
                                    value={doctorData.experience}
                                    onChange={handleChange}
                                    className="input-inside"
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="qualification" className="input-label">
                                    Qualification
                                </label>
                                <input
                                    id="qualification"
                                    name="qualification"
                                    value={doctorData.qualification}
                                    onChange={handleChange}
                                    className="input-inside"
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="fee" className="input-label">
                                    Fee
                                </label>
                                <input
                                    type='number'
                                    min='0'
                                    id="fee"
                                    name="fee"
                                    value={doctorData.fee}
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
            </div>

        </>
    )
}

export default DoctorUpdate