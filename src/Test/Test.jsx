import React, {useEffect} from 'react';
import {bookings} from "../Slices/bookingSlice";
import {allRoom} from "../Slices/roomSlice";
import { useSelector, useDispatch } from "react-redux";
import AreaChart from './AreaChart';
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);


function Test() {
  const dayjs = require('dayjs')
  const dispatch = useDispatch();
  const {bookingList, error, isLoading} = useSelector((state) => state.bookingList);
  const {rooms, errorRoom, isLoadingRoom} = useSelector((state) => state.roomList);

  useEffect(() => {
    dispatch(bookings());
    dispatch(allRoom());
  }, []);

  const totalByMonthArr = [0,0,0,0,0,0,0,0,0,0,0,0];
  const totalRoomBookingInMonth = bookingList.map((booking) => {
    if(dayjs(new Date(booking.ngayDen)).year() === 2023) {
      const month = dayjs(new Date(booking.ngayDen)).month();
      const timeDay = (new Date(booking.ngayDi).getTime() - new Date(booking.ngayDen).getTime());
      const numDay = Math.ceil(timeDay / (1000 * 60 * 60 * 24));
      // if(numDay < 0) console.log(booking);
      const room = rooms.filter((room) => room.id === booking.maPhong);
      // if(room[0]?.giaTien < 0) console.log(room);
      // if(room.length) console.log(room[0]?.giaTien * numDay);
      if(room.length) totalByMonthArr[month] += room[0]?.giaTien * numDay;
    }
  });

  console.log(totalByMonthArr);

  
  // const ngayDi = '2023-01-02T00:00:00';
  // const ngayDien = '2023-01-01T00:00:00';


  // const timeDifference = (new Date(ngayDi).getTime() - new Date(ngayDien).getTime());
  // const one_day = 1000*60*60*24;
  // // console.log(timeDifference);
  // const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
  // console.log(daysDifference);

  return (
    <div>
      <h1>Room Bookings by Month</h1>
      <AreaChart />
    </div>
  )
}

export default Test;