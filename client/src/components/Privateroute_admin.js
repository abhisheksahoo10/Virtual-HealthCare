import React from 'react'
import { Outlet , Navigate } from 'react-router-dom'
export default function Privateroute_admin() {
  
  const loggedInStatus = sessionStorage.getItem('account_type');
  if(loggedInStatus === 'admin'){
    return (
      <React.Fragment>
          <Outlet/>
      </React.Fragment>
    )
  }else{
    return <Navigate to="/" />;
  }
 
}
