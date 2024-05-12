import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home.js';
import About from './components/About';
import Login from './components/Login';
import DoctorLogin from './components/LoginDoctor.js';
import AdminLogin from './components/Login_admin.js';
import Register from './components/Register';
import RegisterDoctor from './components/RegisterDoctor.js';
import RegisterAdmin from './components/Register_admin.js';
import Privateroute from './components/Privateroute';
import PrivaterouteDoctor from './components/PrivaterouteDoctor.js';
import PrivaterouteAdmin from './components/Privateroute_admin.js';
import Dashboard from './components/Dashboard.js'
import Appointment from './components/Appointment';
import Hospitals from './components/Hospitals.js';
import Userprofile from './components/Userprofile.js';
import BookAppointment from './components/BookAppointment.js';
import UpdateUserProfile from './components/UpdateUserProfile.js'
import Doctorprofile from './components/Doctorprofile.js';
import DoctorAppointment from './components/DoctorAppointment.js';
import DoctorAppointmentRequest from './components/DoctorAppointmentRequest';
import AdminDashboard from './components/AdminDashboard.js';
import AdminProfile from './components/AdminProfile.js';
import AdminAppointmentList from './components/AdminAppointmentList.js';
import AdminProfileupdate from './components/AdminProfileupdate.js';
import AdminDoctors from './components/Admindoctors.js';
import DoctorUpdate from './components/Doctorupdate.js';
import HospitalReport from './components/HospitalReport.js';
function App() {
  return (
    <React.Fragment>
      <Router>
      <Toaster position="top-center" reverseOrder={false}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/doctorlogin' element={<DoctorLogin />} />
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/register' element={<Register />} />
          <Route path='/doctorregister' element={<RegisterDoctor/>} />
          <Route path='/adminregister' element={<RegisterAdmin />} />
          <Route path='/user' element={<Privateroute />}>
            <Route path='userhome' element={<Dashboard />} />
            <Route path='hospitals' element={<Hospitals />} />
            <Route path='userappointment' element={<Appointment />} />
            <Route path='userprofile/:id' element={<Userprofile />} />
            <Route path='updateuser/:id' element={<UpdateUserProfile />} />
            <Route path='bookappointment/:id' element={<BookAppointment/>}/>
          </Route>
          <Route path='/admin' element={<PrivaterouteAdmin/>} >
            <Route path='adminprofile/:id' element={<AdminProfile/>}/>
            <Route path='updateadmin/:id' element={<AdminProfileupdate/>}/>
            <Route path='admindoctors' element={<AdminDoctors/>}/>
            <Route path='admindashboard' element={<AdminDashboard/>} />
            <Route path='appointmentadmin' element={<AdminAppointmentList/>}/>
            <Route path='appointmentadmin/report/:id' element={<HospitalReport/>} />
          </Route>
          <Route path='/doctor' element={<PrivaterouteDoctor/>} >
            <Route path='doctorprofile/:id' element={<Doctorprofile/>} />
            <Route path='updatedoctor/:id' element={<DoctorUpdate/>} />
            <Route path='doctorappointment' element={<DoctorAppointment/>}/>
            <Route path='appointmentrequests' element={<DoctorAppointmentRequest/>}/>
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
