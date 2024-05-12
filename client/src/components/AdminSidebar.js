import React from 'react'
import { Link } from 'react-router-dom';
import dashboard from '../assets/dashboard.svg'
import doctorlogo from '../assets/doctor-black.svg'
import appointment from '../assets/appointment.svg'
import logout from '../assets/logout.svg'
import about from '../assets/about.svg'
function AdminSidebar(props) {
  // const id = sessionStorage.getItem('admin_id');
  // const name = sessionStorage.getItem('name')
  const list_items = [
    {
      icon:dashboard,
      item:'Dashboard',
      link:'/admin/admindashboard'
    },
    {
      icon:doctorlogo,
      item:'Doctors',
      link:'/admin/admindoctors'
    },
    {
      icon:appointment,
      item:'Appointments',
      link:'/admin/appointmentadmin'
    }
  ]
  return (
    <React.Fragment>
        <nav className='h-[90vh] w-1/5 ml-0 px-2 flex flex-col justify-between items-center bg-[#DCE8E2] shadow-sm'>
          <ul className="py-4">
            {list_items.map((item, i) => {
              return (
                <Link to={item.link} key={i} className={`list-item ${props.active === item.item ? 'bg-[#70B5A6] rounded-lg shadow-lg' : ''}`}>
                  <img src={item.icon} className='w-7' alt='' />
                  <h3 className='hidden lg:inline-block lg:text-sm '>{item.item}</h3>
                </Link>
              )
            })}
          </ul>

          <div className='my-4'>
            <Link to='/about' className='list-item'>
              <img src={about} className='w-7' alt='about' />
              <h3 className='hidden sm:inline-block sm:text-sm md:text-lg lg:text-xl px-2'>About Us</h3>
            </Link>
            <Link to='/' className='list-item' onClick={() => { sessionStorage.clear(); }}>
              <img src={logout} className='w-7 px-1' alt='logout' />
              <h3 className='hidden sm:inline-block sm:text-sm md:text-lg lg:text-xl px-1'>Logout</h3>
            </Link>
          </div>
        </nav>
    </React.Fragment>
  )
}

export default AdminSidebar