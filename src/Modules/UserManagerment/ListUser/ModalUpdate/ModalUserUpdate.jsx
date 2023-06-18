import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import style from './ModalUpdate.module.scss';

// định nghĩa các xác thực input
const schema = yup.object({
    id: yup.string().required('Tài khoản không được để trống'),
    name: yup.string().required('Tài khoản không được để trống'),
    email: yup
        .string().email('Email không hợp lệ').required('Email không được để trống'),
    phone: yup.string().typeError('Số điện thoại phải là số').required('Số điện thoại không được để trống'),
    role: yup
        .string()
        .required('Loại người dùng không được để trống'),
    // gender: yup
});
function ModalUpdate({onShow, handleShow, onErrer, onSubmit}) {
    // const values = onShow?.value;
    const {register, handleSubmit,formState: {errors}} = useForm({
        defaultValues: {
            id: '',
            name: '',
            email: '',
            phone: '',
            birthday: '',
            gender: '',
            role: '',
        },
        mode: "onTouched",
        resolver: yupResolver(schema),
        values: onShow?.value,
    });

    // gọi api trả về, ko lưu redux vì chỉ sài 1 lần sau đó put update thông tin

    return (
    <Modal
        show={onShow?.key === 'update'}
        onHide={()=>handleShow(false)}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header className='bg-primary-color' closeButton>
            <Modal.Title className='text-bg-light-color'>Cập nhật thông tin</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit, onErrer)}>
        <Modal.Body className={style.formBody}>
            <div className={`input-group ${style.input}`}>
                <span className="input-group-text">Id :</span>
                <input 
                    type="text" 
                    className="form-control"
                    disabled
                    placeholder='Id'
                    {...register('id')}
                    />
            </div>
                {errors.id && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.id.message}</p>}
            
            <div className={`input-group ${style.input}`}>
                <span className="input-group-text">Email :</span>
                <input 
                    type="text"
                    className="form-control"
                    disabled
                    placeholder='Email'
                    {...register('email')}
                    />
            </div>
                {errors.email && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.email.message}</p>}

            <div className={`input-group ${style.input}`}>
                <span className="input-group-text">Họ và tên :</span>
                <input 
                    type="text"
                    className="form-control" 
                    placeholder='Họ và tên'
                    {...register('name')}
                    />
            </div>
                {errors.name && <p className='ms-3 fs-7 text-danger fst-italic'>{errors?.name.message}</p>}
            
            <div className={`input-group ${style.input}`}>
                <span className="input-group-text">Số điện thoại :</span>
                <input 
                    type="text"
                    className="form-control" 
                    placeholder='Số điện thoại'
                    {...register('phone')}
                    />
            </div>
                {errors.phone && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.phone.message}</p>}
            
            <div className={`input-group ${style.input}`}>
            <span className="input-group-text">Ngày sinh :</span>
            <input 
                type="text"
                className="form-control" 
                placeholder='Ngày sinh'
                {...register('birthday')}
                />
            </div>
                {errors.birthday && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.birthday.message}</p>}
            
            <div className={`input-group ${style.input}`}>
            <span className="input-group-text">Giới tính :</span>
            <select 
                type="text"
                className="form-control" 
                placeholder='Giới tính'
                {...register('gender')}
                >
                <option value="true">Male</option>
                <option value="flase">Female</option>
            </select>
            </div>
                {errors.gender && <p className='fs-7 text-danger fst-italic'>{errors.gender.message}</p>}
            <div className={`input-group ${style.input}`}>
                <span className="input-group-text">Loại tài khoản :</span>
                <select 
                    type="text"
                    className="form-control" 
                    placeholder='Loại tài khoản'
                    {...register('role')}
                    >
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                </select>
            </div>
                {errors.role && <p className='fs-7 text-danger fst-italic'>{errors.role.message}</p>}
        </Modal.Body>
        <Modal.Footer>
            <button type='submit' className={style.btnPrimary}>Cập nhật</button>
        </Modal.Footer>
        </form>
        </Modal>
  )
}

export default ModalUpdate