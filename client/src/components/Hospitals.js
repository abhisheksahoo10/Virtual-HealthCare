import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import doctorlogo from '../assets/doctor-prime.svg'
import '../styles/Style.css'
function Hospitals() {
  return (
    <div className='h-screen'>
        <Navbar/>
        <div className='flex'>
            <Sidebar active='Hospital'/>
            <section className='content'></section>
        </div>
    </div>
  )
}

export default Hospitals