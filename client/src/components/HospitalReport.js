import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
const HospitalReport = () => {

  const hospital_id = sessionStorage.getItem('admin_id');
  const { id } = useParams();
  const [hospital, setHospital] = useState({});
  const [fullDetail, setFullDetail] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8080/adminprofile/${hospital_id}`)
      .then(res => {
        // console.log(response);
        setHospital(res.data[0]);
      })
      .catch(error => {
        console.error(error);
        toast.error('Server connection error');
      });
  }, [hospital_id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hospitalappointmentreport/${hospital_id}/${id}`);
        console.log(response)
        setFullDetail(response.data[0]);
        console.log(fullDetail);
      } catch (error) {
        toast.error('Unable to fetch data.');
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };


  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-green-200">
          <h1 className="text-lg  font-extrabold ">{hospital.name}</h1>
          <p className="text-gray-600">{hospital.Email}</p>
          <p className="text-gray-600">{hospital.address}</p>
        </div>

        <div className="px-6 py-4">
          <div className="py-2 flex justify-between">
            <h2 className="text-xl font-medium  mb-2">Appointment Details</h2>
            <p>Date & Time: {fullDetail.appointment_date} - {fullDetail.appointment_time}</p>
          </div>
          <hr className="border-t" />
          <h2 className="text-xl font-semibold my-2">Patient Details</h2>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="font-medium">Name : {fullDetail.user_firstname} {fullDetail.user_lastname}</p>
              {/* <p className="text-wrap">Email: {fullDetail.user_email}</p> */}
              <p>📱 {fullDetail.user_mobile}</p>
              <p>📍 {fullDetail.user_address}</p>
            </div>
            <div>
              <p>Age: {fullDetail.age}</p>
              <p>Weight: {fullDetail.weight}kg</p>
              <p>Height: {fullDetail.height}</p>
            </div>
            <div>
              <p>Blood Pressure: {fullDetail.bloodpressure}</p>
              <p>Disease: {fullDetail.disease}</p>
              <p>Symptoms: {fullDetail.symptoms}</p>
            </div>
          </div>
        </div>
        <hr className="border-t mx-6" />
        <div className="w-full py-52"></div>
        <hr className="border-t mx-6" />
        <div className="px-6 py-4">
          {/* <h2 className="text-xl font-semibold mb-2">Doctor Details</h2> */}
          <p>Dr.{fullDetail.doctor_name}</p>
          <p>📧 {fullDetail.doctor_email}</p>
          <p>📱 {fullDetail.doctor_mobile}</p>
          <p>{fullDetail.qualification}</p>
          <p>{fullDetail.speciality} • {fullDetail.experience}years</p>
          {/* <p>Consultation Fee: ₹{fullDetail.fee}</p> */}
        </div>
        <div className="px-6 py-4 flex justify-center">
          <button
            onClick={handlePrint}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-5 rounded-lg"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalReport;
