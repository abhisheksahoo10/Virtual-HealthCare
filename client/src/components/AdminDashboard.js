import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNav from './AdminNav';
import doctorlogo from '../assets/doctor-prime.svg';
import AdminSidebar from './AdminSidebar';
import '../styles/Style.css';
function AdminDashboard() {
  const hospitalId = sessionStorage.getItem('admin_id')
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {

    axios.get(`http://localhost:8080/counthospitaldoctors/${hospitalId}`)
      .then(response => {
        setDoctorCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching doctor count:', error);
      });

    axios.get(`http://localhost:8080/countappointments/${hospitalId}`)
      .then(response => {
        setAppointmentCount(response.data.appointmentsCount);
      })
      .catch(error => {
        console.error('Error fetching appointment count:', error);
      });

    axios.get(`http://localhost:8080/countusers_with_appointments/${hospitalId}`)
      .then(response => {
        setUserCount(response.data.numUsersWithAppointments);
      })
      .catch(error => {
        console.error('Error fetching appointment count:', error);
      });
  }, [hospitalId]);

  const [specificDoctors, setSpecificDoctors] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/doctors/${hospitalId}`)
      .then(response => {
        console.log('Doctors data:', response.data);
        setSpecificDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, [hospitalId]);
  return (
    <>
      <AdminNav />
      <div className='flex'>
        <AdminSidebar active='Dashboard' />
        <section className='content'>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            <Link to='/admin/admindoctors' className="bg-emerald-200 p-4 py-8 rounded-lg">
              <h2 className="text-xl text-center font-semibold mb-2">Doctors</h2>
              <p className="text-3xl text-center font-bold">{doctorCount}</p>
            </Link>
            <Link to='/admin/appointmentadmin' className="bg-emerald-200 p-4 py-8 rounded-lg">
              <h2 className="text-xl text-center font-semibold mb-2">Appointments</h2>
              <p className="text-3xl text-center font-bold">{appointmentCount}</p>
            </Link>
            <div className='bg-emerald-200 p-4 py-8 rounded-lg'>
              <h2 className="text-xl text-center font-semibold mb-2">Patients</h2>
              <p className="text-3xl text-center font-bold">{userCount}</p>
            </div>
          </div>
          <h1 className="text-2xl font-bold my-6">Hospital Doctors</h1>
          {specificDoctors.map((doctor, i) => {
            return (
              <div key={i} className="relative md:flex items-center justify-start bg-white shadow-md rounded-lg p-6 my-4">
                <div className="md:flex justify-center items-center ">
                  <img src={doctorlogo} alt="Logo" className=" w-12  h-auto m-4 rounded-full" />
                  <div>
                    <h2 className="md:text-xl font-semibold text-gray-800">{doctor.doctor_id} Dr. {doctor.name}</h2>
                    <p className="text-sm text-gray-600">{doctor.email}</p>
                    <p className="text-sm text-gray-600">Ph no. : {doctor.mobile}</p>
                  </div>
                </div>
                <div className='md:mx-5'>
                  <p className="text-sm text-gray-700">Speciality : {doctor.speciality} • {doctor.experience} years</p>
                  <p className="text-sm text-gray-700">Qualification: {doctor.qualification}</p>
                  <p className="text-sm text-gray-700">Fee: {doctor.fee}</p>
                </div>

                {/* <button className="absolute bottom-4 right-4 bg-emerald-100 hover:bg-emerald-500 py-2 px-4 rounded-xl shadow-md focus:outline-none">View</button> */}
              </div>
            )
          })}
        </section>
      </div>
    </>
  )
}

export default AdminDashboard