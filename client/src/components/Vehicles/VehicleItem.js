import React, {Fragment, useState,useEffect} from 'react';
import ToggleButton from 'react-toggle-button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import {getVehiclesForDriver, watchVehiclePosition, clearVehiclePosition} from '../../store/actions/vehicle';

const borderRadiusStyle = { borderRadius: 2 };

let timerID;
const VehicleItem = (props) => {

  const [lastPosition, setLastPosition] = useState({latitude: '', longitude: '', average_speed: '',speed: []});
  
  useEffect(() => {
    props.vehicle.isActive && 
      setLastPosition({latitude: props.vehicle.latitude, longitude: props.vehicle.longitude});
  },[])

  let position = (id) => {
    if(!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition( async (position) => {
        setLastPosition({latitude: position.coords.latitude, longitude: position.coords.longitude});
        // localStorage.setItem(id, true);
        await props.dispatch(watchVehiclePosition(id, position.coords));
        await props.dispatch(getVehiclesForDriver());
      },(error) => console.log(error))
    }
  }

  const handleTracker = async (id, trigger) => {
    console.log(`trigger: ${trigger}`);
    if (trigger) {
        position(id);
        timerID = window.setTimeout(function tick () {
          console.log(`timer on: ${timerID}`);
          position(id);
          timerID = window.setTimeout(tick, 60000);
        }, 0)
    } else {
      window.clearTimeout(timerID);
      timerID = null;
      console.log(`timer off: ${timerID}`);
      // localStorage.removeItem(id);
      setLastPosition({latitude: '', longitude: '', average_speed: '', speed: []})
      await props.dispatch(clearVehiclePosition(id));
      await props.dispatch(getVehiclesForDriver());
      
    }
  }

  const switchButton = async (id, value) => {
    console.log(`switch button: ${value}`);
    let vehicles = await (props.vehiclesData.map(vehicle => {
      return vehicle._id === id ? {...vehicle, isActive: !value } : vehicle
    }));
    props.updateVehicles(vehicles);
    handleTracker(id, !value);
  }

  console.log(`isActive: ${props.vehicle.isActive}`);

  return (
    <Fragment>
      <span style={{margin: '0 3px'}}>{props.vehicle.type_of_vehicle}</span> /
      <span style={{margin: '0 3px'}}>{props.vehicle.plate}</span> / 
      {props.service ? props.service : <Link to="/add_service" style={{margin: '0 3px'}}>Add Service
      </Link>} / 
      <span style={{margin: '0 3px'}}> Tracker</span>
      <div style={{marginLeft: '3px'}}>
        <ToggleButton style={{display: 'inline'}}
          value={props.vehicle.isActive}
          thumbStyle={borderRadiusStyle}
          trackStyle={borderRadiusStyle}
          onToggle={(value) => {switchButton(props.vehicle._id, value)}}
        />
      </div>
      
        {
        lastPosition.latitude && lastPosition.longitude && 
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <span style={{fontWeight: '700', marginLeft: '10px'}}>
            {`lat: ${lastPosition.latitude}`}
          </span>
          <span style={{fontWeight: '700', marginLeft: '10px'}}>
            {`lng: ${lastPosition.latitude}`}
          </span>
        </div>}
    </Fragment>
  )
}

export default connect()(VehicleItem);
