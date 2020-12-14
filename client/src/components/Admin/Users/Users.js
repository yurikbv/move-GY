import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import NavBar from '../NavBar/NavBar';
import './Users.css';
import {getUsers, deleteUserByAdmin, activatingUserByAdmin} from '../../../store/actions/admin';
import UsersFormItem from './UsersFormItem';
import UsersModal from './UsersModal';

const Users = (props) => {

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  

  useEffect(() => {
    props.dispatch(getUsers());
  },[])

  useEffect(() => {
    if (props.users) {
      setUsers(props.users);
      setLoading(props.loading);
    }
  }, [props.users])

  const userForEdit = user => e => {
    e.preventDefault();
    toggleModal();
    setCurrentUser(user);
  };

  const deleteUser = id => {
    props.dispatch(deleteUserByAdmin(id))
  };
  
  const activatingUser = user => {
    props.dispatch(activatingUserByAdmin(user._id, {activation: !user.activation}))
  }

  const toggleModal = () => setShowFormModal(!showFormModal);

  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="admin__users container">
        <h3>ADMIN</h3>
        <NavBar />
        {showFormModal && <UsersModal user={currentUser} toggleModal={toggleModal}/>}
        {loading ?
        <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader />
        </div> :
        <table className="admin__table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone</th>
              <th>Join Date</th>
              <th>Name</th>
              <th>User Type</th>
              <th>Status</th>
            </tr>
          </thead>
        <tbody>
      {users && users.map(user =>  (
        <tr key={user._id}>
          <UsersFormItem user={user} userForEdit={userForEdit} deleteUser={deleteUser} activatingUser={activatingUser}/>
        </tr>))}
        </tbody>
        </table>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  users: state.admin.users,
  loading: state.admin.loading,
  error: state.admin.error
})

export default connect(mapStateToProps)(Users);
