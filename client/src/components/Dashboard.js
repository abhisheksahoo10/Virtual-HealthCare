import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import doctorlogo from '../assets/doctor-black.svg'
import '../styles/Style.css'
import axios from 'axios'

function Home() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/doctors')
      .then(response => {
        setDoctors(response.data)
      })
  }, [])

  return (
    <>
      <Navbar />
      <section className='flex'>

        <Sidebar active="Dashboard" />

        <section className='content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {
            doctors.map((doctor, i) => {
              return (
                <Link to={`/user/bookappointment/${doctor.doctor_id}`} key={i} className='py-4 px-6 rounded-2xl shadow-lg h-fit'>
                  <div className='w-full  my-2 '>
                    <img src={doctorlogo} className='w-16 h-16 mx-auto p-2 rounded-full border-4 border-green-500'></img>
                  </div>
                  <div className=''>
                    <h3 className='text-green-900 font-semibold'>Dr.{doctor.name}</h3>
                    <p className='text-sm text-gray-500'>📧 {doctor.email}</p>
                    <p className='text-sm text-gray-500'>📱 {doctor.mobile}</p>
                  </div>
                  <div className='pt-2'>
                    <h6 className='text-sm text-gray-900 text-wrap'>🏥Hospital : {doctor.hospital_name}</h6>
                    <p className='text-sm text-gray-700 '>Speciality : {doctor.speciality} • {doctor.experience} Years</p>
                    <p className='text-sm text-gray-700 '>Qualification : {doctor.qualification} • Charges : ₹{doctor.fee}</p>
                  </div>
                </Link>
              )
            })
          }
        </section>
      </section>

    </>
  )
}

export default Home