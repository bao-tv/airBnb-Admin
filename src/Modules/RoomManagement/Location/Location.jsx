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
    const [errorAPI, setErrorAPI] = useState(null);
    console.log("errorAPI: ",errorAPI);
    useEffect(() => {
        if(errorAPI) Swal.fire({
            title: "Không tìm thấy mã phòng",
            text: `${error?.message} !!`,
            icon: "error",
            confirmButtonColor:'#ff395c',
        })
    }, [errorAPI])
    const [current,setCurrent] = useState(1);
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState(null);
    // console.log(inputValue);
    const [location, setLocation] = useState(null);

    // lấy ds list vị trí từ redux
    const {locationList, error} = useSelector((state) => state.locationList);
    // console.log("locationList: ",locationList);
    let locationResult = locationList;
    if(inputValue) locationResult = locationList?.filter((location) => location.id == inputValue);
    if(error) setErrorAPI(error);
    // debugger;
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

    const handleInput = evt => {
        // console.log(evt.target);
        if (evt?.key === 'Enter' || evt?.key === 'Tab') {
          setInputValue(evt?.target?.value);
        }
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
    <div className='location w-100'>
        <h2 className='title'>Quản lý vị trí</h2>
        <div className="d-flex justify-content-around mb-2">
            <div className="input-group w-50">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Nhập mã vị trí và nhấn Enter..." 
                name="inputValue"
                onKeyDown={handleInput}
            />
            </div>
            <button className='btnPrimary' onClick={handleAddVitri}>Thêm Vị trí</button>
        </div>
        <div className="body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <table className='table table-bordered'>
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
                                
                                {locationResult?.map((location, index)  => {
                                    return(
                                        <tr key={index}>
                                            <td>{location.id}</td>
                                            <td>{location.tenViTri}</td>
                                            <td>{location.tinhThanh}</td>
                                            <td>{location.quocGia}</td>
                                            <td><img src={location.hinhAnh} alt="" style={{width: '200px'}}/></td>
                                            <td>
                                                <button onClick={() => handleUpdate(location)} className='btn text-secondary'><i className="bi bi-pencil-square"></i></button>
                                                <button onClick={() => handleIMG(location.id)} className='btn text-secondary'><i className="bi bi-image"></i></button>
                                                <button onClick={()=>handleDelete(location.id)} className='btn text-danger'> <i className="bi bi-trash3"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {!locationResult.length && <p className='text-center text-danger'>Không tìm thấy vị trí</p>}
                        {!inputValue && 
                            <Pagination
                                className="pagination"
                                onChange={PaginationChange}
                                total={Math.ceil(locationList?.length / 10)}
                                // ko thể thiếu current
                                current={current}
                                pageSize={1}/>
                        }
                    </div>
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