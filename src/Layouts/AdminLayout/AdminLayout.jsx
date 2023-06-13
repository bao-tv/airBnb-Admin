import React from 'react';
import {Outlet} from 'react-router-dom';
import AdminSidebar from '../../Components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';

function AdminLayout() {
  return (
    <>
        <AdminHeader/>
        <div className="d-flex">
            <AdminSidebar/>
            <Outlet/>
        </div>
    </>
  )
}

export default AdminLayout