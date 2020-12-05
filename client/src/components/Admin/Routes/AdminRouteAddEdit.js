import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './AdminRouteAddEdit.css';
import AdminRouteAddEditItem from './AdminRouteAddEditItem';

const AdminRouteAddEdit = (props) => {

  const [route, setRoute] = useState({city: '', name: '', logo: '', stops: [{
    name_of_stop: '',
    latitude: '', 
    longitude: ''
  }, {name_of_stop: '',
    latitude: '', 
    longitude: ''
  }]});
  const [betweenStops, setBetweenStops] = useState([])

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(props.match.params.id);
  })

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
      setRoute({...route, logo: URL.createObjectURL(img)});
    }
  };

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

  return (
    <div style={{flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="container">
      <h4>New/Edit Route</h4>
        <hr/>

        <form className="route-add-edit__form">
          <label>
            <span>City</span>
            <input type="text" name="city" value={route.city} onChange={handleChange}/>
          </label>
          <hr/>
          <label>
            <span>Route Name</span>
            <input type="text" name="name" value={route.name} onChange={handleChange} />
          </label>
          <hr style={{marginBottom: '10px'}}/>
          <label className="route-add-edit__image">
            <span>Logo / Widget</span>
            <input type="file" name="logo" onChange={handleImage} />
          </label>

          {route.logo && 
            <div style={{marginTop: '15px'}}>
              <img src={route.logo} alt="route logo" style={{maxHeight: '300px'}}/>
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
                <button className="add_stop" onClick={addStop}>Add Stop</button>
              </tr>

              <tr>
                <AdminRouteAddEditItem stop={route.stops[route.stops.length - 1]}  
                  handleChangeStop={handleChangeStop} type="start_finish" deleteStop={deleteStop}
                  feature="Place of Last Stop" index={route.stops.length - 1}/>
              </tr>
            </tbody>
          </table>
        </form>

      </div>
    </div>
  )
}


export default connect()(AdminRouteAddEdit)
