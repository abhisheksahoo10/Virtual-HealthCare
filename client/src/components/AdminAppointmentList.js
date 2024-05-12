import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
// import doctorlogo from '../assets/doctor-prime.svg'; 
import AdminSidebar from './AdminSidebar';
import '../styles/Style.css';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function AdminAppointmentList() {

  const id = parseInt(sessionStorage.getItem('admin_id'));
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`http://localhost:8080/countappointments/${id}`)
          .then(response => {
            setAppointmentCount(response.data.appointmentsCount);
          })
          .catch(error => {
            toast.error('Uanable to fetch appointment')
            console.error('Error fetching appointment count:', error);
          });
        const response = await axios.get(`http://localhost:8080/hospitalappointments/${id}`);
        setAppointments(response.data);
        // console.log(response.data)
      } catch (error) {
        toast.error('Unable to fetch data.')
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);
  // console.log(appointments)

  return (
    <>
      <AdminNav />
      <section className='flex'>
        <AdminSidebar active='Appointments' />
        <div className='content'>
          <div className="overflow-x-auto">
            <h2 className='font-medium my-1'>Total Appointments : {appointmentCount}</h2>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Patient Details</th>
                  <th className="border px-4 py-2">Appointment Details</th>
                  <th className="border px-4 py-2">Doctor Details</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment.appointmentid}>
                    <td className="border px-4 py-2 text-wrap">
                      <p className='text-wrap text-lg'><span className='font-semibold'>{appointment.user_id}.</span> {appointment.user_firstname} {appointment.user_lastname}</p>
                      ✉️{appointment.user_email}<br />
                      📱{appointment.user_mobile}<br />
                      📍{appointment.user_address}<br />
                    </td>
                    <td className="border px-4 py-2">
                      <p className='inline-block'><span className='font-semibold'>{appointment.appointmentid}. </span>
                        {appointment.confirmed === 1 ? (<span className='px-1.5 py-0.5 rounded-md bg-green-200'>✅Confirmed</span>) : (<span className='px-2 py-0.5 rounded-md bg-red-200'>⏳pending</span>)}</p>
                      <p className='inline mx-0.5 px-1.5 py-0.5 rounded-lg bg-slate-200'><span>🗓️{appointment.appointment_date}</span> <span>🕐{appointment.appointment_time}</span></p><br />
                      Age: {appointment.age}<br />
                      Weight: {appointment.weight}<br />
                      Height: {appointment.height}<br />
                      BP: {appointment.bloodpressure}<br />
                      Disease: {appointment.disease}<br />
                      Symptoms: {appointment.symptoms}<br />
                      {appointment.confirmed === 1 &&
                        <p className='text-right'>
                          <Link to={`report/${appointment.appointmentid}`} >
                            <button className='bg-blue-200 hover:bg-blue-300  text-sm py-1 px-3 rounded-md'>Report</button>
                          </Link>
                        </p>
                      }
                    </td>
                    <td className="border px-4 py-2">
                      <p className='text-wrap text-lg'><span className='font-semibold'>{appointment.doctor_id}.</span> {appointment.doctor_name}</p>
                      ✉️{appointment.doctor_email}<br />
                      📱{appointment.doctor_mobile}<br />
                      Speciality: {appointment.speciality} • {appointment.experience}year<br />
                      Qualification: {appointment.qualification}<br />
                      Fee: {appointment.fee}
                    </td>
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

export default AdminAppointmentList; 
