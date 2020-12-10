import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { updateUserByAdmin } from '../../../store/actions/admin';
import './UsersModal.css';

const UsersModal = (props) => {

  const [data, setData] = useState({
    email: '',
    mobileNumber: '',
    createdAt: '',
    name: '',
    role: ''
  });

  useEffect(() => {
    let user = {...props.user, createdAt: moment(props.user.createAt).format("YYYY/MM/DD")};
    setData(user);
  }, [props.user])

  const handleChange = e => {
    setData({...data, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(updateUserByAdmin(data, props.user._id));
    props.toggleModal();
  }

  return (
    <div className="users__modal">
      <form className="users__form--modal" onSubmit={handleSubmit}>
        <div style={{textTransform: 'uppercase', fontWeight: '700', color: '#901CE8'}}>Edit User</div>
        <hr/>
        <label>
          <span>Email</span>
          <input type="email" name="email" value={data.email} disabled/>
        </label>
        <label>
          <span>Phone</span>
          <input type="text" name="mobileNumber" value={data.mobileNumber} onChange={handleChange}/></label>
        <label>
          <span>Join Date</span>
          <input type="text" name="createAt" value={data.createdAt} disabled/>
        </label>
        <label>
          <span>Name</span>
          <input type="text" name="name" value={data.name} onChange={handleChange}/>
        </label>
        <label>
          <span>User Type</span>
          <input type="text" name="role" value={data.role} onChange={handleChange}/>
        </label>
        <button type="cancel" className="users__form--cancel" 
        onClick={(e) => {
          e.preventDefault();
          props.toggleModal();
        }}>Cancel</button>
        <button type="submit" className="users__form--save">Save</button>
      </form>
    </div>
  )
}

export default connect()(UsersModal)
