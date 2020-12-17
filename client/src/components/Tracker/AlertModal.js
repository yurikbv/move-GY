import React, {useEffect, useState, Fragment} from 'react';
import moment from 'moment';
import {isAuth} from "../../helpers/auth";
import MoonLoader from "react-spinners/MoonLoader";

const AlertModal = ({route, toggleModal, toggleAddModal,setStateAlert,deleteAlert}) => {
  
  let [currentRoute, setCurrentRoute] = useState({});
  
  const handleAddAlert = (e) => {
    e.preventDefault();
    toggleModal();
    toggleAddModal();
  }
  
  useEffect(() => {
    setCurrentRoute(route)
  },[]);
  
  const changeAlert = (id, state) => {
    const newAlerts = currentRoute.alerts.map(alert => alert._id === id ? {...alert, is_active_alert: state} : alert)
    setCurrentRoute({...currentRoute, alerts: newAlerts});
    setStateAlert(id, state);
  }
  
  const handleDelete = id => {
    const newAlerts = currentRoute.alerts.filter(alert => alert._id !== id);
    setCurrentRoute({...currentRoute, alerts: newAlerts});
    deleteAlert(id)
  }
  
  return (
    <div className="alert__modal--container">
      <div className="alert__modal">
        {!currentRoute ? <MoonLoader /> :
          <Fragment><h4>{route.number} {route.name}</h4>
            <i>Alert impacting you travel</i>
            <div>
              <button type="button" className="add_alert_button" onClick={handleAddAlert}>Add alert</button>
              <span> (see something, Say something)</span>
            </div>
            {route.alerts.length > 0 && <hr/>}
            {currentRoute.alerts && route.alerts.length > 0 && currentRoute.alerts.map((alert, i) => (
              <div key={alert._id}>
                <div className="alert__info">
                  <span>{moment(alert.date).format("YYYY/MM/DD h:mm a")} - {alert.event_alert}</span>
                  {isAuth()._id &&
                  <div>
                    <button type="button" style={{
                      backgroundColor: alert.is_active_alert ? 'green' : '', color: alert.is_active_alert ? 'white' : ''
                    }} onClick={() => changeAlert(alert._id, true)}>Still active
                    </button>
                    <button type="button" style={{
                      backgroundColor: !alert.is_active_alert ? 'green' : '',
                      color: !alert.is_active_alert ? 'white' : ''
                    }} onClick={() => changeAlert(alert._id, false)}>Cleared
                    </button>
                    {isAuth().role === "Admin" && <button type="button" onClick={() => handleDelete(alert._id)}>Delete</button>}
                  </div>}
                </div>
                {i !== route.alerts.length - 1 && <hr/>}
              </div>
            ))}
            <button className="alert__close" onClick={toggleModal}>X</button>
          </Fragment>
        }
      </div>
    </div>
  );
};

export default AlertModal;
