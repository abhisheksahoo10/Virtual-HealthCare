import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
// import doctorlogo from '../assets/doctor-prime.svg';
import AdminSidebar from './AdminSidebar';
import '../styles/Style.css';
import toast from 'react-hot-toast';

function AdminDoctors() {

  const id = parseInt(sessionStorage.getItem('admin_id'));

  const [doctorCount, setDoctorCount] = useState(0);
  const [specificDoctors, setSpecificDoctors] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/counthospitaldoctors/${id}`)
      .then(response => {
        setDoctorCount(response.data.count);
      })
      .catch(error => {
        toast.error("Server connection Error.")
        console.error('Error fetching doctor count:', error);
    });
    axios.get(`http://localhost:8080/doctors/${id}`)
      .then(response => {
        console.log('Doctors data:', response.data);
        setSpecificDoctors(response.data);
      })
      .catch(error => {
        toast.error("Server connection Error.")
        console.error('Error fetching doctors:', error);
      });
  }, [id]);


  return (
    <>
      <AdminNav />
      <section className='flex'>
        <AdminSidebar active='Doctors' />
        <div className='content'>
          <div className="container mx-auto mt-4">
            <div className='flex  justify-between'>
              <h1 className="text-2xl font-bold mb-5">Doctors Table 🩺</h1>
              <h2 className='text-xl font-medium'>Total Doctors: {doctorCount}</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header">ID</th>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Mobile</th>
                  <th className="table-header">Speciality</th>
                  <th className="table-header">Experience</th>
                  <th className="table-header">Qualification</th>
                  <th className="table-header">Fee</th>
                  {/* <th className="table-header">Action</th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {specificDoctors.map(doctor => (
                  <tr key={doctor.doctorid}>
                    <td className="px-6 py-4 whitespace-nowrap">{doctor.doctor_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doctor.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doctor.mobile}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doctor.speciality}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doctor.experience}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doctor.qualification}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doctor.fee}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap"></td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminDoctors;
