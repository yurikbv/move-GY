import React, { Fragment } from 'react';
import moment from 'moment';


export default function UsersFormItem({user, userForEdit, deleteUser,activatingUser}) {

  return (
    <Fragment >
      <td className="users__form-email">{user.email}</td>
      <td className="users__form-email">{user.mobileNumber}</td>
      <td className="users__form-email">{moment(user.createdAt).format("YYYY/MM/DD")}</td>
      <td>{user.name}</td>
      <td>{user.role}</td>
      <td>
        <div className="users__form--btns">
          <button type="button" onClick={userForEdit(user)}>Edit</button>
          <button type="button" onClick={() => activatingUser(user)}
            style={{ color: user.activation && 'red' }}
          >Active</button>
          <button type="button" onClick={() => deleteUser(user._id)}>Delete</button>
        </div>
      </td>
    </Fragment>
  )
}
