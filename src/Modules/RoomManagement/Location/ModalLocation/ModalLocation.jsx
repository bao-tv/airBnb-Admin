import React, {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useForm} from 'react-hook-form';

// định nghĩa các xác thực input
const schema = yup.object({
    tenViTri: yup.string().required('Vị trí không được để trống'),
    tinhThanh: yup.string().required('Tỉnh thành không được để trống'),
    quocGia: yup.string().required('Quốc gia không được để trống'),
});

function ModalLocation({location, show, setShow, onErrer, onSubmit}) {
    const {register, handleSubmit, reset,formState: {errors}} = useForm({
        defaultValues: {
            id: 0,
            tenViTri: '',
            tinhThanh: '',
            quocGia: '',
        },
        mode: "onTouched",
        resolver: yupResolver(schema),
        values : location,
    });

    //hàm reset form
    useEffect(() => {
        if (show === 'update') return;
        reset({
            id: 0,
            tenViTri: '',
            tinhThanh: '',
            quocGia: '',
            hinhAnh: '',
        })
    }, [show]);
    
    return (
        <Modal
        show={show === 'update' || show === 'add'}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton className='title'>
            <Modal.Title className='text-bg-light-color'>
                {show === 'update' && 'Cập nhật thông tin'}
                {show === 'add' && 'Tạo mới thông tin'}
            </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit, onErrer)}>
        <Modal.Body>
        <div className="input-group input">
            <span className="input-group-text">Vị trí :</span>
            <input 
                type="text"
                className="form-control"
                placeholder='Vị trí ...'
                {...register('tenViTri')}/>
        </div>
            {errors.tenViTri && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.tenViTri.message}</p>}

        <div className="input-group input">
            <span className="input-group-text">Tỉnh thành :</span>
            <input 
                type="text"
                className="form-control"
                placeholder='Tỉnh thành ...'
                {...register('tinhThanh')}/>
        </div>
            {errors.tinhThanh && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.tinhThanh.message}</p>}

        <div className="input-group input">
            <span className="input-group-text">Quốc gia :</span>
            <input 
                type="text"
                className="form-control"
                placeholder='Quốc gia ...'
                {...register('quocGia')}/>
        </div>
            {errors.quocGia && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.quocGia.message}</p>}

        </Modal.Body>
        <Modal.Footer>
            <button type='submit' className="btnPrimary">
                {show === 'update' && 'Cập nhật'} 
                {show === 'add' && 'Tạo mới'}
            </button>
        </Modal.Footer>
        </form>
    </Modal>
  )
}

export default ModalLocation;