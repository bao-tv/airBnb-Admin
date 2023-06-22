import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useForm} from 'react-hook-form';

// định nghĩa các xác thực input
const schema = yup.object({
    hinhAnh: yup.mixed()
        .test('required', "Vui lòng chọn hình ảnh", (value) =>{
            return value && value.length;
        } )
        .test("fileSize", "Max size 1mb", (value, context) => {
            return value && value[0] && value[0].size <= 1048576;
        })
        .test("type", "Phải chọn type hình ảnh", function (value) {
            return value && value[0] && value[0]?.type === "image/jpeg" || value[0]?.type === "image/png";
        }),
});

function ModalImg({show, setShow, onError, onSubmit}) {
    const {register, handleSubmit,formState: {errors}} = useForm({
        defaultValues: {
            hinhAnh: '',
        },
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    return (
    <Modal
        show={show?.name === 'img'}
        onHide={()=>setShow(false)}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton className='title'>
            <Modal.Title className='text-bg-light-color'> Cập nhật hình ảnh</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal.Body>
        <div className="row mb-1 align-items-center">
            <div className="col-2 text-end">Hình ảnh</div>
            <div className="col-10">
                <input
                    type="file" 
                    placeholder='hinhAnh ...' 
                    {...register('hinhAnh')}/>
                <img className="imgPreview" alt="" />
            </div>
        </div>
            {errors?.hinhAnh && <p className='ms-3 fs-7 text-danger fst-italic'>{errors?.hinhAnh.message}</p>}
        </Modal.Body>
        <Modal.Footer>
            <button type='submit' className="btnPrimary">
                {show?.name === 'img' && 'Thêm hình'}
            </button>
        </Modal.Footer>
        </form>
    </Modal>
  )
}

export default ModalImg