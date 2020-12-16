import React from 'react';

const AlertModal = ({route, toggleModal, toggleAddModal}) => {
  
  const handleAddAlert = (e) => {
    e.preventDefault();
    toggleModal();
    toggleAddModal();
  }
  
  return (
    <div className="alert__modal--container">
      <div className="alert__modal">
        <h4>{route.number} {route.name}</h4>
        <i>Alert impacting you travel</i>
        <div>
          <button type="button" className="add_alert_button" onClick={handleAddAlert}>Add alert</button>
          <span> (see something, Say something)</span>
        </div>
        {route.alerts.length > 0 && <hr/>}
        {route.alerts.length > 0 && route.alerts.map(alert => (
          <div key={alert._id}>
            <span>{alert.date} - {alert.event_alert}</span>
            <div>
              <button type="button" >Still active</button>
              <button type="button" >Cleared</button>
            </div>
          </div>
        ))}
        <button className="alert__close" onClick={toggleModal}>X</button>
      </div>
    </div>
  );
};

export default AlertModal;
