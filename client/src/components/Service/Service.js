import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import {getVehiclesForDriver, addUpdateVehicleService} from '../../store/actions/vehicle';
import {getRoutes} from '../../store/actions/route_acton';
import { toast } from 'react-toastify';
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
    if (!vehicle) return toast.warning('Choose vehicle is required.');
    if (!route) return toast.warning('Choose route is required.');
    let routeC = props.routes.filter(item => item._id === route)[0];
    let routeR = props.routes.filter(item => item.number === routeC.number).filter(item => item._id !== route)[0];
    const body = {
      type_of_service: typeOfService,
      has_route: routeC.name,
      has_reverse_route: (routeR && routeR.name) ? routeR.name : 'none',
      number: routeC.number
    }
    props.dispatch(addUpdateVehicleService(vehicle, body));
    props.history.goBack();
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
          <select className="choose_vehicle" value={vehicle ? vehicle : 'none'}
            onChange={(e) => setVehicle(e.target.value)}
            disabled={props.match.params.vehicleId !== 'new'}>
            <option disabled value="none">Choose the vehicle...</option>
            {vehicles.map(veh => (
              <option key={veh._id} value={veh._id}>
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
          <select className="choose_route" value={route ? route : 'none'}
                  onChange={(e) => setRoute(e.target.value)}
          >
            <option disabled value="none">Choose the route...</option>
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
