import React from 'react';
import {Outlet} from 'react-router-dom';
import AdminSidebar from '../../Components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import style from "./AdminLayout.module.scss";

function AdminLayout() {
  return (
    <>
      <AdminHeader/>
      <div className={style.adminShow}>
          <AdminSidebar/>
          <Outlet/>
      </div>
      <div className={style.adminInfo}>
        <div className={`container ${style.detail}`}>
          {/* <img src='/img/admin.gif' alt="" /> */}
          <p>Hệ thống chỉ hỗ trợ cho kích thước màn hình destop</p>
        </div>
      </div>
    </>
  )
}

export default AdminLayout