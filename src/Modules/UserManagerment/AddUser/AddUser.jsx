import React, {useState} from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {apiSignUp} from '../../../Apis/userAPI';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Swal from 'sweetalert2';
import './AddUser.scss';

// định nghĩa các xác thực input
const schema = yup.object({
    name: yup.string().required('Tài khoản không được để trống'),
    email: yup
        .string().email('Email không hợp lệ').required('Email không được để trống'),
    phone: yup.string().typeError('Số điện thoại phải là số').required('Số điện thoại không được để trống'),
    role: yup
        .string()
        .required('Loại người dùng không được để trống'),
    // gender: yup
    password: yup.string().required('Mật khẩu không được để trống').matches('^.{6,}$','Mật khẩu có ít nhất 6 ký tự.')
});

function AddUser() {
    const [passShow, setPassShow] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {register, handleSubmit,formState: {errors}} = useForm({
        defaultValues: {
            id: 0,
            name: '',
            email: '',
            phone: '',
            birthday: '',
            gender: '',
            role: '',
        },
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const { user, error } = useSelector((state) => state.user);

    const onSubmit = async (value) => {
        console.log(value);
        try {
            const data = await apiSignUp(value);
            if (data?.statusCode === 200) {
                    const url = searchParams.get("redireactUrl") || "/list-user";
                    Swal.fire({
                      title: `Bạn đã tạo thành công tài khoản: ${data?.content.email}`,
                      text: "Nhấn Ok để tiếp tục!",
                      icon: "success",
                      confirmButtonColor:'#ff395c',
                    }).then((willSuccess) => {
                      if (willSuccess) {
                        navigate(url);
                      }
                    })
                  }
         } catch (error) {
            console.log(error);
            if (user?.user.role === "ADMIN") {
                const url = searchParams.get("redireactUrl") || "/list-user";
                Swal.fire({
                    title: error.message,
                    text: "Nhấn Ok để tiếp tục!",
                    icon: "error",
                    confirmButtonColor:'#ff395c',
                }).then((willSuccess) => {
                    if (willSuccess) {
                    navigate(url);
                    }
                })
                }
        }
      };

      const onError = (err) => {
        console.log(err);
      };
    return (
    <div className='addUser w-100'>
        <h2 className='title'>Thêm User</h2>
        <div className='container d-flex'>
            <div className="w-50 m-auto">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="form-floating mb-3">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    {...register("email")}
                    />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                {errors.email && (
                    <p className="ms-3 mb-3 fs-7 text-danger fst-italic">
                    {errors.email.message}
                    </p>
                )}

                <div className="input-group mb-3">
                    <div className="form-floating">
                    <input
                        type={passShow ? "text" : "password"}
                        className="form-control"
                        placeholder="Mật Khẩu"
                        {...register("password")}
                    />
                    <label htmlFor="floatingPassword">Mật khẩu</label>
                    </div>
                    <span className="input-group-text" onClick={() => setPassShow(!passShow)}>
                    {passShow ? (
                        <i className="bi bi-eye-slash"></i>
                        ) : (
                        <i className="bi bi-eye"></i>
                        )}
                    </span>
                </div>
                {errors.password && (
                    <p className="ms-3 mb-3 fs-7 text-danger fst-italic">
                    {errors.password.message}
                    </p>
                )}

                <div className="input-group mb-3">
                    <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Họ và tên"
                        {...register("name")}
                    />
                    <label htmlFor="floatingPassword">Họ và Tên</label>
                    </div>
                </div>
                {errors.name && (
                    <p className="ms-3 mb-3 fs-7 text-danger fst-italic">
                    {errors.name.message}
                    </p>
                )}

                <div className="input-group mb-3">
                    <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Số điện thoại"
                        {...register("phone")}
                    />
                    <label htmlFor="floatingPassword">Số điện thoại</label>
                    </div>
                </div>
                {errors.phone && (
                    <p className="ms-3 mb-3 fs-7 text-danger fst-italic">
                    {errors.phone.message}
                    </p>
                )}

                <div className="input-group mb-3">
                    <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ngày sinh"
                        {...register("birthday")}
                    />
                    <label htmlFor="floatingPassword">Ngày sinh</label>
                    </div>
                </div>
                {errors.birthday && (
                    <p className="ms-3 mb-3 fs-7 text-danger fst-italic">
                    {errors.birthday.message}
                    </p>
                )}

                <div className="input-group mb-3">
                    <div className="form-floating">
                    <select
                        type="text"
                        className="form-control"
                        placeholder="Giới tính"
                        {...register("gender")}>

                        <option value="true">Male</option>
                        <option value="flase">Female</option>
                    </select>
                    <label htmlFor="floatingPassword">Giới tính</label>
                    </div>
                </div>
                {errors.gender && (
                    <p className="ms-3 mb-3 fs-7 text-danger fst-italic">
                    {errors.gender.message}
                    </p>
                )}

                <div className="input-group mb-3">
                    <div className="form-floating">
                    <select
                        type="text"
                        className="form-control"
                        placeholder="Loại tài khoản"
                        {...register("role")}>
                            
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>
                    <label htmlFor="floatingPassword">Loại tài khoản</label>
                    </div>
                </div>
                {errors.role && (
                    <p className="ms-3 mb-3 fs-7 text-danger fst-italic">
                    {errors.role.message}
                    </p>
                )}
                <div className='text-center'>
                    <button type="submit" className='btnPrimary'>Đăng ký</button>
                </div>
                {error && (
                    <p className="text-center fs-7 text-danger fst-italic">{error}</p>
                )}
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddUser