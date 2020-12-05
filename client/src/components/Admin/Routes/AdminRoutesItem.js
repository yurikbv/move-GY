import React, {Fragment} from 'react';
import {useHistory} from "react-router";

function AdminRoutesItem({route}) {

  const history = useHistory();

  return (
    <Fragment >
      <td>{route.city}</td>
      <td>{route.name}</td>
      <td>
        <button type="button">Edit</button>
      </td>
      <td>
        <div className="users__form--btns">
          <button type="button" onClick={() = history.push(`/admin/route_add_edit/${route._id}`)}>Edit</button>
          <button type="button">Active</button>
          <button type="button">Delete</button>
        </div>
      </td>
    </Fragment>
  )
}

export default AdminRoutesItem;
