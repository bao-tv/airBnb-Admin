import React, {useState, useEffect} from 'react';
import style from './InfoUser.module.scss';
import { useSelector, useDispatch } from "react-redux";
import {bookings} from "../../Slices/bookingSlice";
import {allRoom} from "../../Slices/roomSlice";
import {signin} from "../../Slices/userSlice";
import {apiUpdateInfoUser, apiUpdateImgUser} from "../../Apis/userAPI";
import AreaChart from '../../Components/Chart/AreaChart';
import PieChart from '../../Components/Chart/PieChart';
import { Chart, registerables} from 'chart.js';
import ModalUserUpdate from '../../Modules/UserManagerment/ListUser/ModalUpdate/ModalUserUpdate';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import ModalImgUser from "./modalImgUser/ModalImgUser";

Chart.register(...registerables);

function InfoUser() {
    const navigate = useNavigate();
    const dayjs = require('dayjs');
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [show, setShow] = useState(false);
    // console.log(show);
    const handleUpdateUser = (user) => {
        // console.log(user);
        setShow({key: 'update', value: user});
    }

    const handleUpdateImgUser = () => {
        setShow({key: 'img'});
    }

    const onSubmit = async (value) => {
        // console.log(value);
        try {
            let data = null;
            if(show.key === 'update') {data = await apiUpdateInfoUser(value)};
            if(show.key === 'img') {data = await apiUpdateImgUser(value)};
            console.log('data: ',data);
            Swal.fire({
                title: `Bạn đã update thành công`,
                text: "Nhấn Ok để tiếp tục!",
                icon: "success",
                confirmButtonColor:'#ff395c',
            }).then((willSuccess) => {
                if (willSuccess) {
                    setShow(false);
                    // trang danh sách user chỉ cần dispatch lai
                    let value = null;
                    if(show.key === 'update') {value = {...user?.user, password: data?.data?.content?.password}};
                    if(show.key === 'img') {value = {...user?.user, password: data?.content?.password}};
                    console.log('value login: ',value);
                    dispatch(signin(value));
                    navigate(0);
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
    };
    const onError = (err) => {
        console.log(err);
    }
   
    const {bookingList, errorUser, isLoadingUser} = useSelector((state) => state.bookingList);
    // console.log('bookingList: ',bookingList);
    useEffect(() => {
        dispatch(bookings());
    }, []);

    const {rooms, errorRoom, isLoadingRoom} = useSelector((state) => state.roomList);
    useEffect(() => {
        dispatch(allRoom());
    }, []);
    
    let totalByMonthArr = [0,0,0,0,0,0,0,0,0,0,0,0];
    
    const totalRoomBookingInMonth = bookingList.reduce((total, booking) => {
        if(dayjs(new Date(booking.ngayDen)).year() === 2023) {
            const month = dayjs(new Date(booking.ngayDen)).month();
            totalByMonthArr[month]++;
            total++;
        }
        return total;
    },0);

    const totalMoneyByMonthArr = [0,0,0,0,0,0,0,0,0,0,0,0];
    const totalMoneyBookingInMonth = bookingList.reduce((total,booking) => {
      if(dayjs(new Date(booking.ngayDen)).year() === 2023) {
        const month = dayjs(new Date(booking.ngayDen)).month();
        const timeDay = (new Date(booking.ngayDi).getTime() - new Date(booking.ngayDen).getTime());
        const numDay = Math.ceil(timeDay / (1000 * 60 * 60 * 24));
        const room = rooms.filter((room) => room.id === booking.maPhong);

        if(room.length) {
            // debugger;
            totalMoneyByMonthArr[month] += room[0]?.giaTien * numDay;
            total+= room[0]?.giaTien * numDay;
        }
    }
    return total;
    }, 0);

    return (
    <>
        <div className={`w-100 ${style.infoUser}`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <div className={style.right}>
                            <table className={style.table}>
                                <tbody>
                                    <tr>
                                        <td>Id :</td>
                                        <td>{user?.user.id}</td>
                                    </tr>

                                    <tr>
                                        <td>Name :</td>
                                        <td>{user?.user.name}</td>
                                    </tr>

                                    <tr>
                                        <td>Email :</td>
                                        <td>{user?.user.email}</td>
                                    </tr>

                                    <tr>
                                        <td>Phone :</td>
                                        <td>{user?.user.phone}</td>
                                    </tr>

                                    <tr>
                                        <td>Birthday :</td>
                                        <td>{user?.user.birthday}</td>
                                    </tr>

                                    <tr>
                                        <td>Gender :</td>
                                        <td>{user?.user.gender ? 'Male' : 'Female' }</td>
                                    </tr>

                                    <tr>
                                        <td>Type user :</td>
                                        <td>{user?.user.role}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className={style.left}>
                            <button onClick={()=>handleUpdateUser(user?.user)} className='btn text-secondary'><i className="bi bi-pencil-square"></i></button>
                            <button onClick={()=>handleUpdateImgUser()} className='btn text-secondary'><i className="bi bi-image"></i></button>
                        </div>
                    </div>
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-4">
                            <table className={style.table}>
                                <tbody>
                                    <tr className='d-flex justify-content-end'>ĐVT: Số lượt</tr>
                                {totalByMonthArr.map((num, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>Tháng {index + 1}:</td>
                                            <td>{num.toLocaleString()}</td>
                                        </tr>
                                    )
                                })}
                                    <tr>
                                        <th>Tổng số lượt :</th>
                                        <th>{totalRoomBookingInMonth.toLocaleString()}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-4">
                            <AreaChart onTotalByMonthArr={totalByMonthArr} name={"Số lượng booking"} dvt={"Số lượt"}/>
                        </div>
                        <div className="col-4">
                            <PieChart onTotalByMonthArr={totalByMonthArr} name={"Số lượng booking"} dvt={"Số lượt"}/>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-4">
                            <table className={style.table}>
                                <tbody>
                                <tr className='d-flex justify-content-end'>ĐVT: $</tr>
                                {totalMoneyByMonthArr.map((num, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>Tháng {index + 1}:</td>
                                            <td>{num.toLocaleString()}</td>
                                        </tr>
                                    )
                                })}
                                    <tr>
                                        <th>Doanh số :</th>
                                        <th>{totalMoneyBookingInMonth.toLocaleString()}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-4">
                            <AreaChart onTotalByMonthArr={totalMoneyByMonthArr} name={"Doanh số booking"} dvt={"$"}/>
                        </div>
                        <div className="col-4">
                            <PieChart onTotalByMonthArr={totalMoneyByMonthArr} name={"Doanh số booking"} dvt={"Doanh số $"}/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <ModalUserUpdate 
             onShow={show}
             handleShow={setShow}
             onError = {onError}
             onSubmit = {onSubmit}
        />
        <ModalImgUser 
            onShow={show}
            handleShow={setShow}
            onError = {onError}
            onSubmit = {onSubmit}
        />
    </>
  )
}

export default InfoUser