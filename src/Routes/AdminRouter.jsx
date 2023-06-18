// import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import Swal from 'sweetalert2';

function AdminRouter({children}) {
    const {user} = useSelector((state) => state.user);
    // console.log(user);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    // console.log(user);
    // nếu chưa có đăng nhập và mã loại người dùng ko phải là quản trị, điều hướng về trang Home
    if(!user || user.user.role !== "ADMIN") {
        Swal.fire({
            title: "Bạn phải đăng nhập tài khoản Admin để tiếp tục",
            text: "Nhấn Ok để đến trang đăng nhập!",
            icon: "success",
            confirmButtonColor:'#ff395c',
          }).then((willSuccess) => {
            // console.log(willSuccess);
            if (willSuccess ) {
                navigate(`/signin?redireactUrl=${pathname}`, {replace: true});
            }
          })
    }

    // TH đã đăng nhập -> cho phép truy cập
    
  return children;
}

export default AdminRouter