import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import GoBackButton from '../UI/GoBackButton';

const BusStop = (props) => {
  
  const [stop, setStop] = useState();
  const [route, setRoute] = useState();
  
  useEffect(() => {
    if(props.routesByNumber) {
      let currentRoute = props.routesByNumber.filter(route => route._id === props.match.params.routeId)[0];
      setRoute(currentRoute);
      let currentStop = currentRoute.stops.filter(stop => stop.name_of_stop === props.match.params.name_stop)[0];
      setStop(currentStop)
    }
  },[])
  
  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="container" >
        <GoBackButton />
        {route && <h3>{route.number} {route.name}</h3>}
        <h4 style={{fontSize: '20px', color: 'lightcoral'}}>{stop && stop.name_of_stop}</h4>
        No bus detected at this time.
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  routesByNumber: state.routes.routesByNumber,
  loading: state.routes.loading
})

export default connect(mapStateToProps)(BusStop);
