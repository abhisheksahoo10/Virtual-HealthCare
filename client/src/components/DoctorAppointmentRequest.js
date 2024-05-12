import { React, useEffect, useState } from 'react'
import DoctorNavbar from './DoctorNavbar'
import DoctorSidebar from './DoctorSidebar'
import '../styles/Style.css'
import axios from 'axios'
import toast from 'react-hot-toast'
function DoctorAppointmentRequest() {
  const id = sessionStorage.getItem('doctor_id');
  const [requests, setRequests] = useState([]);

  const fetchAllAppointmentList=()=>{
    axios.get(`http://localhost:8080/doctorappointment/${id}`)
      .then(response => {
        setRequests(response.data.filter(allrequests => allrequests.confirmed !== 1));

      })
      .catch(err => toast.error("Unable to connect to server"));
  }
  useEffect(() => {
    fetchAllAppointmentList();
  },[]);

  const handleDelete = (appointmentid) => {
    try {
      toast.loading("Deleting ...")
      axios.delete(`http://localhost:8080/deleteappointment/${appointmentid}`)
        .then(response => {
          toast.dismiss();
          toast(response.data.message,
            {
              icon: '🚮',
              style: {
                borderRadius: '10px',
                background: '#fff',
                color: '#000',
              },
            }
          );
          fetchAllAppointmentList();
          
        })
        .catch(err => {
          console.error(err);
          toast.dismiss();
          toast.error("Error deleting appointment. Please try again.");
        });
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error('Server connection error')
    }
  }

  const handleConfirm = (appointmentid) => {
    try {
      toast.loading("Confirming ...")
      axios.put(`http://localhost:8080/confirmappointment/${appointmentid}`)
        .then(response => {
          toast.dismiss();
          toast.success("Appointment Confirmed")
          fetchAllAppointmentList();
        })
        .catch(err => {
          console.error(err);
          toast.dismiss();
          toast.error("Error confirming appointment. Please try again.");
        });
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error('Server connection error');
    }
  };
  

  return (
    <>
      <DoctorNavbar />
      <section className='flex'>
        <DoctorSidebar active='Requests' />
        <div className='content'>
          <div className=" lg:p-6 ">
            <h2 className="text-2xl font-bold mb-4">Appointment Requests</h2>
            {requests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((appointment, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                    <p className="text-gray-600 inline-block p-1 bg-slate-100 rounded-md mb-2">📆 {appointment.appointment_date} - ⏰ {appointment.appointment_time}</p>
                    <h3 className="text-xl font-semibold mb-2">Patient : {appointment.firstname} {appointment.lastname}</h3>
                    <p className='font-semibold mb-2'>Details : </p>
                    <p className="text-gray-600 mb-2">Height : {appointment.height}</p>
                    <p className='text-gray-600 mb-2'>Weight : {appointment.weight}</p>
                    <p className='text-gray-600 mb-2'>Bloodpressure : {appointment.bloodpressure}</p>
                    <p className="text-gray-600 mb-2">Disease : {appointment.disease}</p>
                    <p className="text-gray-600 mb-2">Symptoms : {appointment.symptoms}</p>
                    <div className='flex justify-end gap-2'>
                      <button onClick={() => { handleConfirm(appointment.appointmentid) }} className='px-3 py-1 rounded-md shadow-md bg-green-200'>Confirm</button>
                      <button onClick={() => { handleDelete(appointment.appointmentid) }} className='px-3 py-1 rounded-md shadow-md bg-red-200  '>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No new Requests pending⏱️</p>
            )}
          </div>

        </div>
      </section>
    </>
  )
}

export default DoctorAppointmentRequest