import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import {signin, signout} from '../../../Slices/userSlice';
import style from './Signin.module.scss';

function Signin() {
  const [passShow, setPassShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { user, errorUser } = useSelector((state) => state.user);
  console.log(errorUser);

  const onSubmit = (data) => {
    dispatch(signin(data));
  };
  if (user?.user.role === "ADMIN") {
    const url = searchParams.get("redireactUrl") || "/admin";
    Swal.fire({
      title: "Bạn đã đăng nhập thành công",
      text: "Nhấn Ok để tiếp tục!",
      icon: "success",
      confirmButtonColor:'#ff395c',
    }).then((willSuccess) => {
      if (willSuccess) {
        navigate(url);
      }
    })
  }
  //nếu ko phải admin thì remove và đăng nhập lai
  if (user && user?.user.role !== "ADMIN") {
    // const url = searchParams.get("redireactUrl") || "/admin";
    Swal.fire({
      title: "Bạn phải đăng nhập tài khoản Admin",
      text: "Nhấn Ok để đăng nhập lại!",
      icon: "success",
      confirmButtonColor:'#ff395c',
    }).then((willSuccess) => {
      if (willSuccess) {
        // navigate(url);
        dispatch(signout());
        localStorage.removeItem("user");
      }
    })
  }
  const onError = (err) => {
    console.log(err);
  };
  return (
    <div className={`container d-flex ${style.signin}`}>
      <div className="w-50 m-auto">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email không được để trống",
                },
                pattern: {
                  value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email không đúng định dạng",
                },
              })}
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
                placeholder="Mật khẩu"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Mật khẩu không được để trống",
                  },
                  pattern: {
                    // value: /^.{6}$/,
                    message:
                      "Mật khẩu có ít nhất 6 ký tự.",
                  },
                })}
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
          <button type="submit" className={style.btnPrimary}>
            Đăng nhập
          </button>
          {errorUser && (
            <p className="text-center fs-7 text-danger fst-italic">{errorUser}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signin;
