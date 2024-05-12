import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Logo.svg'
import adminlogo from '../assets/Admin-black.svg'

function AdminNav(props) {
  const id = sessionStorage.getItem('admin_id');
  const name = sessionStorage.getItem('name')
  
  return (
    <React.Fragment>
      <header className='top-0 py-2 w-full z-999 bg-[#70B5A6] flex justify-between items-center shadow-md'>
        <div className='flex items-center mx-10'>
          <img src={logo} className='w-10 my-4 pb-1' alt='logo' />
          <h1 className='sm:text-xl font-bold mx-4 drop-shadow-sm'>V+ HealthCare</h1>
        </div>
        <div className='flex justify-center items-center mx-2'>
          <Link to={`/admin/adminprofile/${id}`} className={`flex items-center px-3 mx-2 rounded-lg ${props.active === 'profile' ? 'bg-emerald-400 border-2 border-black shadow-xl' : 'bg-emerald-100'}`}>
            <img src={adminlogo} className='w-8 my-3' alt='user' />
            <h2 className='hidden sm:inline mx-2'>{name}</h2>
          </Link>
          {/* <img src={bell} className='w-12 p-3 mx-4 bg-emerald-200 rounded-lg' alt='notification' /> */}
        </div>
      </header>
      
    </React.Fragment>
  )
}

export default AdminNav