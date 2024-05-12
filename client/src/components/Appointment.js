import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import '../styles/Style.css'
import axios from 'axios';
import toast from 'react-hot-toast';
function Appointment() {
  const id = sessionStorage.getItem('user_id');
  const [appointments, setAppointment] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/userappointment/${id}`)
      .then(response =>
        setAppointment(response.data)
      ).catch(err => toast.error("unable to connect server"))
  },)

  return (
    <>
      <Navbar />
      <section className='flex'>
        <Sidebar active='Appointment' />
        <section className='content'>
          <div className=" p-6 ">
            <h2 className="text-2xl font-bold mb-4">Appointment List</h2>
            {appointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map((appointment, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 lg:p-6 shadow-md">
                    <p className="text-gray-600 bg-slate-200 inline-block p-1 rounded-md mb-2">📆 {appointment.appointment_date} - ⏰ {appointment.appointment_time}</p>
                    <h3 className="text-xl font-semibold mb-2">Dr.{appointment.name}</h3>
                    <h6 className='font-semibold mb-2'>Your details:</h6>
                    <p className="text-gray-600 mb-1">
                      Height : {appointment.height}<br/>
                      Weight : {appointment.weight}<br/>
                      Bloodpressure : {appointment.bloodpressure}</p>
                    <p className="text-gray-600 mb-2">Disease : {appointment.disease}</p>
                    <p className="text-gray-600 mb-2">Symptoms : {appointment.symptoms}</p>
                    <div className='flex justify-end'>
                      {appointment.confirmed === 1
                        ? (<span className=' bg-green-100 px-2 p-1 rounded-lg'>✅Confirmed</span>)
                        : (<span className=' text-red-600 bg-red-100 px-2 p-1 rounded-lg'>⏱️Pending</span>)
                      }
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No appointments available 📪</p>
            )}
          </div>

        </section>
      </section>
    </>
  )
}

export default Appointment