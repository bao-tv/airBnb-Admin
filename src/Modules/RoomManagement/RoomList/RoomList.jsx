import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Pagination from 'rc-pagination';
import Swal from 'sweetalert2';
import {apiRoomList, apiDeleteRoom, apiUpdateRoom, apiAddRoom, apiUpdateImgRoom} from '../../../Apis/roomAPI';
import {useNavigate} from 'react-router-dom';
import {locations} from '../../../Slices/locationSlice';
import './RoomList.scss';
import ModalRoom from './ModalRoom/ModalRoom';
import ModalImgRoom from './ModalImgRoom/ModalImgRoom';

function RoomList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [roomList, setRoomList] = useState([]);
    const [errorAPI, setErrorAPI] = useState(null);
    const [show, setShow] = useState([]);
    const [current,setCurrent] = useState(1);
    // cài đặt Pagination
    const PaginationChange = (page) => {
        setCurrent(page);
    }
    const getRoomList = async (page) => {
        try {
            const {content} = await apiRoomList(page);
            setRoomList(content);
        } catch (error) {
            setErrorAPI(error);
        }
    }
    useEffect(()=>{
        getRoomList(current);
    },[current]);

    const {locationList, error} = useSelector((state) => state.locationList);
    useEffect(() => {
        if (!locationList.length) {
          dispatch(locations());
        }
      }, []);

    const onSubmit = async (value) => {
        console.log(value);
        try {
            let data = null;
            if(show.key === 'update') {data = await apiUpdateRoom(value)}
            if(show.key === 'add') {data = await apiAddRoom(value)}
            if(show.key === 'img') {data = await apiUpdateImgRoom(value.hinhAnh, show.value)}
            if(data.statusCode === 200 || 201) Swal.fire({
                title: data?.message || show?.key === 'img' && 'Cập nhật hình ảnh thành công',
                text: "Nhấn Ok để tiếp tục!",
                icon: "success",
                confirmButtonColor:'#ff395c',
            }).then((willSuccess) => {
                console.log(data);
                if (willSuccess) {
                    setShow(false);
                    // trang danh sách user chỉ cần call api lại thôi
                    navigate(0);
                }
              })
        } catch (error) {
            Swal.fire({
                title: error?.message,
                text: `${error?.response?.data?.content} !!`,
                icon: "error",
                confirmButtonColor:'#ff395c',
            })
        }
    }

    const onError = (value) => {
        console.log(value);
    }

    const handleRemove = async (id) => {
        try {
            const data = await apiDeleteRoom(id);
            Swal.fire({
                title: `${data.message} phòng với ID: ${id}`,
                text: "Nhấn Ok để tiếp tục!",
                icon: "success",
                confirmButtonColor:'#ff395c',
              }).then((willSuccess) => {
                if (willSuccess) {
                    getRoomList(current);
                }
              })
        } catch (error) {
            Swal.fire({
                title: error?.message,
                text: `${error?.response?.data?.content} !!`,
                icon: "error",
                confirmButtonColor:'#ff395c',
            });
            navigate(0);
        }
    }

    const handleUpdate = (room) => {
        setShow({key: 'update', value: room});
    }

    const handleAddPhong = () => {
        setShow({key: 'add', value: null});
    }

    const handleImg = (id) => {
        setShow({key: 'img', value: id});
    }

    return (
    <div className='roomList w-100'>
        <h2 className='title'>Quản lý danh sách Phòng</h2>
        <div className="d-flex justify-content-around mb-2">
            <div className="input-group w-50">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Nhập email và nhấn Enter..." 
                name="inputValue"
            />
            </div>
            <button className='btnPrimary' onClick={() => handleAddPhong()}>Thêm phòng</button>
        </div>
        <div className="body">
            <div className="container">
                <div className="row">
                    <table className='table table-hover table-bordered w-100'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Tên Phòng</th>
                                <th scope='col'>ID</th>
                                <th scope='col'>Số khách</th>
                                <th scope='col'>phòng ngủ - giường</th>
                                <th scope='col'>phòng tắm</th>
                                <th scope='col'>Mô tả</th>
                                <th scope='col'>Giá tiền</th>
                                <th scope='col'>Tiện ích</th>
                                <th scope='col'>Vị trí</th>
                                <th scope='col'>Hình ảnh</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomList?.data?.map((room, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{(current - 1)*10 + index+1}</td>
                                        <td>{room.tenPhong}</td>
                                        <td>{room.id}</td>
                                        <td>{room.khach}</td>
                                        <td>
                                            <div>{`- Phòng ngủ: ${room.phongNgu}`}</div> 
                                            <div>{`- Giường: ${room.giuong}`}</div>
                                        </td>
                                        <td>{room.phongTam}</td>
                                        <td>
                                            {room.moTa}
                                        </td>
                                        <td>{room.giaTien}</td>
                                        <td>
                                            {Object.entries(room).filter(([key, value]) => typeof value === 'boolean' && value).map(([key, value]) => (
                                            <div key={key}>- {key}</div>
                                            ))}
                                        </td>
                                        <td>
                                            {locationList.filter(item => item.id === room?.maViTri)[0]?.tenViTri +
                                            ', ' +locationList.filter(item => item.id === room?.maViTri)[0]?.tinhThanh +
                                            ', ' +locationList.filter(item => item.id === room?.maViTri)[0]?.quocGia
                                            }
                                        </td>
                                        <td><img src={room.hinhAnh} alt="" srcset="" style={{width:'200px'}}/></td>
                                        <td>
                                            <button onClick={() => handleUpdate(room)} className='btn text-secondary'><i className="bi bi-pencil-square"></i></button>
                                            <button onClick={() => handleImg(room.id)} className='btn text-secondary'><i className="bi bi-image"></i></button>
                                            <button onClick={() => handleRemove(room.id)} className='btn text-danger'> <i className="bi bi-trash3"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Pagination
                        className="pagination"
                        onChange={PaginationChange}
                        total={Math.ceil(roomList?.totalRow / 10)}
                        // ko thể thiếu current
                        current={current}
                        pageSize={1}
                        />
                </div>
            </div>
        </div>
        <ModalRoom 
            show = {show}
            setShow = {setShow}
            onError = {onError}
            onSubmit = {onSubmit}
            locationList = {locationList}
        />
        <ModalImgRoom 
            show={show}
            setShow={setShow}
            onSubmit = {onSubmit}
            onError = {onError}
        />
    </div>
  )
}

export default RoomList