import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar'
import '../styles/Style.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import doctorlogo from '../assets/doctor-prime.svg';
function BookAppointment() {
  const { id } = useParams();
  const [doctorData, setDoctorData] = useState({});

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/appointmentdoctor/${id}`);
        setDoctorData(response.data);
      } catch (error) {
        toast.error("Error fetching doctor profile:")
      }
    };

    fetchDoctorProfile();
  }, []);
  console.log(doctorData)

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zeros if month or day is less than 10
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    user_id: sessionStorage.getItem("user_id"),
    age: '',
    weight: '',
    bloodpressure: '',
    height: '',
    disease: '',
    symptoms: '',
    appointment_date: getCurrentDate(),
    appointment_time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.loading("Booking Appointment...");
      const response = await axios.post(`http://localhost:8080/bookappointment/${id}`, formData);
      console.log(response);
      if (response.data.message === 'success') {
        toast.dismiss();
        toast('Appointment Booked!',
          {
            icon: '✅',
            style: {
              borderRadius: '10px',
              background: '#fff',
              color: '#000',
            },
          }
        );
        setFormData({
          age: '',
          weight: '',
          bloodpressure: '',
          height: '',
          disease: '',
          symptoms: '',
          appointment_date: '',
          appointment_time: '',
        });
      } else {
        toast.dismiss();
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.dismiss();
      toast.error('unable to connect Server')
    }

  };


  return (
    <>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <section className='content md:grid grid-cols-5 gap-2'>
          <div className='col-span-2 '>
            <div className='w-full pt-8 pb-6 flex justify-center items-center'>
              <img className='w-10' src={doctorlogo} alt='doctor' />
              <h2 className="sm:text-2xl font-semibold mx-3">Doctor Profile</h2>
            </div>
            <hr className='p-1  mx-3 lg:mx-10 rounded-full bg-green-300' />
            <div className="p-6 lg:px-12 mx-auto">
              <h2 className="text-2xl font-semibold mb-4">{doctorData.doctor_name}</h2>
              <p className="text-gray-600 mb-2">✉️ {doctorData.doctor_email}</p>
              <p className="text-gray-600 mb-2">📱 {doctorData.doctor_mobile}</p>
              <p className="text-gray-600 mb-2">🏥Hospital: {doctorData.hospital_name}</p>
              <p className="text-gray-600 mb-2">Hospital Address: {doctorData.hospital_address}</p>
              <p className="text-gray-600 mb-2">Speciality: {doctorData.speciality}</p>
              <p className="text-gray-600 mb-2">Experience: {doctorData.experience}</p>
              <p className="text-gray-600 mb-2">Qualification: {doctorData.qualification}</p>
              <p className="text-gray-600 mb-2">Fee: {doctorData.fee}</p>
            </div>
          </div>
          <div className="w-full col-span-3  bg-[#b8e6db] p-5 mx-auto shadow-xl rounded-xl">
            <h1 className="text-3xl font-bold my-3">Book Appointment</h1>
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div className="mb-4">
                  <label htmlFor="age" className="block text-gray-700 font-bold mb-2">Age:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min='0'
                    value={formData.age}
                    onChange={handleChange}
                    className="input-inside  text-gray-700 "
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="weight" className="block text-gray-700 font-bold mb-2">Weight:</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    min='0'
                    value={formData.weight}
                    onChange={handleChange}
                    className="input-inside text-gray-700 "
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="bloodpressure" className="block text-gray-700 font-bold mb-2">Blood Pressure:</label>
                  <input
                    type="text"
                    id="bloodpressure"
                    name="bloodpressure"
                    value={formData.bloodpressure}
                    onChange={handleChange}
                    className="input-inside text-gray-700 "
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="height" className="block text-gray-700 font-bold mb-2">Height:</label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    min='0'
                    value={formData.height}
                    onChange={handleChange}
                    className="input-inside text-gray-700 "
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="disease" className="block text-gray-700 font-bold mb-2">Disease:</label>
                <input
                  type="text"
                  id="disease"
                  name="disease"
                  value={formData.disease}
                  onChange={handleChange}
                  className="input-inside text-gray-700 "
                />
              </div>

              <div className="mb-4">
                <label htmlFor="symptoms" className="block text-gray-700 font-bold mb-2">Symptoms:</label>
                <textarea
                  type="text"
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  className="input-inside text-gray-700 "
                />
              </div>

              <div className="mb-4">
                <label htmlFor="appointment_date" className="block text-gray-700 font-bold mb-2">Appointment Date:</label>
                <input
                  type="date"
                  id="appointment_date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleChange}
                  min={getCurrentDate()}
                  className="input-inside text-gray-700 "
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="appointment_time" className="block text-gray-700 font-bold mb-2">Appointment Time:</label>
                <input
                  type="time"
                  id="appointment_time"
                  name="appointment_time"
                  value={formData.appointment_time}
                  onChange={handleChange}
                  className="input-inside text-gray-700 "
                  required
                />
              </div>

              <div className="mb-6">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>

        </section>
      </div>
    </>
  )
}

export default BookAppointment