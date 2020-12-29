import React, { useState, useEffect, useCallback, Fragment} from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import { v4 as uuidv4 } from 'uuid';
import {Link} from "react-router-dom";
import {useInterval} from 'react-use-timeout';
import {ReactComponent as BusStopSvg} from '../../assets/img/bus-stop.svg';
import {getRoutesByNumberAction, addAlertAction, setStateAlertAction, deleteAlertAction} from '../../store/actions/route_acton';
import {getVehiclesByNumberAction} from '../../store/actions/vehicle';
import {ReactComponent as ManSvg} from '../../assets/img/man.svg';
import {ReactComponent as Bus} from '../../assets/img/bus.svg';
import GoBackButton from '../UI/GoBackButton';
import AlertModal from "./AlertModal";
import './TrackRouteDetail.css';
import AlertAdd from "./AlertAdd";
import {getDistanceAndSpeedFromLatLonInKm, isAuth} from "../../helpers/auth";
import {toast} from "react-toastify";
import {setUserLocation} from "../../store/actions/user";
import BusStop from "./BusStop";
import Share from "../NavBar/Share";

const TrackRouteDetail = (props) => {

  const [currentRoute, setCurrentRoute] = useState({});
  const [reverseRoute, setReverseRoute] = useState({});
  const [currentStops, setCurrentStops] = useState([]);
  const [currentStopsWithBuses, setCurrentStopsWithBuses] = useState([]);
  const [reverseStops, setReverseStops] = useState([]);
  const [reverseStopsWithBuses, setReverseStopsWithBuses] = useState([]);
  const [currentVehicles, setCurrentVehicles] = useState([]);
  const [reverseVehicles, setReverseVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertModal, setAlertModal] = useState(false);
  const [alertAddModal, setAlertAddModal] = useState(false);
  const [ routeForAlerts, setRouteForAlerts ] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [nearestCurrentStop, setNearestCurrentStop] = useState();
  const [nearestReverseStop, setNearestReverseStop] = useState();
  const [showBusStop, setShowBusStop] = useState(false);
  const [currentStop, setCurrentStop] = useState();
  const [direction, setDirection] = useState();
  const [idx, setIdx] = useState();

  useEffect(() => {
    props.dispatch(getRoutesByNumberAction(props.match.params.route)).then(() => {
      startWatchBuses();
    });
    return (() => {
      props.dispatch({type: 'CLEAR_VEHICLES_BY_NUMBER'});
    })
  },[props.match.params.route]);

  useEffect(() => {
    if(props.routesByNumber.length > 0) {
      let route = props.routesByNumber.filter(route => route._id === props.match.params.routeId)[0];
      let revRoute = props.routesByNumber.filter(route => route._id !== props.match.params.routeId)[0];
      setCurrentRoute(route);
      setReverseRoute(revRoute);
      setLoading(props.loading);
    }
  },[props.routesByNumber]);
  
  useEffect(() => {
    if(currentRoute) {
      setCurrentStops(doStopsWithBetween(currentRoute));
      setCurrentStopsWithBuses(doStopsWithBetween(currentRoute));
      reverseRoute && setReverseStops(doStopsWithBetween(reverseRoute));
      reverseRoute && setReverseStopsWithBuses(doStopsWithBetween(reverseRoute));
    }
  },[currentRoute, reverseRoute]);
  
  useEffect(() => {
    if(currentRoute) {
      let vehicles = props.vehiclesByNumber.filter(vehicle => vehicle.has_route === currentRoute.name);
      let revVehicles = props.vehiclesByNumber.filter(vehicle => vehicle.has_route !== currentRoute.name);
      setCurrentVehicles(vehicles);
      setReverseVehicles(revVehicles)
    }
  },[props.vehiclesByNumber])
  
  useEffect(() => {
    if(currentStops) {
      if (currentVehicles.length) showBusesOnMap(currentVehicles, currentStops, 'cur');
      if (reverseVehicles.length) showBusesOnMap(reverseVehicles, reverseStops, 'rev');
    }
  },[currentVehicles, reverseVehicles])
  
  useEffect(() => {
    if (props.user && props.user.isActive) {
      setLatitude(props.user.latitude);
      setLongitude(props.user.longitude);
    }
  },[])
  
  useEffect(() => {
    interval.start();
    return () => interval.stop();
  },[])
  
  const startWatchBuses = useCallback(() => {
    props.dispatch(getVehiclesByNumberAction(props.match.params.route));
  });
  
  const interval = useInterval(startWatchBuses, 5000);
  
  const showBusesOnMap = (vehicles, stops, dest) => {
    let cloneDistance;
    let cloneStops = stops;
    vehicles.length > 0  && vehicles.forEach(vehicle => {
      let distanceArray = [];
      stops.forEach( (stop,i) => {
        distanceArray= [...distanceArray, {
          idx: i,
          name_of_stop: stop.name_of_stop,
          distance: stop.name_of_stop !== 'between'
            ? getDistanceAndSpeedFromLatLonInKm(vehicle.latitude, vehicle.longitude, stop.latitude, stop.longitude)
            : getDistanceAndSpeedFromLatLonInKm(currentStops[i-1].latitude,currentStops[i-1].longitude,currentStops[i+1].latitude,currentStops[i+1].longitude)
        }]
      })
      
      let nearestStop = [...distanceArray].filter(st => st.name_of_stop !== 'between')
        .sort((a, b) => a.distance < b.distance ? - 1 : Number(a.distance > b.distance))[0];
      
      if (nearestStop.distance < 0.010) {
        cloneStops = cloneStops.map((stop,i) => {
          if (i === nearestStop.idx) {
            let vehicles = stop.vehicles;
            let vehicleObj =  {text: "at stop", distance: 0 ,average_speed: vehicle.average_speed};
            vehicles = vehicles.length > 0 ? [...vehicles, vehicleObj ] : [vehicleObj];
            return {...stop, vehicles: vehicles}
          } else return stop;
        })
      }
      else if (nearestStop.idx === 0) {
        cloneStops = cloneStops.map((stop,i) => {
          if (i === 1) {
            let vehicles = stop.vehicles;
            let vehicleObj = {text: ``,
              distance: ((distanceArray[i + 1].distance) - nearestStop.distance).toFixed(2),
              average_speed: vehicle.average_speed};
            vehicles = vehicles.length > 0 ? [...vehicles, vehicleObj] : [vehicleObj];
            return {...stop, vehicles: vehicles}
          } else return stop;
        })
      } else if (nearestStop.distance >= 0.010 && nearestStop.distance < 0.032 && distanceArray[nearestStop.idx -2].distance < distanceArray[nearestStop.idx -1].distance) {
        cloneStops = cloneStops.map((stop,i) => {
          if (i === nearestStop.idx) {
            let vehicles = stop.vehicles;
            let vehicleObj = {text: `approaching`, distance: 0, average_speed: vehicle.average_speed};
            vehicles = vehicles.length > 0 ? [...vehicles, vehicleObj ] : [vehicleObj]
            return {...stop, vehicles: vehicles}
          } else return stop;
        });
      } else if (nearestStop.distance >= 0.010 && nearestStop.distance < 0.032 && distanceArray[nearestStop.idx -2].distance > distanceArray[nearestStop.idx -1].distance) {
        cloneStops = cloneStops.map((stop,i) => {
          if (i === nearestStop.idx) {
            let vehicles = stop.vehicles;
            let vehicleObj = {text: `just left`, distance: 0, average_speed: vehicle.average_speed}
            vehicles = vehicles.length > 0 ? [...vehicles, vehicleObj ] : [vehicleObj];
            return {...stop, vehicles: vehicles}
          } else return stop;
        });
      } else if (nearestStop.distance >= 0.032 && distanceArray[nearestStop.idx -2].distance < distanceArray[nearestStop.idx -1].distance) {
        cloneStops = cloneStops.map((stop,i) => {
          if (i === nearestStop.idx - 1) {
            let vehicles = stop.vehicles;
            let vehicleObj = {text: ``,
              distance: (nearestStop.distance).toFixed(2),
              average_speed: vehicle.average_speed}
            vehicles = vehicles.length > 0 ? [...vehicles, vehicleObj ] : [vehicleObj];
            return {...stop, vehicles: vehicles}
          } else return stop;
        });
      } else {
        cloneStops = cloneStops.map((stop,i) => {
          if (i === nearestStop.idx + 1) {
            let vehicles = stop.vehicles;
            let vehicleObj = {text: ``,
              distance: (distanceArray[nearestStop.idx + 1].distance - distanceArray[nearestStop.idx].distance).toFixed(2),
              average_speed: vehicle.average_speed};
            vehicles = vehicles.length > 0 ? [...vehicles, vehicleObj ] : [vehicleObj];
            return {...stop, vehicles: vehicles}
          } else return stop;
        });
      }
      cloneDistance = distanceArray;
    })
    cloneStops = cloneStops.map((stop,i) => stop.name_of_stop === "between" ? {...stop, distance: cloneDistance[i].distance} : stop);
    if (dest === 'cur') {
      setCurrentStopsWithBuses(cloneStops);
    }
    if (dest === 'rev') {
      setReverseStopsWithBuses(cloneStops);
    }
  };
  
  const doStopsWithBetween = route => {
    let stops = [];
    route.stops && route.stops.forEach((stop,i) => {
      stops.push({...stop, vehicles: []});
      if (i !== route.stops.length -1) stops.push({name_of_stop: 'between', vehicles: []})
    })
    return stops;
  }
  
  const toggleModal = (route) => {
    route && setRouteForAlerts(route);
    setAlertModal(!alertModal);
  }
  
  const toggleAddModal = () => {
    setAlertAddModal(!alertAddModal);
  }
  
  const addAlert = (id, alert) => {
    props.dispatch(addAlertAction(id, alert));
  }
  
  const setStateAlert = (id, state) => {
    props.dispatch(setStateAlertAction(id,state));
  }
  
  const deleteAlert = id => props.dispatch(deleteAlertAction(id));
  
  const handleLocation =  (route) => {
    if(!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        props.dispatch(setUserLocation(position.coords)).then(() => showUserOnMap(route));
      }, () => toast.error('Unable to retrieve your location'));
    }
  }
  
  const showUserOnMap = (route) => {
    let distanceArray = [];
    route.stops.forEach((stop,i) => {
      distanceArray= [...distanceArray, {
        idx: i,
        name_of_stop: stop.name_of_stop,
        distance: (getDistanceAndSpeedFromLatLonInKm(latitude, longitude, stop.latitude, stop.longitude))
          .toFixed(2)
      }]
    })
    let nearestStop = distanceArray
      .sort((a, b) => a.distance < b.distance ? - 1 : Number(a.distance > b.distance))[0];
    route === currentRoute ? setNearestCurrentStop(nearestStop) : setNearestReverseStop(nearestStop);
  }
  
  const toggleBusStop = () => setShowBusStop(!showBusStop);
  
  const handleStop = (stop, dir, i) => {
    setDirection(dir);
    setCurrentStop(stop);
    setIdx(i);
    toggleBusStop();
  }
  
  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      {alertModal && <AlertModal
        route={routeForAlerts}
        toggleModal={toggleModal}
        toggleAddModal={toggleAddModal}
        setStateAlert={setStateAlert}
        deleteAlert={deleteAlert}
      />}
      
      {showBusStop &&
      <BusStop route={direction === 'straight' ? currentRoute : reverseRoute} toggleBusStop={toggleBusStop} idx={idx}
               stops={direction === 'straight' ? currentStopsWithBuses : reverseStopsWithBuses}
               stop={currentStop}/>}
               
      {alertAddModal && <AlertAdd route={routeForAlerts} toggleAddModal={toggleAddModal} addAlert={addAlert}/>}
      
      <div className="container">
        
        <GoBackButton />
        <Share />
        {(loading || !currentRoute)
          
          ? <div className="loading"><MoonLoader /></div>
          
          : <Fragment>
            <hr/>
            {currentRoute && <h3 style={{textAlign: 'center'}}>
              #{currentRoute.number} {currentRoute.name}
            </h3>}
            <div style={{textAlign: 'center',margin: '-15px 0 20px'}}>
              <button className="view-alert_button" onClick={() => toggleModal(currentRoute)}>
                View {currentRoute.alerts.length} alert(s){isAuth() && ` / Add alert`}
              </button>
            </div>
            <hr/>
            {isAuth() &&
            <div>
              <button className="set__location" style={{margin: '15px 0'}} onClick={() => handleLocation(currentRoute)}>
                Get Your location
              </button>
              {nearestCurrentStop &&
                <span style={{display: 'block', fontWeight: '700'}}>
                  Nearest Bus stop is {nearestCurrentStop.name_of_stop}. Distance is {nearestCurrentStop.distance} km
                </span>}
              <hr/>
            </div>
            }
            <div>
              {currentStopsWithBuses && currentStopsWithBuses.map((stop,i) => (
                <div key={i}>
                  {stop.name_of_stop !== 'between'
                  ? <div className="stop__block">
                      <BusStopSvg className="stop__block--svg"/>
                      <button className="stop__block--button" onClick={() => handleStop(stop, 'straight',i)}>
                        {stop.name_of_stop}
                      </button>
                      {nearestCurrentStop && stop.name_of_stop === nearestCurrentStop.name_of_stop &&
                        <span style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
                          <ManSvg style={{height: '24px', width: '20px'}}/> You ({nearestCurrentStop.distance}km)
                        </span>
                      }
                      {stop.vehicles.length > 0 && stop.vehicles.map((stop_vehicle) => (
                        <span style={{display: 'flex', alignItems: 'center', margin: '0 10px'}} key={uuidv4()}>
                          <Bus style={{height: '24px', width: '20px', marginRight: '5px'}}/> {stop_vehicle.text}
                        </span>
                      ))
                      }
                      {stop.vehicles.length > 0 && `(X${stop.vehicles.length})` }
                    </div>
                  : <div className="between_stops">
                      <span className="between_stops--inner">
                        {stop.vehicles.length > 0 && stop.vehicles.map((stop_vehicle) => (
                        <span style={{display: 'flex', alignItems: 'center', margin: '0 10px 0'}} key={uuidv4()}>
                          <Bus style={{height: '24px', width: '20px', marginRight: '5px'}}/> {stop_vehicle.text}
                        </span>
                        ))
                      }
                      </span>
                      {stop.vehicles.length > 0 && `(X${stop.vehicles.length})` }
                    </div>
                  }
                </div>
              ))}
              <Link to={`/route_explained/${currentRoute._id}`}  className="explained__link">Route explained</Link>
            </div>
            <hr/>

            {reverseRoute &&
            <Fragment><h3 style={{textAlign: 'center'}}>
              #{reverseRoute.number} {reverseRoute.name}
            </h3>
              <div style={{textAlign: 'center', margin: '-15px 0 20px'}}>
                <button className="view-alert_button" onClick={() => toggleModal(reverseRoute)}>
                  View {reverseRoute.alerts.length} alert(s){isAuth() && ` / Add alert`}
                </button>
              </div>
              <hr/>
              {isAuth() &&
              <div>
                <button className="set__location" style={{margin: '15px 0'}} onClick={() => handleLocation(reverseRoute)}>
                  Get Your location
                </button>
                {nearestReverseStop &&
                  <span style={{display: 'block', fontWeight: '700'}}>
                    Nearest Bus stop is {nearestReverseStop.name_of_stop}. Distance is {nearestReverseStop.distance} km.
                  </span>}
                <hr/>
              </div>
              }
            </Fragment>
            }
            
            <div>
              {reverseStopsWithBuses && reverseStopsWithBuses.map((stop,i) => (
                <div key={i}>
                  {stop.name_of_stop !== 'between'
                    ? <div className="stop__block">
                      <BusStopSvg className="stop__block--svg"/>
                      <button className="stop__block--button" onClick={() => handleStop(stop, 'reverse', i)}>
                        {stop.name_of_stop}
                      </button>
                      {nearestReverseStop && stop.name_of_stop === nearestReverseStop.name_of_stop &&
                      <span style={{display: 'flex', alignItems: 'center'}}>
                          <ManSvg style={{height: '24px', width: '20px'}}/> You ({nearestReverseStop.distance}km)
                      </span>
                      }
                      {stop.vehicles.length > 0 && stop.vehicles.map((stop_vehicle) => (
                        <span style={{display: 'flex', alignItems: 'center', margin: '0 10px'}} key={uuidv4()}>
                          <Bus style={{height: '24px', width: '20px', marginRight: '5px'}}/> {stop_vehicle.text}
                        </span>
                      ))
                      }
                      {stop.vehicles.length > 0 && `(X${stop.vehicles.length})` }
                    </div>
                    : <div className="between_stops">
                      <span className="between_stops--inner">
                      {stop.vehicles.length > 0 && stop.vehicles.map((stop_vehicle) => (
                        <span style={{display: 'flex', alignItems: 'center', margin: '0 10px 0'}} key={uuidv4()}>
                          <Bus style={{height: '24px', width: '20px', marginRight: '5px'}}/> {stop_vehicle.text}
                        </span>
                      ))
                      }
                      </span>
                      {stop.vehicles.length > 0 && `(X${stop.vehicles.length})` }
                    </div>
                  }
                </div>
              ))}
              {reverseRoute && <Link to={`/route_explained/${reverseRoute._id}`}  className="explained__link">Route explained</Link>}
            </div>
          </Fragment>
        }
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  routesByNumber: state.routes.routesByNumber,
  vehiclesByNumber: state.vehicles.vehiclesByNumber,
  user: state.user.user,
  loading: state.routes.loading
})


export default connect(mapStateToProps)(TrackRouteDetail)
