import React from 'react';
import style from './Error.module.scss';

function Error() {
  return (
    <div className={`${style.body} bg-bg-pink-color`}>
        <div className='container text-center'>
            <div className={`${style.title}`}>404</div>
            <h1>Page Not Found</h1>
            <p className="">Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã xảy ra lỗi!</p>
            <a href='http://localhost:3000/' className={`${style.btn}`}>Quay về trang chủ</a>
        </div>
    </div>
  )
}

export default Error