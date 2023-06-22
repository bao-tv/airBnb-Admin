import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {apiAllCommentList , apiDeleteComment, apiUpdateComment} from "../../Apis/commentAPI";
import {useNavigate, useLocation} from 'react-router-dom';
import ModalComment from './ModalComment/ModalComment';

function Comment() {
  const dayjs = require('dayjs');
    const navigate = useNavigate();
    // lấy từ url userID từ react router dom đã gửi tại mục quản lý user http://localhost:3000/list-user
    const commentID = new URLSearchParams(useLocation().search).get('commentID');
    const roomID = new URLSearchParams(useLocation().search).get('roomID');
    const [inputValue, setInputValue] = useState(null);
    const [commentRoom, setCommentRoom] = useState([]);
    const [show, setShow] = useState([]);
    const getCommentRoom = async () => {
      try {
        const {content} = await apiAllCommentList();
        if (commentID || roomID || inputValue) {
            let result = content;
            if (commentID) {
                result = content.filter((cmt) => cmt.id == commentID);
              } else if (roomID) {
                result = content.filter((cmt) => cmt.maPhong == roomID);
              } else if (inputValue) {
                result = content.filter((cmt) => cmt.maPhong == inputValue);
              }
            setCommentRoom(result);
            if(!result.length) Swal.fire({
              title: "Không tìm thấy bình luận",
              // text: `${error?.message} !!`,
              icon: "error",
              confirmButtonColor:'#ff395c',
          })
        } else {
        setCommentRoom(content);
        }
      } catch (error) {
        // console.log(error);
        Swal.fire({
          title: "Không tìm thấy bình luận",
          text: `${error?.message} !!`,
          icon: "error",
          confirmButtonColor:'#ff395c',
      })
        }
    }
    
    useEffect(() => {
        getCommentRoom();
    }, [inputValue, roomID, commentID]);
  
    const onSubmit = async (value) => {
      try {
        let data = null;
        if(show.key === 'update') {data = await apiUpdateComment(value)};
        Swal.fire({
          title: data?.message,
          text: "Nhấn Ok để tiếp tục!",
          icon: "success",
          confirmButtonColor:'#ff395c',
      }).then((willSuccess) => {
          console.log(data);
          if (willSuccess) {
              setShow(false);
              // reload page update lại thông tin trên table
              // reload lại page nhưng vẫn giữ giá trị userID đang update
              // input user đã bị mất nên phải lưu trên url và sử dụng useLocation để lưu
              navigate(`/comment?commentID=${value.id}`);
              window.location.reload();
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
    }
  
    const onError = async (value) => {
      // console.log(value);
      console.log(value);
  }
  
    // console.log(inputValue);
    const handleInput = evt => {
      // console.log(evt.target);
      if (evt?.key === 'Enter' || evt?.key === 'Tab') {
        setInputValue(evt?.target?.value);
      }
    }
  
    const handleDeleteComment = async (id) => {
      // console.log(id);
      try {
        const data = await apiDeleteComment(id);
        Swal.fire({
          title: `${data.message} phòng với ID: ${id}`,
          text: "Nhấn Ok để tiếp tục!",
          icon: "success",
          confirmButtonColor:'#ff395c',
        }).then((willSuccess) => {
          if (willSuccess) {
            getCommentRoom();
          }
        })
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error?.message,
          text: `${error?.response?.data} !!`,
          icon: "error",
          confirmButtonColor:'#ff395c',
      });
        navigate(0);
      }
    }
  
    const handleUpdateComment = (Comment) => {
      setShow({key: 'update', value: Comment})
    }
  
    return (
      <div className='comment w-100'>
        <h2 className='title'>Quản lý bình luận</h2>
        <div className='container-fluid'>
          <div className="row">
            <div className="col">
              <div className="d-flex justify-content-around mb-2">
                  <div className="input-group w-50">
                  <input 
                      type="text" 
                      className="form-control" 
                      placeholder="nhập mã phòng và nhấn Enter" 
                      name="inputValue"
                      onKeyDown={handleInput}
                  />
                  </div>
              </div>
              <div className="body">
                  <table className='table table-hover table-bordered w-100'>
                      <thead>
                          <tr>
                              <th scope='col'>#</th>
                              <th scope='col'>ID</th>
                              <th scope='col'>Mã phòng</th>
                              <th scope='col'>Mã người bình luận</th>
                              <th scope='col'>Nội dung</th>
                              <th scope='col'>Số sao</th>
                              <th scope='col'>Ngày bình luận</th>
                              <th scope='col'>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {commentRoom?.map((comment, index) => {
                              return(
                                  <tr key={index}>
                                      <th scope="row">{index+1}</th>
                                      <td>{comment.id}</td>
                                      <td>{comment.maPhong}</td>
                                      <td>{comment.maNguoiBinhLuan}</td>
                                      <td>{comment.noiDung}</td>
                                      <td>{comment.saoBinhLuan}</td>
                                      <td>{dayjs(comment.ngayBinhLuan).$d != 'Invalid Date' ? dayjs(comment.ngayBinhLuan).format('DD/MM/YYYY') : ''}</td>
                                      {/* <td>{dayjs(comment.ngayBinhLuan).format('DD/MM/YYYY')}</td> */}

                                      <td>
                                          <button onClick={() => handleUpdateComment(comment)} className='btn text-secondary'><i className="bi bi-pencil-square"></i></button>
                                          {/* <button onClick={() => handleImg(room.id)} className='btn text-secondary'><i className="bi bi-image"></i></button> */}
                                          <button onClick={() => handleDeleteComment(comment.id)} className='btn text-danger'> <i className="bi bi-trash3"></i></button>
                                      </td>
                                  </tr>
                              )
                          })}
                      </tbody>
                  </table>
                  {!(commentRoom?.length) && 
                  <div className='text-center text-danger'>
                      <h3>Không tìm thấy bình luận với phòng này</h3>
                  </div>
                  }
                </div>
              </div>
          </div>
        </div>
        <ModalComment 
          show = {show}
          setShow = {setShow}
          onError = {onError}
          onSubmit = {onSubmit}
        />
      </div>
    )
  }

export default Comment