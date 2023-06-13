import React, {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useForm} from 'react-hook-form';

// định nghĩa các xác thực input
const schema = yup.object({
    tenPhong: yup.string().required('Tên phòng không được để trống'),
    khach: yup.number().min(1,'Số khách phải lớn hơn 0').typeError('Số khách phải là số').required("Số khách không được để trống"),
    phongNgu: yup.number().min(0,'Số phòng ngủ phải lớn hơn 0').typeError('Số phòng ngủ phải là số').required("Số phòng ngủ không được để trống"),
    giuong: yup.number().min(0,'Số giường phải lớn hơn 0').typeError('Số giường phải là số').required("Số giường không được để trống"),
    phongTam: yup.number().min(0,'Số phòng tắm phải lớn hơn 0').typeError('Số phòng tắm phải là số').required("Số phòng tắm không được để trống"),
    giaTien: yup.number().min(0,'Giá tiền phải lớn hơn 0').typeError('Giá tiền phải là số').required("Giá tiền không được để trống"),
    maViTri: yup.number().min(1,'Mã vị trí không hợp lệ').required("Mã vị trí không được để trống"),
});

function ModalRoom({show, setShow, onError, onSubmit, locationList}) {
    // console.log(locationList);
    const {register, handleSubmit, reset,formState: {errors}} = useForm({
        defaultValues: {
            "id": 0,
            "tenPhong": "",
            "khach": 0,
            "phongNgu": 0,
            "giuong": 0,
            "phongTam": 0,
            "moTa": "",
            "giaTien": 0,
            "mayGiat": false,
            "banLa": false,
            "tivi": false,
            "dieuHoa": false,
            "wifi": false,
            "bep": false,
            "doXe": false,
            "hoBoi": false,
            "banUi": false,
            "maViTri": 0
        },
        mode: "onTouched",
        resolver: yupResolver(schema),
        values : show?.value,
    });

    //hàm reset form
    useEffect(() => {
        if (show.key === 'update') return;
        reset({
            "id": 0,
            "tenPhong": "",
            "khach": 0,
            "phongNgu": 0,
            "giuong": 0,
            "phongTam": 0,
            "moTa": "",
            "giaTien": 0,
            "mayGiat": false,
            "banLa": false,
            "tivi": false,
            "dieuHoa": false,
            "wifi": false,
            "bep": false,
            "doXe": false,
            "hoBoi": false,
            "banUi": false,
            "maViTri": 0
        })
    }, [show]);
    
    return (
        <Modal
        show={show.key === 'update' || show.key === 'add'}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title className='text-bg-light-color'>
                {show.key === 'update' && 'Cập nhật thông tin'}
                {show.key === 'add' && 'Tạo mới thông tin'}
            </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Modal.Body>
        <div className="input-group input">
            <span className="input-group-text">Tên phòng:</span>
            <input  type="text" className="form-control" placeholder='Tên phòng ...'
                {...register('tenPhong')}/>
        </div>
            {errors.tenPhong && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.tenPhong.message}</p>}

        <div className="input-group input">
            <span className="input-group-text">Số khách :</span>
            <input  type="number" className="form-control" placeholder='số khách ...'
                {...register('khach')}/>
        </div>
            {errors.khach && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.khach.message}</p>}

        <div className="input-group input">
            <span className="input-group-text">Số phòng ngủ :</span>
            <input  type="number" className="form-control" placeholder='Số phòng ngủ ...'
                {...register('phongNgu')}/>
        </div>
            {errors.phongNgu && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.phongNgu.message}</p>}

        <div className="input-group input">
            <span className="input-group-text">Số giường :</span>
            <input  type="number" className="form-control" placeholder='Số giường ...'
                {...register('giuong')}/>
        </div>
            {errors.giuong && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.giuong.message}</p>}

        <div className="input-group input">
            <span className="input-group-text">Số phòng tắm :</span>
            <input  type="number" className="form-control" placeholder='Số phòng tắm ...'
                {...register('phongTam')}/>
        </div>
            {errors.phongTam && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.phongTam.message}</p>}

        <div className="input-group input">
            <label className="form-label">Mô tả</label>
            <textarea className="form-control" rows={3} defaultValue={""} {...register('moTa')}/>
        </div>
            {errors.moTa && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.moTa.message}</p>}

        <div className="input-group input">
            <span className="input-group-text">Giá tiền :</span>
            <input  type="number" className="form-control" placeholder='Giá tiền ...'
                {...register('giaTien')}/>
        </div>
            {errors.giaTien && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.giaTien.message}</p>}

        <div className="form-check">
            <input className="form-check-input" type="checkbox" {...register('mayGiat')}/>
            <label className="form-check-label">
                Máy giặt
            </label>
        </div>
            {errors.mayGiat && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.mayGiat.message}</p>}
        
        <div className="form-check">
            <input className="form-check-input" type="checkbox" {...register('banLa')}/>
            <label className="form-check-label">
                Bàn là
            </label>
        </div>
            {errors.banLa && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.banLa.message}</p>}

        <div className="form-check">
            <input className="form-check-input" type="checkbox" {...register('tivi')}/>
            <label className="form-check-label">
                Tivi
            </label>
        </div>
            {errors.tivi && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.tivi.message}</p>}

        <div className="form-check">
            <input className="form-check-input" type="checkbox" {...register('dieuHoa')}/>
            <label className="form-check-label">
                Điều hòa
            </label>
        </div>
            {errors.dieuHoa && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.dieuHoa.message}</p>}

            <div className="form-check">
            <input className="form-check-input" type="checkbox" {...register('wifi')}/>
            <label className="form-check-label">
                Wifi
            </label>
        </div>
            {errors.wifi && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.wifi.message}</p>}

        <div className="form-check">
            <input className="form-check-input" type="checkbox" {...register('bep')}/>
            <label className="form-check-label">
                Bếp
            </label>
        </div>
            {errors.bep && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.bep.message}</p>}

        <div className="form-check">
            <input className="form-check-input" type="checkbox" {...register('doXe')}/>
            <label className="form-check-label">
                Đỗ xe
            </label>
        </div>
            {errors.doXe && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.doXe.message}</p>}

        <div className="form-check">
            <input className="form-check-input" type="checkbox" {...register('hoBoi')}/>
            <label className="form-check-label">
                Hồ bơi
            </label>
        </div>
            {errors.hoBoi && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.hoBoi.message}</p>}

        <div className="form-check">
            <input className="form-check-input" type="checkbox" {...register('banUi')}/>
            <label className="form-check-label">
                Bàn ủi
            </label>
        </div>
            {errors.banUi && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.banUi.message}</p>}
        
        <select className="form-select" defaultValue={0} {...register('maViTri')}>
            <option value={0} selected>Mã vị trí</option>
            {locationList.map((item) => {
                return <option key={item.id} value={item.id}>{`${item.tenViTri}, ${item.tinhThanh}, ${item.quocGia}`}</option>
            })}
        </select>
            {errors.maViTri && <p className='ms-3 fs-7 text-danger fst-italic'>{errors.maViTri.message}</p>}
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

export default ModalRoom;