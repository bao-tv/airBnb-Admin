import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useForm} from 'react-hook-form';
import DatePicker, {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "../../../config/localeConfig"
import "./ModalBookingRoom.scss";

// định nghĩa các xác thực input
const schema = yup.object({
    ngayDen: yup.string().required("Ngày đến không được để trống"),
    ngayDi: yup.string().required("Ngày đi không được để trống"),
    soLuongKhach: yup.number().min(1,'Số khách phải lớn hơn 0').typeError('Số khách phải là số').required("Số khách không được để trống"),
    maNguoiDung: yup.number().min(1,'Mã vị trí không hợp lệ').required("Mã vị trí không được để trống"),
});

function ModalBookingRoom({show, setShow, onError, onSubmit}) {
    const {register, handleSubmit, setValue,formState: {errors}} = useForm({
        defaultValues: {
            "id": 0,
            "maPhong": 0,
            ngayDen: "",
            "ngayDi": "",
            "soLuongKhach": 0,
            "maNguoiDung": 0
        },
        mode: "onTouched",
        resolver: yupResolver(schema),
        values : show?.value,
    });
    const [arriveDate, setArriveDate] = useState(new Date());
    const [leaveDate, setLeaveDate] = useState(new Date());
    // chuyển về format toDate để hiển thị
    useEffect(()=>{
        setArriveDate(dayjs(show?.value?.ngayDen).toDate());
        setLeaveDate(dayjs(show?.value?.ngayDi).toDate());
    },[show]);

  return (
    <Modal
    show={show.key === 'update' || show.key === 'add'}
    onHide={() => setShow(false)}
    backdrop="static"
    keyboard={false}>
    <Modal.Header closeButton className='title'>
        <Modal.Title className=''>
            {show.key === 'update' && 'Cập nhật thông tin đặt phòng'}
            {show.key === 'add' && 'Tạo mới thông tin'}
        </Modal.Title>
    </Modal.Header>
    <form onSubmit={handleSubmit(onSubmit, onError)}>
    <Modal.Body>
    <div className="input-group input">
        <span className="input-group-text">ID:</span>
        <input disabled type="text" className="form-control" placeholder='id ...'
            {...register('id')}/>
    </div>
        {errors.id && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.id.message}</p>}

    <div className="input-group input">
        <span className="input-group-text">Mã phòng :</span>
        <input disabled type="number" className="form-control" placeholder='Mã phòng ...'
            {...register('maPhong')}/>
    </div>
        {errors.maPhong && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.maPhong.message}</p>}

    <div className="input-group input">
        <span className="input-group-text">Ngày đến :</span>
        <DatePicker
            showIcon
            selected={arriveDate}
            onChange={(date) => {
                setArriveDate(date);
                // set lại định dạng ISO 8601 format để gửi về sever
                setValue("ngayDen", dayjs(date).format('YYYY-MM-DDTHH:mm:ss'));
            }}
            className='datePicker'
            dateFormat="dd/MM/yyyy"/>
    </div>
        {errors.ngayDen && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.ngayDen.message}</p>}

    <div className="input-group input">
        <span className="input-group-text">Ngày đi :</span>
        <DatePicker
            showIcon
            selected={leaveDate}
            onChange={(date) => {
                setLeaveDate(date);
                setValue("ngayDi", dayjs(date).format('YYYY-MM-DDTHH:mm:ss'));
            }}
            className='datePicker'
            dateFormat="dd/MM/yyyy"
            />
    </div>
        {errors.ngayDi && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.ngayDi.message}</p>}

    <div className="input-group input">
        <span className="input-group-text">Số lượng khách :</span>
        <input  type="number" className="form-control" placeholder='Số lượng khách ...'
            {...register('soLuongKhach')}/>
    </div>
        {errors.soLuongKhach && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.soLuongKhach.message}</p>}

    <div className="input-group input">
        <span className="input-group-text">Mã người dùng :</span>
        <input  type="number" className="form-control" placeholder='Mã người dùng ...'
            {...register('maNguoiDung')}/>
    </div>
        {errors.maNguoiDung && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.maNguoiDung.message}</p>}

    </Modal.Body>
    <Modal.Footer>
        <button type='submit' className="btnPrimary">
            {show.key === 'update' && 'Cập nhật'} 
            {show.key === 'add' && 'Tạo mới'}
        </button>
    </Modal.Footer>
    </form>
</Modal>
  )
}

export default ModalBookingRoom