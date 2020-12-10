import React, { Fragment } from 'react';
import moment from 'moment';

export const VehicleFormItem = ({vehicle, vehicleForEdit, deleteVehicle}) => {
  return (
    <Fragment >
      <td className="users__form-email">{`${vehicle.type_of_vehicle} / ${vehicle.plate}`}</td>
      <td>{vehicle.model}</td>
      <td>{vehicle.seats}</td>
      <td>{vehicle.color}</td>
      <td className="users__form-email">{moment(vehicle.createdAt).format("YYYY/MM/DD")}</td>
      <td>
        <div className="users__form--btns">
          <button type="button" onClick={vehicleForEdit(vehicle)}>Edit</button>
          <button type="button">Active</button>
          <button type="button" onClick={() => deleteVehicle(vehicle._id)}>Delete</button>
        </div>
      </td>
    </Fragment>
  )
}

export default (VehicleFormItem)
