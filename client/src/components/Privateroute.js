import React from 'react'
import { Outlet , Navigate } from 'react-router-dom'
export default function Privateroute() {
  
  const loggedInStatus = sessionStorage.getItem('isLoggedIn');
  if(loggedInStatus === 'true'){
    return (
      <React.Fragment>
          <Outlet/>
      </React.Fragment>
    )
  }else{
    return <Navigate to="/" />;
  }
 
}
