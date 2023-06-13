import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Pagination from 'rc-pagination';
import Swal from 'sweetalert2';
import {apiDeleteLocation, apiUpdateLocation, apiAddLocation, apiUpdateIMGLocation} from '../../../Apis/roomAPI';
import {locations} from '../../../Slices/locationSlice';
import ModalLocation from './ModalLocation/ModalLocation';
import {useNavigate} from 'react-router-dom'
import ModalImg from './ModalImg/ModalImg';

function Location() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorAPI, setErrorAPI] = useState([]);
    const [current,setCurrent] = useState(1);
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState(null);

    // lấy ds list vị trí từ redux
    const {locationList, error} = useSelector((state) => state.locationList);
    if(error) setErrorAPI(error);
    useEffect(() => {
        dispatch(locations());
      }, []);

    const PaginationChange = (page) => {
        setCurrent(page);
    };

    const onSubmit = async (value) => {
        try {
            let data = null;
            if(show === 'update') {data = await apiUpdateLocation(value)};
            if(show === 'add') {data = await apiAddLocation(value)};
            if(show?.name === 'img') {data = await apiUpdateIMGLocation(value?.hinhAnh, show?.id)};
            // console.log(data);
            if(data.statusCode === 200 || 201) Swal.fire({
                title: data?.message || show?.name === 'img' && 'Cập nhật hình ảnh thành công',
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
            // console.log(error);
            Swal.fire({
                title: error?.message,
                text: `${error?.response?.data?.content} !!`,
                icon: "error",
                confirmButtonColor:'#ff395c',
            })
        }
    };

    const onError = (e) => {
        setErrorAPI(e);
    }

    const handleDelete = async (id) => {
        try {
            const data = await apiDeleteLocation(id);
            if(data.statusCode === 200) Swal.fire({
                title: `bạn đã xóa thành công vị trí với ID: ${id}`,
                text: "Nhấn Ok để tiếp tục!",
                icon: "success",
                confirmButtonColor:'#ff395c',
              }).then((willSuccess) => {
                if (willSuccess) {
                    dispatch(locations());
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
    
    const handleUpdate = (location) => {
        setShow('update');
        setLocation(location);
    }
    
    const handleAddVitri = () => {
        setShow('add');
        setLocation(null);
    }

    const handleIMG = async (id) => {
        setLocation(null);
        setShow({'name' : 'img', id: id});
    }
    
    return (
    <div className='location'>
        <div className="d-flex justify-content-around">
            <div className="input-group w-50">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Nhập email và nhấn Enter..." 
                name="inputValue"
            />
            </div>
            <button className='btnPrimary' onClick={handleAddVitri}>Thêm Vị trí</button>
        </div>
        <div className="body">
            <div className="container">
                <div className="row">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>Vị trí</th>
                                <th scope='col'>Tỉnh</th>
                                <th scope='col'>Quốc gia</th>
                                <th scope='col'>Hình ảnh</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locationList?.map((loaction, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{loaction.id}</td>
                                        <td>{loaction.tenViTri}</td>
                                        <td>{loaction.tinhThanh}</td>
                                        <td>{loaction.quocGia}</td>
                                        <td><img src={loaction.hinhAnh} alt="" style={{width: '200px'}}/></td>
                                        <td>
                                            <button onClick={() => handleUpdate(loaction)} className='btn text-secondary'><i className="bi bi-pencil-square"></i></button>
                                            <button onClick={() => handleIMG(loaction.id)} className='btn text-secondary'><i className="bi bi-image"></i></button>
                                            <button onClick={()=>handleDelete(loaction.id)} className='btn text-danger'> <i className="bi bi-trash3"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Pagination
                            className="pagination"
                            onChange={PaginationChange}
                            total={Math.ceil(locationList?.length / 10)}
                            // ko thể thiếu current
                            current={current}
                            pageSize={1}/>
                </div>
            </div>
        </div>

        <ModalLocation 
            show={show}
            setShow={setShow}
            location = {location}
            onSubmit = {onSubmit}
            onError = {onError}
        />
        
        <ModalImg 
            show={show}
            setShow={setShow}
            onSubmit = {onSubmit}
            onError = {onError}
        />
        
    </div>
    )
}

export default Location