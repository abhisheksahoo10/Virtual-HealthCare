import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Style.css'
import logo from '../assets/Logo.svg'
import Arrow from '../assets/arrow.svg'
import Hero from '../assets/hero.png'
import Hero2 from '../assets/imagedr.png'
import userlogo from '../assets/user.svg'
import doctorlogo from '../assets/doctor-prime.svg'
import adminlogo from '../assets/Admin.svg'
import Appointment from '../assets/appointment.png'
import Virtual from '../assets/virtual.png'
import Doctor from '../assets/doctor.png'
import service1 from '../assets/i9.png'
import service2 from '../assets/i6.png'

// import About from '../components/About'

function Welcome() {
    const currentYear = new Date().getFullYear();
    const entities = [
        {
            image: userlogo,
            type: "User",
            desc: "Access personalized healthcare services and schedule appointments.",
            link: '/login'
        },
        {
            image: doctorlogo,
            type: "Doctor",
            desc: "Connect with patients and appointments for efficient healthcare delivery.",
            link: '/doctorlogin'
        },
        {
            image: adminlogo,
            type: "Admin",
            desc: "Manage and oversee platform , including doctor accounts and appointments.",
            link: '/adminlogin'
        },
    ]
    const features = [
        {
            image: Appointment,
            heading: 'Doctor Appointment',
            description: 'Application for scheduling an appointment with your doctor for a consultation.',
        },
        {
            image: Virtual,
            heading: 'Virtual Access',
            description: 'Access your doctor virtually through video conferencing or telemedicine.',
        },
        {
            image: Doctor,
            heading: 'Doctor ID Creation',
            description: 'Create or manage your unique doctor ID for secure access to medical services.',
        },

    ];
    return (
        <React.Fragment>

            <section className='bg-emerald-50'>
                <header>
                    <nav className='w-full pt-6 pb-1 px-5 flex  justify-between items-center  '>
                        <img src={logo} className='w-10 mx-2 sm:mx-10' alt='' />
                        <ul className='hidden sm:flex'>
                            <li className='mx-1 sm:mx-4'><a href='#services'>Services</a></li>
                            <li className='mx-1 sm:mx-4'><a href='#features'>Features</a></li>
                            <li className='mx-1 sm:mx-4'><Link to='/about'>About</Link></li>
                        </ul>
                        <Link to='/login' className='mx-2 sm:mx-10 py-2 px-6  rounded-full  text-emerald-800 bg-green-300'>Login</Link>
                    </nav>
                </header>
                <div className='flex flex-col-reverse justify-evenly items-center md:flex-row '>
                    <div className="text-center sm:text-left mx-6 my-4">
                        <p className='text-sm inline-block px-2 py-1 text-emerald-700 bg-emerald-50 border-2 border-emerald-400 rounded-md'>Empowering Your Well-being Virtually</p>
                        <h2 className="name-font text-6xl  lg:text-8xl">V+ Healthcare</h2>
                        <p className="text-gray-600 text-xl  text-wrap">Start Your Virtual Health Journey Today!</p>
                        <div className='flex justify-center sm:justify-start items-center mt-3'>
                            <p className='text-gray-700 text-xl sm:text-3xl '>Let's <span>Get Started</span></p>
                            <Link to='/register'><img src={Arrow} className='arrow px-5 w-24' alt='arrow' /></Link>
                        </div>
                    </div>
                    <div className='mx-6 my-4 sm:w-1/3'>
                        <img className='rounded-full mix-blend-darken' src={Hero} alt='hero' />
                    </div>
                </div>
                <div className='mx-10 md:mx-20 p-3 border-y-2 flex justify-evenly'>
                    {
                        entities.map((entity, index) => {
                            return (
                                <Link to={entity.link} key={index} className='flex items-center'>
                                    <img src={entity.image} className='w-5' alt={entity.type} />
                                    <p className='text-sm text-green-500 mx-2'>{entity.type}</p>
                                </Link>
                            )
                        })
                    }
                </div>
            </section>
            {/* profile */}
            <section className='py-12 bg-emerald-50'>
                <h2 className="text-3xl font-bold text-center mb-8">Profiles</h2>
                <div className="flex flex-col sm:flex-row justify-center items-center bg-emerald-50 px-8 md:px-32">
                    {entities.map((entity, index) => (
                        <Link to={entity.link} key={index} className="flex flex-col items-center justify-center bg-green-100 rounded-lg shadow-2xl p-8 m-4">
                            <img src={entity.image} alt={entity.type} className="w-20 h-auto rounded-type mb-4" />
                            <h2 className="text-xl font-semibold mb-2">{entity.type}</h2>
                            <p className="text-gray-700">{entity.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="py-12 bg-emerald-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-center">
                    <div className="lg:w-1/3 ">
                        <img className="w-full h-auto object-cover rounded-2xl" src={Hero2} alt="Healthcare" />
                    </div>
                    <div className="my-5 lg:w-1/3 lg:ml-12">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
                                Why Choose Us
                            </h2>
                            <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-xl text-gray-500">
                                Convenient and accessible healthcare from anywhere. Secure and confidential consultations. Easy-to-use platform for seamless healthcare experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id='services' className="container bg-emerald-50 mx-auto px-4 lg:px-10 py-10">
                <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
                <div className="lg:w-2/3 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 ">
                    <div className="flex flex-col items-center justify-center bg-emerald-100  p-10 rounded-3xl shadow-lg">
                        <img src={service1} alt="Healthcare Service 1" className="w-2/3 h-auto rounded-xl mb-4" />
                        <h3 className="text-xl text-center font-bold mb-2">Appointment Scheduling</h3>
                        <p className="text-center">Effortlessly book appointments with your healthcare provider through our user-friendly online scheduling system. Say goodbye to long hold times and missed calls!</p>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-emerald-100 p-6 rounded-3xl shadow-lg">
                        <img src={service2} alt="Healthcare Service 2" className="w-2/3 h-auto rounded-xl mb-4" />
                        <h3 className="text-xl text-center font-bold mb-2">Admin Panel for Management</h3>
                        <p className="text-center">Effortlessly oversee all aspects of your healthcare practice with our intuitive admin panel. Access and manage doctors, patients, and appointments seamlessly, ensuring efficient scheduling and smooth operations.</p>
                    </div>
                </div>
            </section>

            <section className='bg-emerald-50 py-10' id='features'>
                <h2 className='heading'>App Features</h2>
                <div className='flex flex-col items-center sm:flex-row justify-center '>
                    {
                        features.map((feature, index) => {
                            return (
                                <div key={index} className="card">
                                    <img className="w-full" src={feature.image} alt='appointment' />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{feature.heading}</div>
                                        <p className="text-gray-700 text-base">{feature.description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </section>

            <section className="py-8 mt-20 ">
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <div className="w-full md:w-2/3 lg:w-1/2">
                            <div className="bg-green-100 p-6 shadow-md rounded-lg text-center">
                                <h2 className="text-2xl font-bold mb-4">Get Started Today!</h2>
                                <Link to='/register'>
                                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">Get full Access</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-black text-white w-full">
                <div className='p-10 lg:px-20'>
                    <h1 className='my-5 font-semibold text-3xl'>About Us</h1>
                    <hr />
                    <div className='sm:grid grid-cols-3 my-6 '>
                        <div>
                            <p className='my-2'>Project :</p>
                            <h5 className='text-5xl text-green-300 font-semibold'>V+ HealthCare</h5>
                            <p className='text-2xl my-4'>USBM - MCA [2022-24]</p>
                            <p className=''>Project Group - 9</p>
                        </div>
                        <div></div>
                        <div>
                            <p className='text-sm mb-3'>Design and Devloped by</p>
                            <a className='block text-2xl font-medium ' href='https://abhisheksahoo10-portfolio.netlify.app/' target="_blank" rel="noopener noreferrer">Abhishek Sahoo [Lead]</a>
                            <a className='block text-xl font-medium' href='https://www.instagram.com/wow._.how'>Lipa Swain</a>
                            <a className='block text-xl font-medium' href='https://www.instagram.com/aastha_priyambada'>Aastha priyambada Sahoo</a>
                            <a className='block text-xl font-medium' href='https://www.instagram.com/uk_asita'>Asita Das</a>
                            <a className='block text-xl font-medium' href='https://www.instagram.com/_sweet_googly_'>Anindita Das</a>
                            <a className='block text-xl font-medium' href='https://www.instagram.com/s.u.b.h.a.s.i.s.h.31'>N Subhasish</a>
                            <p className='block text-xl font-medium' >Deeptisikha Mohanty</p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto py-8">
                    <div className="border-t border-gray-600 pt-8 text-sm text-gray-400 flex justify-evenly">
                        <p>&copy; {currentYear} V+ Healthcare. All rights reserved.</p>
                        <div className="flex space-x-4">
                            <p className="text-gray-400 hover:text-white transition duration-300 ease-in-out">Privacy Policy</p>
                            <p className="text-gray-400 hover:text-white transition duration-300 ease-in-out">Terms of Service</p>
                            <p className="text-gray-400 hover:text-white transition duration-300 ease-in-out">Contact Us</p>
                        </div>
                    </div>
                </div>
            </footer>


        </React.Fragment>
    )
}

export default Welcome