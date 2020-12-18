import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import {getVehiclesForDriver} from '../../store/actions/vehicle'
import {getRoutes} from '../../store/actions/route_acton';
import MyAccountNavBar from "../NavBar/MyAccountNavBar";
import './Service.css';

const Service = (props) => {
  
  const [vehicles, setVehicles] = useState();
  const [routes, setRoutes] = useState();
  const [vehicle, setVehicle] = useState();
  const [route, setRoute] = useState();
  const [typeOfService, setTypeOfService] = useState();
  const [loading, setLoading ] = useState(true);
  
  useEffect(() => {
    props.dispatch(getVehiclesForDriver());
    props.dispatch(getRoutes());
  },[]);
  
  useEffect(() => {
    if (props.vehicles) {
      setVehicles(props.vehicles);
      if (props.match.params.vehicleId !== 'new') {
        setVehicle(props.match.params.vehicleId);
      }
    }
    if (props.routes) {
      let sortRoutes = props.routes.sort((a, b) => a.number < b.number ? - 1 : Number(a.number > b.number));
      setRoutes(sortRoutes);
      setLoading(props.loading);
      if (props.match.params.name !== 'new') {
        let filterRoute = props.routes.filter(route => route.name === props.match.params.name)
        setRoute(filterRoute._id);
      }
    }
  }, [props.vehicles, props.routes])
  
  const handleSubmit = e => {
    e.preventDefault();
  }
  
  return (
    <div className="container" style={{flexGrow: '1', width: '100%',boxSizing: 'border-box'}}>
      <h3>My Account</h3>
      <MyAccountNavBar />
      <hr/>
      {loading ? <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader /></div> :
      <form onSubmit={handleSubmit}>
        <label>
          {/*<span style={{fontSize: '18px'}}>Choose the vehicle:</span><br/>*/}
          <select className="choose_vehicle" value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          >
            <option disabled selected={!vehicle}>Choose the vehicle...</option>
            {vehicles.map(veh => (
              <option key={veh._id} value={veh._id} selected={veh._id === vehicle}>
                {veh.type_of_vehicle} {veh.model} - {veh.plate}
              </option>
            ))}
          </select>
        </label>
        <span style={{display: 'block',fontSize: '18px', marginTop: '10px'}}>Choose type of service:</span>
        <label className="alert__add--label" style={{display: 'block',marginTop:'10px'}}>
          <input type="radio" name="type_of_service" value="route"
            onChange={(e) => setTypeOfService(e.target.value)}/>
          <span>Bus route</span>
        </label>
        {typeOfService === 'route' &&
        <label>
          {/*<span style={{fontSize: '18px'}}>Choose the Route:</span><br/>*/}
          <select className="choose_route" value={route}
                  onChange={(e) => setRoute(e.target.value)}
          >
            <option disabled selected>Choose the route...</option>
            {routes.map(rou => (
              <option key={rou._id} value={rou._id}>{rou.number} {rou.name}</option>
            ))}
            
          </select>
        </label>
        }
        <label className="alert__add--label" style={{display: 'block',marginTop:'10px'}}>
          <input type="radio" name="type_of_service" value="hire_car" disabled={true}
            onChange={(e) => setTypeOfService(e.target.value)}/>
          <span>Hire car</span>
        </label>
        <label className="alert__add--label" style={{display: 'block',marginTop:'10px'}}>
          <input type="radio" name="type_of_service" value="private" disabled={true}
            onChange={(e) => setTypeOfService(e.target.value)}/>
          <span>Private</span>
        </label>
        <button type="submit" style={{marginBottom: '15px', display: 'block'}} className="route-add-edit__submit">Submit</button>
      </form>}
    </div>
  )
};

const mapStateToProps = state => ({
  routes: state.routes.routes,
  vehicles: state.vehicles.vehicles,
  loading: state.routes.loading
})

export default connect(mapStateToProps)(Service);
