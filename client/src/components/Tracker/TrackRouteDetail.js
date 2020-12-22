import React, { useState, useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import {ReactComponent as BusSvg} from '../../assets/img/bus-stop.svg';
import {Link} from "react-router-dom";
import {getRoutesByNumberAction, addAlertAction, setStateAlertAction, deleteAlertAction} from '../../store/actions/route_acton';
import {ReactComponent as ManSvg} from '../../assets/img/man.svg';
import GoBackButton from '../UI/GoBackButton';
import AlertModal from "./AlertModal";
import './TrackRouteDetail.css';
import AlertAdd from "./AlertAdd";
import {getDistanceAndSpeedFromLatLonInKm, isAuth} from "../../helpers/auth";
import {toast} from "react-toastify";
import {setUserLocation} from "../../store/actions/user";

const TrackRouteDetail = (props) => {

  const [currentRoute, setCurrentRoute] = useState({});
  const [reverseRoute, setReverseRoute] = useState({});
  const [currentStops, setCurrentStops] = useState([]);
  const [reverseStops, setReverseStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertModal, setAlertModal] = useState(false);
  const [alertAddModal, setAlertAddModal] = useState(false);
  const [ routeForAlerts, setRouteForAlerts ] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [nearestCurrentStop, setNearestCurrentStop] = useState();
  const [nearestReverseStop, setNearestReverseStop] = useState();

  useEffect(() => {
    props.dispatch(getRoutesByNumberAction(props.match.params.route));
  },[]);

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
      reverseRoute && setReverseStops(doStopsWithBetween(reverseRoute));
    }
  },[currentRoute, reverseRoute]);
  
  useEffect(() => {
    if(props.routesByNumber.length > 0 && props.routesByNumber[0].vehicles.length) {
      showBusesOnMap();
    }
  },[props.routesByNumber])
  
  useEffect(() => {
    if (props.user && props.user.isActive) {
      setLatitude(props.user.latitude);
      setLongitude(props.user.longitude);
    }
  },[props.user])
  
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
          .toFixed(1)
      }]
    })
    let nearestStop = distanceArray
      .sort((a, b) => a.distance < b.distance ? - 1 : Number(a.distance > b.distance))[0];
    route === currentRoute ? setNearestCurrentStop(nearestStop) : setNearestReverseStop(nearestStop);
  }
  
  const showBusesOnMap = route => {
    props.routesByNumber[0].vehicles.forEach(vehicle => {
      let distanceArray = [];
      currentStops.forEach( (stop,i) => {
        distanceArray= [...distanceArray, {
          idx: i,
          name_of_stop: stop.name_of_stop,
          distance: stop.latitude
            ? (getDistanceAndSpeedFromLatLonInKm(vehicle.latitude, vehicle.longitude, stop.latitude, stop.longitude)).toFixed(2)
            : (getDistanceAndSpeedFromLatLonInKm(currentStops[i-1].latitude,currentStops[i-1].longitude,currentStops[i+1].latitude,currentStops[i+1].longitude)).toFixed(2)
        }]
      })
      console.dir(distanceArray);
    })
  };
  
  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      {alertModal && <AlertModal
        route={routeForAlerts}
        toggleModal={toggleModal}
        toggleAddModal={toggleAddModal}
        setStateAlert={setStateAlert}
        deleteAlert={deleteAlert}
      />}
      {alertAddModal && <AlertAdd route={routeForAlerts} toggleAddModal={toggleAddModal} addAlert={addAlert}/>}
      <div className="container">
        <GoBackButton />
        {(loading || !currentRoute) ? <div className="loading"><MoonLoader /></div> :
          <Fragment>
            <hr/>
            {currentRoute && <h3 style={{textAlign: 'center'}}>
              #{currentRoute.number} {currentRoute.name}
            </h3>}
            <div style={{textAlign: 'center',margin: '-15px 0 20px'}}>
              <button className="view-alert_button" onClick={() => toggleModal(currentRoute)}>
                View {currentRoute.alerts.length} alert(s) / Add alert
              </button>
            </div>
            <hr/>
            {isAuth()._id &&
            <div>
              <button className="set__location" style={{margin: '15px 0'}} onClick={() => handleLocation(currentRoute)}>
                Get Your location
              </button>
              {latitude && longitude &&
                <Fragment>
                  <span style={{display: 'block', fontWeight: '700'}}>{`lat: ${latitude}`}</span>
                  <span style={{display: 'block', fontWeight: '700'}}>{`lng: ${longitude}`}</span>
                  {nearestCurrentStop &&
                    <span style={{display: 'block', fontWeight: '700'}}>
                      Nearest Bus stop is {nearestCurrentStop.name_of_stop}. Distance is {nearestCurrentStop.distance} km
                    </span>}
                </Fragment>
              }
              <hr/>
            </div>
            }
            <div>
              {currentStops && currentStops.map((stop,i) => (
                <div key={i}>
                  {stop.name_of_stop !== 'between'
                  ? <div className="stop__block">
                      <BusSvg className="stop__block--svg"/>
                      <Link to={`/bus_stop/${currentRoute._id}/${stop.name_of_stop}`} className="stop__block--button">
                        {stop.name_of_stop}
                      </Link>
                      {nearestCurrentStop && stop.name_of_stop === nearestCurrentStop.name_of_stop &&
                        <span style={{display: 'flex', alignItems: 'center'}}>
                          <ManSvg style={{height: '24px', width: '20px'}}/> You ({nearestCurrentStop.distance}km)
                        </span>
                      }
                    </div>
                  : <div className="between_stops"> </div>
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
                  View {reverseRoute.alerts.length} alert(s) / Add alert
                </button>
              </div>
              <hr/>
              {isAuth()._id &&
              <div>
                <button className="set__location" style={{margin: '15px 0'}} onClick={() => handleLocation(reverseRoute)}>
                  Get Your location
                </button>
                {latitude && longitude &&
                <Fragment>
                  <span style={{display: 'block', fontWeight: '700'}}>{`lat: ${latitude}`}</span>
                  <span style={{display: 'block', fontWeight: '700'}}>{`lng: ${longitude}`}</span>
                  {nearestReverseStop &&
                  <span style={{display: 'block', fontWeight: '700'}}>
                  Nearest Bus stop is {nearestReverseStop.name_of_stop}. Distance is {nearestReverseStop.distance} km.
                </span>}
                </Fragment>
                }
                <hr/>
              </div>
              }
            </Fragment>
            }
            
            <div>
              {reverseStops && reverseStops.map((stop,i) => (
                <div key={i}>
                  {stop.name_of_stop !== 'between'
                    ? <div className="stop__block">
                      <BusSvg className="stop__block--svg"/>
                      <Link to={`/bus_stop/${reverseRoute._id}/${stop.name_of_stop}`} className="stop__block--button">
                        {stop.name_of_stop}
                      </Link>
                      {nearestReverseStop && stop.name_of_stop === nearestReverseStop.name_of_stop &&
                      <span style={{display: 'flex', alignItems: 'center'}}>
                          <ManSvg style={{height: '24px', width: '20px'}}/> You ({nearestReverseStop.distance}km)
                      </span>
                      }
                    </div>
                    : <div className="between_stops"> </div>
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
  user: state.user.user,
  loading: state.routes.loading
})


export default connect(mapStateToProps)(TrackRouteDetail)
