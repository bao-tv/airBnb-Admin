import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import style from './AdminSidebar.module.scss';

function AdminSidebar() {
  const [activeFooterItem, setActiveFooterItem] = useState(1);
  const navigate = useNavigate();
  // debugger
  const handleFooterItem = (itemId) => {
    setActiveFooterItem(itemId);
  };

  const handleThongTin = () => {
    handleFooterItem(1);
    navigate("/admin");
  };

  const handleListBook = () => {
    handleFooterItem(2);
    navigate("booking");
  };
  return (
    <div className={style.adminSidebar}>
      <ul className={style.footer}>
        <div>
          <li
            className={`${style.footerItem} ${
              activeFooterItem === 1 ? style.action : ""
            }`}
            onClick={handleThongTin}
          >
            Thông tin
          </li>
        </div>
        <div>
          <li className={`${style.footerItem} ${ activeFooterItem === 2 ? style.action : "" }`}
            onClick={handleListBook} >
            Danh sách đặt phòng
          </li>
        </div>
        <div>
          <li className={`${style.footerItem} ${ activeFooterItem === 3 ? style.action : "" }`}
            onClick={() => handleFooterItem(3)}>
            Quản lý phòng
            <span className={activeFooterItem === 3 ? style.icon : ""}>
              <i className="bi bi-chevron-right"></i>
            </span>
          </li>
          <Collapse in={activeFooterItem === 3}>
            <ul className={style.listItem}>
              <li onClick={() => {navigate("list-room")}} className={style.listItemDetail} >
                Danh sách Phòng
              </li>
              <li onClick={() => navigate("location")} className={style.listItemDetail} >
                Danh sách vị trí
              </li>
            </ul>
          </Collapse>
        </div>
        <div>
          <li className={`${style.footerItem} ${ activeFooterItem === 4 ? style.action : ""}`}
            onClick={() => handleFooterItem(4)} >
            Quản lý User
            <span className={activeFooterItem === 4 ? style.icon : ""}>
              <i className="bi bi-chevron-right"></i>
            </span>
          </li>
          <Collapse in={activeFooterItem === 4}>
            <ul className={style.listItem}>
              <li className={style.listItemDetail} onClick={() => navigate("list-user")}>Danh sách User</li>
              <li className={style.listItemDetail} onClick={() => navigate("add-user")}>Thêm User</li>
            </ul>
          </Collapse>
        </div>
      </ul>
    </div>
  )
}

export default AdminSidebar