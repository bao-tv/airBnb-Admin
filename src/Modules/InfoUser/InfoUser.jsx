import React, {useState} from 'react';
import { useSelector} from 'react-redux';
import style from './InfoUser.module.scss';
import ModalUserUpdate from '../../Components/ModalUpdate/ModalUserUpdate';

function InfoUser() {
    const { user } = useSelector((state) => state.user);
    // console.log(user);
    const [show, setShow] = useState(false);
    const handleShow = (value) => {
        setShow(value);
      };

    return (
    <>
        <div className={style.infoUser}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className={style.right}>
                            <table className={style.table}>
                                <tbody>
                                    <tr>
                                        <td>Id :</td>
                                        <td>{user?.user.id}</td>
                                    </tr>

                                    <tr>
                                        <td>Name :</td>
                                        <td>{user?.user.name}</td>
                                    </tr>

                                    <tr>
                                        <td>Email :</td>
                                        <td>{user?.user.email}</td>
                                    </tr>

                                    <tr>
                                        <td>Phone :</td>
                                        <td>{user?.user.phone}</td>
                                    </tr>

                                    <tr>
                                        <td>Birthday :</td>
                                        <td>{user?.user.birthday}</td>
                                    </tr>

                                    <tr>
                                        <td>Gender :</td>
                                        <td>{user?.user.gender ? 'Male' : 'Female' }</td>
                                    </tr>

                                    <tr>
                                        <td>Type user :</td>
                                        <td>{user?.user.role}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-6">
                        <div 
                            className={style.left}
                            onClick={()=>setShow(user?.user ? true : false)}
                        >
                            <i className="bi bi-pencil-square"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ModalUserUpdate 
            onShow = {show}
            handleShow = {handleShow}
            dataUser = {user?.user}
        />
    </>
  )
}

export default InfoUser