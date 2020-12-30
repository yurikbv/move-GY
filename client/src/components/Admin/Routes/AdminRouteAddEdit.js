import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import {addRouteAction, getCurrentRouteAction, updateRoute} from '../../../store/actions/admin';

import './AdminRouteAddEdit.css';
import AdminRouteAddEditItem from './AdminRouteAddEditItem';
import GoBackButton from '../../UI/GoBackButton';
import {getCitiesAction} from "../../../store/actions/city_action";

const AdminRouteAddEdit = (props) => {

  const [route, setRoute] = useState({ name: '', logo: '', number: '', stops: [{
    name_of_stop: '',
    latitude: '', 
    longitude: ''
  }, {name_of_stop: '',
    latitude: '', 
    longitude: ''
  }]});
  const [betweenStops, setBetweenStops] = useState([]);
  const [cities, setCities] = useState([]);
  const [chooseCity, setChooseCity] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.match.params.id !== 'new') {
      props.dispatch(getCurrentRouteAction(props.match.params.id));
    }
  },[])
  
  useEffect(() => {
    props.dispatch(getCitiesAction());
  },[])
  
  useEffect(() => {
    if (props.cities) {
      setCities(props.cities)
    }
  }, [props.cities])

  useEffect(() => {
    if (props.currentRoute._id) {
      let newRoute = props.currentRoute;
      let newBetweenStops = newRoute.stops.splice(1, newRoute.stops.length - 2);
      setBetweenStops(newBetweenStops);
      setRoute(newRoute);
      setChooseCity(props.currentRoute.city.city)
      setLoading(props.loading);
    } else {
      setLoading(false)
    }
  },[props.currentRoute])

  const handleChangeStop = (stop, index, type) => {
    if (type === 'start_finish') {
      let newStops = [...route.stops];
      newStops[index] = stop;
      setRoute({...route, stops: newStops});
    } else {
      let newStops = [...betweenStops];
      newStops[index] = stop;
      setBetweenStops(newStops)
    }
  }

  const handleChange = (e) => {
    setRoute({...route, [e.target.name]: e.target.value});
  }

  const handleImage = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.addEventListener('load',() => {
        setRoute({...route, logo: reader.result})
      })
    }
  }

  const addStop = (e) => {
    e.preventDefault();
    let newStops = [...betweenStops, {name_of_stop: '',latitude: '', longitude: ''}]
    setBetweenStops(newStops);
  }

  const deleteStop = (index, type) => {
    if(type === "start_finish") {
      let newStops = [...route.stops];
      newStops.splice(index,1);
      setRoute({...route,stops: newStops});
    } else {
      let newStops = [...betweenStops];
      newStops.splice(index,1);
      setBetweenStops(newStops);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    let newStops = route.stops;
    newStops.splice(1,0, ...betweenStops);
    setBetweenStops([]);
    setRoute({...route, stops: newStops, city: chooseCity});
    let { logo, name, stops, number } = route;
    let cityId = chooseCity ? cities.filter(item => item.city === chooseCity)[0]._id :  cities[0]._id;
    if (props.match.params.id !== 'new') {
      props.dispatch(updateRoute(route._id, { city: cityId, logo, number, name, stops},props.history))
    } else {
      props.dispatch(addRouteAction(route, props.history))
    }
  };

  return (
    <div style={{flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="container">
      <GoBackButton />
      <h4>New/Edit Route</h4>
        <hr/>
        { loading ? <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader />
        </div> :
        <form className="route-add-edit__form" onSubmit={handleSubmit}>
          <label>
            <span>City</span>
            <select
              className="choose__city--select"
              value={chooseCity}
              onChange={(e) => setChooseCity(e.target.value)}
            >
              {cities.length > 0 && cities.map(item => (
                <option key={item._id}>{item.city}</option>
              ))}
            </select>
          </label>
          <hr/>
          <label>
            <span>Route Number</span>
            <input type="text" name="number" value={`${route.number}`} onChange={handleChange} required/>
          </label>
          <hr/>
          <label>
            <span>Route Name</span>
            <input type="text" name="name" value={route.name} onChange={handleChange} required/>
          </label>
          <hr style={{marginBottom: '10px'}}/>
          <label className="route-add-edit__image">
            <span>
              Logo / Widget
            </span>
            <input type="file" name="logo" onChange={handleImage} />
          </label>

          {route.logo && 
            <div style={{marginTop: '15px', position: 'relative'}}>
              <img src={route.logo} alt="route logo" style={{width: '30%'}}/>
              <button onClick={() => setRoute({...route, logo: ''})}  className="add-vehicle--button">X</button>
            </div>}

          <table className="admin__table" style={{marginTop: '15px'}}>
            <thead>
              <tr>
                <th colSpan="3">Name of stop</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <AdminRouteAddEditItem stop={route.stops[0]} feature="Place of First Stop" index={0}
                  handleChangeStop={handleChangeStop} type="start_finish" deleteStop={deleteStop}
                />
              </tr>

              {betweenStops.length > 0 && betweenStops.map((stop,i) => (
                <tr key={i}>
                  <AdminRouteAddEditItem stop={stop} index={i} handleChangeStop={handleChangeStop}
                    deleteStop={deleteStop}
                  />
                </tr>
              ))}

              <tr>
                <td colSpan="5">
                  <button className="add_stop" onClick={addStop}>Add Stop</button>
                </td>
              </tr>

              <tr>
                <AdminRouteAddEditItem stop={route.stops[route.stops.length - 1]}  
                  handleChangeStop={handleChangeStop} type="start_finish" deleteStop={deleteStop}
                  feature="Place of Last Stop" index={route.stops.length - 1}/>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="route-add-edit__submit">Save</button>
        </form>
      } 
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentRoute: state.admin.currentRoute,
  loading: state.admin.loading,
  cities: state.cities.cities
})

export default connect(mapStateToProps)(AdminRouteAddEdit)
