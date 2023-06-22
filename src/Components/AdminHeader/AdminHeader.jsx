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
        <div className={style.logo} onClick={() => navigate('/')}>
            <a href="/#"><i className="bi bi-boxes"></i></a>
            <p className='ms-2'>airbnb</p>
        </div>
        <button className={style.btnInfo} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
          <i className="bi bi-list me-2"></i>
          {user?.user?.avatar && <img src={user?.user.avatar} className={style.imgAvatar}/> }
          {user?.user?.avatar ==="" && <span className={style.nameAvatar}>{user?.user.name[0]}</span>}
          {!user && <i className="bi bi-person-circle me-1 mt-1"></i>}
          
        {show && !user &&
          <ul className={style.dropDown}>
            <li onClick={() => navigate('/signin')}>Đăng Nhập</li>
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