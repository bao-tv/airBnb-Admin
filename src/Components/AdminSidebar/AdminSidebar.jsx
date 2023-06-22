import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Collapse, Offcanvas} from "react-bootstrap";
import './AdminSidebar.scss';

function AdminSidebar() {
  const [activeFooterItem, setActiveFooterItem] = useState(1);
  const navigate = useNavigate();
  // debugger
  const handleFooterItem = (itemId) => {
    setActiveFooterItem(itemId);
  };

  const handleThongTin = () => {
    handleFooterItem(1);
    navigate("/");
  };

  const handleListBook = () => {
    handleFooterItem(2);
    navigate("booking");
  };

  const handleCommentBook = () => {
    handleFooterItem(3);
    navigate("comment");
  };
  const [show, setShow] = useState(false);
  // console.log(show);
  return (
    <>
      <div className="btnSlidebar">
        <button onClick={() => setShow(true)}><i className="bi bi-card-list"></i></button>
      </div>
      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
            {/* <Offcanvas.Title>Admin menu</Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="adminSidebar">
            <ul className="footer">
              <div>
                <li
                  className={`footerItem ${activeFooterItem === 1 ?"action": ""}`}
                  onClick={handleThongTin}
                >
                  Thông tin
                </li>
              </div>
              <div>
                <li className={`footerItem ${activeFooterItem === 2 ?"action": ""}`}
                  onClick={handleListBook} >
                  Danh sách đặt phòng
                </li>
              </div>
              <div>
                <li className={`footerItem ${activeFooterItem === 3 ?"action": ""}`}
                  onClick={handleCommentBook} >
                  Danh sách bình luận
                </li>
              </div>
              <div>
                <li className={`footerItem ${activeFooterItem === 4 ?"action": ""}`}
                  onClick={() => handleFooterItem(4)}>
                  Quản lý phòng
                  <span className={activeFooterItem === 4 ?"icon": ""}>
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </li>
                <Collapse in={activeFooterItem === 4}>
                  <ul className="listItem">
                    <li onClick={() => {navigate("list-room")}} className="listItemDetail" >
                      Danh sách Phòng
                    </li>
                    <li onClick={() => navigate("location")} className="listItemDetail" >
                      Danh sách vị trí
                    </li>
                  </ul>
                </Collapse>
              </div>
              <div>
                <li className={`footerItem ${activeFooterItem === 5 ?"action": ""}`}
                  onClick={() => handleFooterItem(5)} >
                  Quản lý User
                  <span className={activeFooterItem === 5 ?"icon": ""}>
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </li>
                <Collapse in={activeFooterItem === 5}>
                  <ul className="listItem">
                    <li className="listItemDetail" onClick={() => navigate("list-user")}>Danh sách User</li>
                    <li className="listItemDetail" onClick={() => navigate("add-user")}>Thêm User</li>
                  </ul>
                </Collapse>
              </div>
            </ul>
          </div>
          
        </Offcanvas.Body>

      </Offcanvas>
    </>
  )
}

export default AdminSidebar