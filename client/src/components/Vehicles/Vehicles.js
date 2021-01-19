import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MoonLoader from "react-spinners/MoonLoader";
import MyAccountNavBar from '../NavBar/MyAccountNavBar';
import {
  activeVehicle,
  clearVehiclePosition,
  getVehiclesForDriver,
  watchVehiclePosition,
  addUpdateVehicleService
} from '../../store/actions/vehicle';
import './Vehicles.css';
import VehicleItem from './VehicleItem';
import {toast} from "react-toastify";

let watchId;
let geoLoc = navigator.geolocation;

const Vehicles = (props) => {

  const [vehiclesData, setVehiclesData] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [lastPosition, setLastPosition] = useState({});
  const [currentActiveVehicle, setCurrentActiveVehicle] = useState();

  useEffect(() => {
    props.dispatch(getVehiclesForDriver());
  },[]);

  useEffect(() => {
    if (props.vehicles.length) {
      setVehiclesData(props.vehicles);
      setLoading(props.loading);
      let activeVehicle = props.vehicles.filter(vehicle => vehicle.isActive === true)[0];
      activeVehicle && setCurrentActiveVehicle(activeVehicle);
    } 
  },[props.vehicles]);
  
  useEffect(() => {
    if(currentActiveVehicle && currentActiveVehicle.isActive) {
      let average = currentActiveVehicle.average_speed.length > 1 && (currentActiveVehicle.average_speed.reduce(
        (total,num) => +total + +num)).toFixed(3) / currentActiveVehicle.average_speed.length;
      setLastPosition({
        latitude: currentActiveVehicle.latitude,
        longitude: currentActiveVehicle.longitude,
        speed: currentActiveVehicle.speed,
        average_speed: average
      });
    }
  },[currentActiveVehicle])
  
  const handleTracker = async (vehicle, trigger) => {
    if (trigger) {
      if (watchId === undefined) {
        await props.dispatch(activeVehicle(vehicle._id));
        if(!navigator.geolocation) {
          toast.error('Geolocation is not supported by your browser');
        } else {
          watchId = geoLoc.watchPosition( (position) => {
              props.dispatch(watchVehiclePosition(vehicle._id, position.coords));
            },(error) => console.log(error),
            {
              timeout: 60000,
              maximumAge: 60000,
              distanceFilter: 15
            })
        }
      } else {
        await props.dispatch(activeVehicle(vehicle._id));
      }
    } else {
      geoLoc.clearWatch(watchId);
      watchId = null;
      setLastPosition({})
      await props.dispatch(clearVehiclePosition(vehicle._id));
    }
  }
  
  const handleReverseRoute = () => {
    let body = {
      type_of_service: currentActiveVehicle.type_of_service,
      has_route: currentActiveVehicle.has_reverse_route,
      has_reverse_route: currentActiveVehicle.has_route,
      number: currentActiveVehicle.number
    }
    props.dispatch(addUpdateVehicleService(currentActiveVehicle._id, body))
  }
  
  const renderLocation = (
    <div>
      <div style={{fontWeight: '700', display: 'block', marginLeft: '5px'}}>
        {`lat: ${(+lastPosition.latitude).toFixed(6)}`}
      </div>
      <div style={{fontWeight: '700', display: 'block', marginLeft: '5px'}}>
            {`lng: ${(+lastPosition.longitude).toFixed(6)}`}
          </div>
      <div style={{fontWeight: '700', display: 'block', marginLeft: '5px'}}>
            {`speed: ${(+lastPosition.speed).toFixed(2)}`}
          </div>
      <div style={{fontWeight: '700', display: 'block', marginLeft: '5px'}}>
            {`average speed: ${(+lastPosition.average_speed).toFixed(2)}`}
      </div>
      <hr/>
      <button className="reverseRoute__button" onClick={handleReverseRoute}>Reverse Route</button>
      <hr/>
    </div>
  )

  const renderVehicles = vehiclesData.map(vehicle => (
    <div key={vehicle._id}>
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', margin: '10px 0', justifyContent: 'space-between'}}>
        <VehicleItem
          vehicle={vehicle}
          handleTracker={handleTracker}
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
      <Link to="/add_vehicle" className="add_vehicle--link" style={{marginBottom: '10px', display: 'inline-block'}}>
        Add vehicle
      </Link>
      <hr/>
      {lastPosition && lastPosition.latitude && renderLocation}
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
