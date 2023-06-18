import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from "react-redux";
import Pagination from 'rc-pagination';
import Swal from 'sweetalert2';
import {apiListUser, apiRemoveUser, apiUpdateInfoUser} from '../../../Apis/userAPI';
import './listUser.scss';
import {useNavigate} from 'react-router-dom';
import ModalUserUpdate from './ModalUpdate/ModalUserUpdate';
// import ModalImg from './modalImg/ModalImg';

function ListUser() {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [listUser, setListUser] = useState([]);
    // console.log(listUser);
    const [errorAPI, setErrorAPI] = useState([]);
    // console.log('errorAPI :',errorAPI);

    const [show, setShow] = useState(false);
    const [current,setCurrent] = useState(1)
    // cài đặt Pagination
    const PaginationChange = (page) => {
        setCurrent(page);
    }

    const getListUser = async (page) => {
        try {
            const {data} = await apiListUser(page);
            // console.log(data);
            setListUser(data?.content);
        } catch (error) {
            setErrorAPI(error);
        }
    }
    useEffect(()=>{
        getListUser(current);
    },[current]);

    const onSubmit = async (value) => {
        // console.log(value);
        try {
            let data = null;
            if(show.key === 'update') {data = await apiUpdateInfoUser(value)};
            // if(show.key === 'img') {data = await apiUpdateImgUser(value.hinhAnh, show.value)};
            console.log('data: ',data);
            Swal.fire({
                title: `Bạn đã update thành công ID: ${data?.data.content.id}`,
                text: "Nhấn Ok để tiếp tục!",
                icon: "success",
                confirmButtonColor:'#ff395c',
            }).then((willSuccess) => {
                if (willSuccess) {
                    setShow(false);
                    // trang danh sách user chỉ cần call api lại thôi
                    navigate(0);
                }
              })
        } catch (error) {
            console.log('error: ',error);
            Swal.fire({
                title: error?.message,
                text: `${error?.response?.data?.content} !!`,
                icon: "error",
                confirmButtonColor:'#ff395c',
            })
        }
    };
    const onError = (err) => {
        console.log(err);
    }

    // xóa tài khoản
    const handleRemove = async (id) => {
        try {
            const data = await apiRemoveUser(id);
            Swal.fire({
                title: `${data?.data.message} ID: ${id}`,
                text: "Nhấn Ok để tiếp tục!",
                icon: "success",
                confirmButtonColor:'#ff395c',
              }).then((willSuccess) => {
                if (willSuccess) {
                    getListUser();
              navigate(0);

                }
              })
        } catch (error) {
            Swal.fire({
                title: error?.response.data.content,
                text: `${error?.response?.data?.content} !!`,
                icon: "error",
                confirmButtonColor:'#ff395c',
              });
              navigate(0);
        }
    }

    const handleUpdateUser = (user) => {
        // console.log(user);
        setShow({key: 'update', value: user});
    }

    // const handleImg = () => {
    //     setShow({key: 'img'});
    // }
    // debugger;
    return (
        <div className='listUser w-100'>
            <h2 className='title'>Quản lý danh sách User</h2>
            <div className="d-flex justify-content-around mb-2">
                <div className="input-group w-50">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nhập email và nhấn Enter..." 
                    name="inputValue"
                />
                </div>
                <button className='btnPrimary' onClick={()=>navigate('/add-user')}>Thêm User</button>
            </div>

            <div className="body">
                <div className="container-fluid">
                    <div className="row">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Birthday</th>
                                    <th scope='col'>Phone</th>
                                    <th scope='col'>Gender</th>
                                    <th scope='col'>Role</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser?.data?.map((user, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{(current - 1)*10 + index+1}</td>
                                            <td>{user.id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.name}</td>
                                            <td>{user.birthday}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.gender ? 'Male' : 'Female'}</td>
                                            <td>{user.role.toLowerCase()}</td>
                                            <td>
                                                <button onClick={()=>handleUpdateUser(user)} className='btn text-secondary'><i className="bi bi-pencil-square"></i></button>
                                                <button onClick={()=>handleRemove(user.id)} className='btn text-danger'> <i className="bi bi-trash3"></i></button>
                                                <button onClick={() => navigate(`/booking?userID=${user.id}`)} className='btn text-secondary'><i className="bi bi-clock-history"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <Pagination
                            className="pagination"
                            onChange={PaginationChange}
                            total={Math.ceil(listUser.totalRow / 10)}
                            // ko thể thiếu current
                            current={current}
                            pageSize={1}
                            />
                    </div>
                </div>
            </div>
            <ModalUserUpdate 
                onShow={show}
                handleShow={setShow}
                onError = {onError}
                onSubmit = {onSubmit}
            />
            {/* <ModalImg 
                onShow={show}
                handleShow={setShow}
                onError = {onError}
                onSubmit = {onSubmit}
            /> */}
        </div>
    )
}

export default ListUser