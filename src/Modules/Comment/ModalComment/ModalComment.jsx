import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useForm} from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import dayjs from '../../../config/localeConfig';
import "./ModalComment.scss";

// định nghĩa các xác thực input
const schema = yup.object({
    ngayBinhLuan: yup.string().required("Ngày bình luận không được để trống"),
    noiDung: yup.string().required("Ngày đi không được để trống"),
    saoBinhLuan: yup.number().min(1,'Số sao bình luận phải lớn hơn 0').typeError('Số khách phải là số').required("Số khách không được để trống"),
});

function ModalComment({show, setShow, onError, onSubmit}) {
    const {register, handleSubmit, setValue,formState: {errors}} = useForm({
        defaultValues: {
            "id": 0,
            "maPhong": 0,
            "maNguoiBinhLuan": 0,
            "ngayBinhLuan": "",
            "noiDung": "",
            "saoBinhLuan": 0,
        },
        mode: "onTouched",
        resolver: yupResolver(schema),
        values : show?.value,
    });
    const [commentDate ,setCommentDate] = useState(new Date());
    useEffect(() => {
        setCommentDate(dayjs(show?.value?.ngayBinhLuan).toDate() == "Invalid Date" ? new Date() : dayjs(show?.value?.ngayBinhLuan).toDate());
    }, [show]);
  return (
    <Modal
    show={show.key === 'update'}
    onHide={() => setShow(false)}
    backdrop="static"
    keyboard={false}>
    <Modal.Header closeButton className='title'>
        <Modal.Title className='text-bg-light-color'>
            {show.key === 'update' && 'Cập nhật thông tin bình luận'}
            {/* {show.key === 'add' && 'Tạo mới thông tin'} */}
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
        <span className="input-group-text">Mã người bình luận :</span>
        <input disabled type="number" className="form-control" placeholder='Mã người bình luận ...'
            {...register('maNguoiBinhLuan')}/>
    </div>
        {errors.maNguoiBinhLuan && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.maNguoiBinhLuan.message}</p>}
    <div className="input-group input">
        <span className="input-group-text">Ngày bình luận :</span>
        {/* <input  type="text" className="form-control" placeholder='Ngày bình luận ...'
            {...register('ngayBinhLuan')}/> */}
         <DatePicker
            showIcon
            selected={commentDate}
            onChange={(date) => {
                // console.log();
                // if(!date) date = new Date();
                setCommentDate(date);
                // set lại định dạng ISO 8601 format để gửi về sever
                setValue("ngayBinhLuan", dayjs(date).format('YYYY-MM-DDTHH:mm:ss'));
            }}
            className='datePicker'
            dateFormat="dd/MM/yyyy"/>
    </div>
        {errors.ngayBinhLuan && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.ngayBinhLuan.message}</p>}

    <div className="input-group input">
        <span className="input-group-text">Nội dung :</span>
        <input  type="text" className="form-control" placeholder='Nội dung ...'
            {...register('noiDung')}/>
    </div>
        {errors.noiDung && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.noiDung.message}</p>}

    <div className="input-group input">
        <span className="input-group-text">Số sao :</span>
        <input  type="number" className="form-control" placeholder='Số sao ...'
            {...register('saoBinhLuan')}/>
    </div>
        {errors.saoBinhLuan && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.saoBinhLuan.message}</p>}

    </Modal.Body>
    <Modal.Footer>
        <button type='submit' className="btnPrimary">
            {show.key === 'update' && 'Cập nhật'} 
            {/* {show.key === 'add' && 'Tạo mới'} */}
        </button>
    </Modal.Footer>
    </form>
</Modal>
  )
}

export default ModalComment