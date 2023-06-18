import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import {bookings} from '../../Slices/bookingSlice';
import {apiBookingUser, apiDeleteBookingUser, apiUpdateBookingUser} from "../../Apis/bookingAPI";
import {useNavigate, useLocation} from 'react-router-dom';
import ModalBookingRoom from './ModalBookingRoom/ModalBookingRoom';


function BookingRoom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dayjs = require('dayjs');
  // lấy từ url userID từ react router dom đã gửi tại mục quản lý user http://localhost:3000/list-user
  const userID = new URLSearchParams(useLocation().search).get('userID')
  const [inputValue, setInputValue] = useState(null);
  const [userBooking, setUserBooking] = useState([]);
  const [show, setShow] = useState([]);
  // console.log(userBooking);
  const getBookingUser = async (id) => {
    try {
      const {content} = await apiBookingUser(id);
      setUserBooking(content);
    } catch (error) {
      // console.log(error);
      Swal.fire({
        title: "Không tìm thấy user",
        text: `${error?.message} !!`,
        icon: "error",
        confirmButtonColor:'#ff395c',
    })
    }
  }
  
  useEffect(() => {
    if(inputValue) {
      getBookingUser(inputValue);
      return;
    } else if(userID) {
      getBookingUser(userID);
      return;
    }
  }, [inputValue ]);

  // lưu redux all booking
  const {bookingList, error, isLoading} = useSelector((state) => state.bookingList)
  useEffect(() => {
    dispatch(bookings());
  }, []);

  const onSubmit = async (value) => {
    // console.log("value submit: ",value);
    try {
      let data = null;
      if(show.key === 'update') {data = await apiUpdateBookingUser(value)};
      // console.log('data: ',data);
      Swal.fire({
        title: data?.message,
        text: "Nhấn Ok để tiếp tục!",
        icon: "success",
        confirmButtonColor:'#ff395c',
    }).then((willSuccess) => {
        console.log(data);
        if (willSuccess) {
            setShow(false);
            // reload page update lại thông tin trên table
            // reload lại page nhưng vẫn giữ giá trị userID đang update
            // input user đã bị mất nên phải lưu trên url và sử dụng useLocation để lưu
            navigate(`/booking?userID=${inputValue || userID}`);
            window.location.reload();
        }
      })
    } catch (error) {
      console.log('error: ',error);
      Swal.fire({
        title: error?.message,
        text: `${error?.response?.data?.content} !!`,
        icon: "error",
        confirmButtonColor:'#ff395c',
    })
    }
  }

  const onError = async (value) => {
    // console.log(value);
    console.log(value);
}

  // console.log(inputValue);
  const handleInput = evt => {
    // console.log(evt.target);
    if (evt?.key === 'Enter' || evt?.key === 'Tab') {
      setInputValue(evt?.target?.value);
    }
  }

  const handleDeleteBooking = async (id) => {
    // console.log(id);
    try {
      const data = await apiDeleteBookingUser(id);
      Swal.fire({
        title: `${data.message} phòng với ID: ${id}`,
        text: "Nhấn Ok để tiếp tục!",
        icon: "success",
        confirmButtonColor:'#ff395c',
      }).then((willSuccess) => {
        if (willSuccess) {
          getBookingUser(inputValue);
        }
      })
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error?.message,
        text: `${error?.response?.data} !!`,
        icon: "error",
        confirmButtonColor:'#ff395c',
    });
      // navigate(0);
    }
  }

  const handleUpdateBooking = (booking) => {
    setShow({key: 'update', value: booking})
  }

  return (
    <div className='booking w-100'>
      <h2 className='title'>Quản lý đặt phòng</h2>
      <div className="d-flex justify-content-around mb-2">
          <div className="input-group w-50">
          <input 
              type="text" 
              className="form-control" 
              placeholder="nhập mã người dùng và nhấn Enter" 
              name="inputValue"
              onKeyDown={handleInput}
          />
          </div>
          {/* <button className='btnPrimary'>Tìm phòng đã đặt</button> */}
      </div>
      <div className="body">
            <div className="container-fluid">
                <div className="row">
                    <table className='table table-hover table-bordered w-100'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>ID</th>
                                <th scope='col'>Mã phòng</th>
                                <th scope='col'>Ngày đến</th>
                                <th scope='col'>Ngày đi</th>
                                <th scope='col'>Số lượng khách</th>
                                <th scope='col'>Mã người dùng</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userBooking?.map((booking, index) => {
                                return(
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{booking.id}</td>
                                        <td>{booking.maPhong}</td>
                                        <td>{dayjs(booking.ngayDen).format('DD/MM/YYYY')}</td>
                                        <td>{dayjs(booking.ngayDi).format('DD/MM/YYYY')}</td>
                                        <td>{booking.soLuongKhach}</td>
                                        <td>{booking.maNguoiDung}</td>
                                        <td>
                                            <button onClick={() => handleUpdateBooking(booking)} className='btn text-secondary'><i className="bi bi-pencil-square"></i></button>
                                            {/* <button onClick={() => handleImg(room.id)} className='btn text-secondary'><i className="bi bi-image"></i></button> */}
                                            <button onClick={() => handleDeleteBooking(booking.id)} className='btn text-danger'> <i className="bi bi-trash3"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                            {!(userBooking?.length) && inputValue &&
                            <div className='text-center text-danger'>
                              <h3>User không có lịch sử đặt phòng đặt phòng</h3>
                            </div>
                            }
                            {!(inputValue) &&
                            <div className='text-center text-danger'>
                              <h3>Bạn chưa nhập user</h3>
                            </div>
                            }
                </div>
            </div>
        </div>
      <ModalBookingRoom 
        show = {show}
        setShow = {setShow}
        onError = {onError}
        onSubmit = {onSubmit}
      />
    </div>
  )
}

export default BookingRoom