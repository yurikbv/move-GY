import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MoonLoader from "react-spinners/MoonLoader";
import MyAccountNavBar from '../NavBar/MyAccountNavBar';
import {getVehiclesForDriver} from '../../store/actions/vehicle';
import './Vehicles.css';
import VehicleItem from './VehicleItem';


const Vehicles = (props) => {

  const [vehiclesData, setVehiclesData] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    props.dispatch(getVehiclesForDriver());
  },[]);

  useEffect(() => {
    if (props.vehicles.length) {
      setVehiclesData(props.vehicles);
      setLoading(props.loading)
    } 
  },[props.vehicles]);

  const renderVehicles = vehiclesData.map(vehicle => (
    <div key={vehicle._id}>
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', margin: '10px 0', justifyContent: 'space-between'}}>
        <VehicleItem
          vehicle={vehicle}
        />
      </div>
      <hr/>
    </div>
  ))

  return (
    <div className="container" style={{flexGrow: '1', width: '100%',boxSizing: 'border-box'}}>
      <h3>My Account</h3>
      <MyAccountNavBar />
      <hr/>
      <Link to="/add_vehicle" className="add_vehicle--link">Add vehicle</Link>
      <div style={{margin: '15px 0 -20px', color: 'red'}}>*Import: Please hold active only one vehicle tracker.</div>
      <span style={{display: 'block', margin: '25px 0 10px', fontWeight: '700'}}>
        type / tags / service / tracker
      </span>
      {loading ? 
      <div style={{position: 'absolute', left: '50%', top: '50%', transform:'translate(-50%,-50%)'}}>
        <MoonLoader />
      </div>  : <div >{renderVehicles}</div>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  vehicles: state.vehicles.vehicles,
  loading: state.vehicles.loading
})

export default connect(mapStateToProps)(Vehicles)
