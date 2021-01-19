import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import {addRouteAction, getCurrentRouteAction, updateRoute} from '../../../store/actions/admin';

import './AdminRouteAddEdit.css';
import AdminRouteAddEditItem from './AdminRouteAddEditItem';
import GoBackButton from '../../UI/GoBackButton';
import {getCitiesAction} from "../../../store/actions/city_action";
import {toast} from "react-toastify";

const AdminRouteAddEdit = (props) => {
  
  const [route, setRoute] = useState({ name: '', logo: '', number: '', stops: [{
    name_of_stop: '',
    latitude: '', 
    longitude: ''
  }, {name_of_stop: '',
    latitude: '', 
    longitude: ''
  }]});
  const [reverseRoute, setReverseRoute] = useState({ name: '', logo: '', number: '', stops: [{
      name_of_stop: '',
      latitude: '',
      longitude: ''
    }, {name_of_stop: '',
      latitude: '',
      longitude: ''
    }]});
  const [betweenStops, setBetweenStops] = useState([]);
  const [betweenReverseStops, setBetweenReverseStops] = useState([]);
  const [cities, setCities] = useState([]);
  const [chooseCity, setChooseCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [isNew, setIsNew] = useState();

  useEffect(() => {
    if (props.match.params.id !== 'new') {
      props.dispatch(getCurrentRouteAction(props.match.params.id));
      setIsNew(false);
    } else setIsNew(true)
  },[])
  
  useEffect(() => {
    props.dispatch(getCitiesAction());
  },[]);
  
  useEffect(() => {
    if (props.cities) {
      setCities(props.cities);
    }
  }, [props.cities])
  
  useEffect(() => {
    if (cities.length) {
      setChooseCity(cities[0].city)
    }
  },[cities])

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
  
  const handleChangeStopReverse = (stop, index, type) => {
    if (type === 'start_finish') {
      let newStops = [...reverseRoute.stops];
      newStops[index] = stop;
      setReverseRoute({...reverseRoute, stops: newStops});
    } else {
      let newStops = [...betweenReverseStops];
      newStops[index] = stop;
      setBetweenReverseStops(newStops)
    }
  }

  const handleChange = (e) => {
    setRoute({...route, [e.target.name]: e.target.value});
  }
  
  const handleChangeReverse = (e) => {
    setReverseRoute({...reverseRoute, [e.target.name]: e.target.value});
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
    if (isNew) {
      let newReverseStops = [...betweenReverseStops, {name_of_stop: '',latitude: '', longitude: ''}];
      setBetweenReverseStops(newReverseStops);
    }
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
  
  const deleteStopReverse = (index, type) => {
    if(type === "start_finish") {
      let newStops = [...reverseRoute.stops];
      newStops.splice(index,1);
      setReverseRoute({...reverseRoute,stops: newStops});
    } else {
      let newStops = [...betweenReverseStops];
      newStops.splice(index,1);
      setBetweenReverseStops(newStops);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!chooseCity) return toast.error('Please choose city');
    
    let newStops = route.stops;
    let newStopsReverse = reverseRoute.stops;
    
    newStops.splice(1,0, ...betweenStops);
    newStopsReverse.splice(1,0, ...betweenReverseStops);
    
    setBetweenStops([]);
    setBetweenReverseStops([]);
    
    setRoute({...route, stops: newStops, city: chooseCity});
    setReverseRoute({...reverseRoute, name: `${route.name} Rev` ,stops: newStopsReverse, city: chooseCity, number: route.number});
    
    let cityId = chooseCity ? cities.filter(item => item.city === chooseCity)[0]._id :  cities[0]._id;
    
    let newRoute = {...route, stops: newStops, city: cityId};
    let newRouteReverse = {...reverseRoute, name: `${route.name} Rev`, stops: newStopsReverse.reverse(), city: cityId, number: route.number};
    
    let { logo, name, stops, number } = route;
    
    if (props.match.params.id !== 'new') {
      props.dispatch(updateRoute(route._id, { city: cityId, logo, number, name, stops},props.history))
    } else {
      props.dispatch(addRouteAction(newRoute)).then(() => {
        props.dispatch(addRouteAction(newRouteReverse)).then(() => {
          toast.success('Routes was added');
          props.history.push('/admin/routes');
        })
      })
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
              
              {isNew &&
              <tr>
                <AdminRouteAddEditItem stop={reverseRoute.stops[0]} feature="Place of Last Stop Reverse Route" index={0}
                   handleChangeStop={handleChangeStopReverse} type="start_finish" deleteStop={deleteStopReverse}
                   color={'lightgreen'}
                />
              </tr>}

              {betweenStops.length > 0 && betweenStops.map((stop,i) => (
                <Fragment>
                  <tr key={i}>
                    <AdminRouteAddEditItem stop={stop} index={i} handleChangeStop={handleChangeStop}
                                           deleteStop={deleteStop}
                    />
                  </tr>
                  {isNew && betweenReverseStops[i] &&
                  <tr key={i+100000}>
                    <AdminRouteAddEditItem stop={betweenReverseStops[i]} index={i}
                                           handleChangeStop={handleChangeStopReverse}
                                           deleteStop={deleteStopReverse}
                                           color="lightgreen"
                    />
                  </tr>}
                </Fragment>
              ))}

              <tr>
                <td colSpan="5">
                  <button className="add_stop" onClick={addStop}>Add Stop</button>
                </td>
              </tr>

              {/*{isNew && betweenReverseStops.length > 0 && betweenReverseStops.map((stop,i) => (*/}
              {/*  <tr key={i}>*/}
              {/*    <AdminRouteAddEditItem stop={stop} index={i} handleChangeStop={handleChangeStopReverse}*/}
              {/*                           deleteStop={deleteStopReverse}*/}
              {/*    />*/}
              {/*  </tr>*/}
              {/*))}*/}

              <tr>
                <AdminRouteAddEditItem stop={route.stops[route.stops.length - 1]}  
                  handleChangeStop={handleChangeStop} type="start_finish" deleteStop={deleteStop}
                  feature="Place of Last Stop" index={route.stops.length - 1}/>
              </tr>
            
              {isNew &&  <tr>
                <AdminRouteAddEditItem stop={reverseRoute.stops[reverseRoute.stops.length - 1]}
                 handleChangeStop={handleChangeStopReverse} type="start_finish"
                 deleteStop={deleteStopReverse}
                 feature="Place of First Stop Reverse Route" index={reverseRoute.stops.length - 1}
                 color="lightgreen"
                />
              </tr>}
              
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
