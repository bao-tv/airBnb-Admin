import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {useForm} from 'react-hook-form';
import { useDispatch } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Swal from 'sweetalert2';
import {apiUpdateInfoUser} from '../../Apis/userAPI';
import { signin } from '../../Slices/userSlice';
import {useNavigate, useLocation} from 'react-router-dom'
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
function ModalUpdate({onShow, handleShow, dataUser}) {
    const values = dataUser;
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    // debugger;
    const dispatch = useDispatch();
    const [errAPI, setErrAPI] = useState(null);
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
        values
    });

    // gọi api trả về, ko lưu redux vì chỉ sài 1 lần sau đó put update thông tin
    const onSubmit = async (value) => {
        try {
            const data = await apiUpdateInfoUser(value);
            // console.log(data);
            // vì trang infoUser lấy thông tin từ redux nên phải reload từ redux
            if(location?.pathname === '/admin') dispatch(signin(data?.data.content));
            Swal.fire({
                title: `Bạn đã update thành công ID: ${data?.data.content.id}`,
                text: "Nhấn Ok để tiếp tục!",
                icon: "success",
                confirmButtonColor:'#ff395c',
            }).then((willSuccess) => {
                if (willSuccess) {
                    handleShow(false);
                    // trang danh sách user chỉ cần call api lại thôi
                    navigate(0);
                }
              })
        } catch (error) {
            setErrAPI(error);
        }
    };
    const onErrer = (err) => {
        console.log(err);
    }
    return (
    <Modal
        show={onShow}
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
            {errAPI && <div className='fs-7 text-danger fst-italic text-center mb-3'>{errAPI}</div>}
        </form>
        </Modal>
  )
}

export default ModalUpdate