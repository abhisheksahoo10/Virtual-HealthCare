import { React, useEffect, useState } from 'react'
import DoctorNavbar from './DoctorNavbar'
import DoctorSidebar from './DoctorSidebar'
import '../styles/Style.css'
import axios from 'axios'
import toast from 'react-hot-toast'
function DoctorAppointment() {
  const id = sessionStorage.getItem('doctor_id');
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/doctorappointment/${id}`)
      .then(response => {
        setConfirmedAppointments(response.data.filter(appointment => appointment.confirmed === 1));
      })
      .catch(err => toast.error("Unable to connect to server"));
  }, []);

  return (
    <>
      <DoctorNavbar />
      <section className='flex'>
        <DoctorSidebar active='Appointment' />
        <div className='content'>
          <div className=" lg:p-6 ">
            <h2 className="text-2xl font-bold mb-4">Appointment List</h2>
            {confirmedAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {confirmedAppointments.map((appointment, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                    <p className="inline-block p-1 text-gray-600 bg-slate-100 rounded-md mb-2">📆 {appointment.appointment_date} - ⏰ {appointment.appointment_time}</p>
                    <h3 className="text-xl font-semibold mb-2">Patient : {appointment.firstname} {appointment.lastname}</h3>
                    <p className='font-semibold mb-2'>Details : </p>
                    <p className="text-gray-600 mb-2">Height : {appointment.height}</p>
                    <p className='text-gray-600 mb-2'>Weight : {appointment.weight}</p>
                    <p className='text-gray-600 mb-2'>Bloodpressure : {appointment.bloodpressure}</p>
                    <p className="text-gray-600 mb-2">Disease : {appointment.disease}</p>
                    <p className="text-gray-600 mb-2">Symptoms : {appointment.symptoms}</p>
                    </div>
                ))}
              </div>
            ) : (
              <p>No appointments available 📪</p>
            )}
          </div>

        </div>
      </section>
    </>
  )
}

export default DoctorAppointment