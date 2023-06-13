import React,  {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signout} from '../../Slices/userSlice';
import style from './AdminHeader.module.scss';

function AdminHeader() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <div className={`${style.adminHeader} container-fluid`}>
        <div className='d-flex justify-content-between fs-4 text-primary-color align-items-center'>
            <a href="/#"><i className="bi bi-boxes"></i></a>
            <p className='ms-2'>airbnb</p>
        </div>
        <button className={style.btnInfo} onClick={()=>setShow(!show)}>
          <i className="bi bi-list me-2 mt-1"></i>
          {user ? <span className={style.nameAvatar}>{user.user.name[0]}</span> : <i className="bi bi-person-circle me-1"></i>}
          
        {show && !user &&
          <ul className={style.dropDown}>
            <li onClick={() => navigate('/signin')}>Đăng Nhập</li>
            <li onClick={() => navigate('/signup')}>Đăng ký</li>
          </ul>
        }
        {show && user &&
          <ul className={style.dropDown}>
            <li onClick={() => {
              dispatch(signout());
              localStorage.removeItem("user");
            }}>Đăng xuất</li>
            
          </ul>
        }
        </button>
    </div>
  )
}

export default AdminHeader