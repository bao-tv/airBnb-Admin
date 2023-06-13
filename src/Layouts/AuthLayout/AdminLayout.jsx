import React from 'react';
import {Outlet} from 'react-router-dom';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';

function AuthLayout() {
  return (
    <div>
        <AdminHeader/>

        <Outlet/>
    </div>
  )
}

export default AuthLayout