import React, { useState, useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import {ReactComponent as BusSvg} from '../../assets/img/bus-stop.svg';

import {getRoutesByNumberAction, addAlertAction, setStateAlertAction, deleteAlertAction} from '../../store/actions/route_acton';
import GoBackButton from '../UI/GoBackButton';

import './TrackRouteDetail.css';
import {Link} from "react-router-dom";
import AlertModal from "./AlertModal";
import AlertAdd from "./AlertAdd";

const TrackRouteDetail = (props) => {

  const [currentRoute, setCurrentRoute] = useState({});
  const [reverseRoute, setReverseRoute] = useState({});
  const [loading, setLoading] = useState(true);
  const [alertModal, setAlertModal] = useState(false);
  const [alertAddModal, setAlertAddModal] = useState(false);
  const [ routeForAlerts, setRouteForAlerts ] = useState();

  useEffect(() => {
    props.dispatch(getRoutesByNumberAction(props.match.params.route));
  },[]);

  useEffect(() => {
    if(props.routesByNumber) {
      let route = props.routesByNumber.filter(route => route._id === props.match.params.routeId)[0];
      let revRoute = props.routesByNumber.filter(route => route._id !== props.match.params.routeId)[0];
      setCurrentRoute(route);
      setReverseRoute(revRoute);
      setLoading(props.loading)
    }
  },[props.routesByNumber])
  
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
      <div className="container" >
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
            
            <div>
              {currentRoute && currentRoute.stops.map((stop,i) => (
                <div key={i}>
                  <div className="stop__block">
                    <BusSvg className="stop__block--svg"/>
                    <button className="stop__block--button">{stop.name_of_stop}</button>
                  </div>
                  { i !== (currentRoute.stops.length - 1) && <div className="between_stops"> </div>}
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
            </Fragment>
            }
            <hr/>
            <div>
              {reverseRoute && reverseRoute.stops.map((stop,i) => (
                <div key={i}>
                  <div className="stop__block">
                    <BusSvg className="stop__block--svg"/>
                    <button className="stop__block--button">{stop.name_of_stop}</button>
                  </div>
                  { i !== (reverseRoute.stops.length - 1) && <div className="between_stops"> </div>}
                </div>
              ))}
              {reverseRoute && <Link to={`/route_explained/${reverseRoute._id}`}  className="explained__link">Route explained</Link>}
            </div>
          </Fragment>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  routesByNumber: state.routes.routesByNumber,
  loading: state.routes.loading
})


export default connect(mapStateToProps)(TrackRouteDetail)
