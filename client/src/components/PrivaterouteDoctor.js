import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'


export default function PrivaterouteDoctor(){
    const loggedInStatus = sessionStorage.getItem('account_type');
    if(loggedInStatus === 'doctor'){
        return(
            <React.Fragment>
                <Outlet/>
            </React.Fragment>
        )
    }else{
        return <Navigate to="/" />;
    }
}
