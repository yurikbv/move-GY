import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import NavBar from '../NavBar/NavBar';
import './Vehicles.css';
import {getVehicles, deleteVehicleByAdmin, activatingVehicleByAdmin} from '../../../store/actions/admin';
import VehicleFormItem from './VehicleFormItem';
import VehiclesModal from './VehiclesModal';

const AdminVehicles = (props) => {

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState({});

  useEffect(() => {
    if(localStorage.user) {
      props.dispatch(getVehicles());
    }
  },[])

  useEffect(() => {
    if (props.vehicles) {
      setVehicles(props.vehicles);
      setLoading(props.loading);
    }
  }, [props.vehicles]);

  const vehicleForEdit = vehicle => e => {
    e.preventDefault();
    toggleModal();
    setCurrentVehicle(vehicle);
  }

  const toggleModal = () => setShowFormModal(!showFormModal);

  const deleteVehicle = vehicle => {
    props.dispatch(deleteVehicleByAdmin(vehicle._id));
  }
  
  const activatingVehicle = vehicle => {
    props.dispatch(activatingVehicleByAdmin(vehicle._id, {activation: !vehicle.activation}))
  }

  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="admin__users container">
        <h3>ADMIN</h3>
        <NavBar />
        {showFormModal && <VehiclesModal vehicle={currentVehicle} toggleModal={toggleModal}/>}
        {loading ?
        <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader />
        </div> :
        <table className="admin__table">
          <thead>
            <tr>
              <th>Type / Plate</th>
              <th>Model</th>
              <th>Seats</th>
              <th>Color</th>
              <th>Reg Date</th>
              <th>Status</th>
            </tr>
          </thead>
        <tbody>
      {vehicles && vehicles.map(vehicle =>  (
        <tr key={vehicle._id}>
          <VehicleFormItem vehicle={vehicle} vehicleForEdit={vehicleForEdit} deleteVehicle={deleteVehicle}
            activatingVehicle={activatingVehicle}/>
        </tr>))}
        </tbody>
        </table>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  vehicles: state.admin.vehicles,
  loading: state.admin.loading,
  error: state.admin.error
})

export default connect(mapStateToProps)(AdminVehicles)
