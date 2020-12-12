import React, { useState, useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import {ReactComponent as BusSvg} from '../../assets/img/bus-stop.svg';

import {getRoutesByNumberAction} from '../../store/actions/route_acton';
import GoBackButton from '../UI/GoBackButton';

const TrackRouteDetail = (props) => {

  const [currentRoute, setCurrentRoute] = useState({});
  const [reverseRoute, setReverseRoute] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.dispatch(getRoutesByNumberAction(props.match.params.route))
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

  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="container" >
        <GoBackButton />
        {loading ? <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader /></div> : 
          <Fragment>
            <hr/>
            {currentRoute && <h4 style={{textAlign: 'center'}}>
              #{currentRoute.number} {currentRoute.name}
            </h4>}
            <hr/>
            {currentRoute && currentRoute.stops.map((stop,i) => (
              <div key={i} style={{display: 'flex', alignItems: 'center', margin: '8px 0'}}>
                <BusSvg style={{width: '20px', height: '20px'}}/>
                <button>{stop.name_of_stop}</button>
              </div> 
            ))}
            <hr/>

            {reverseRoute && <h4 style={{textAlign: 'center'}}>
              #{reverseRoute.number} {reverseRoute.name}
            </h4>}
            <hr/>
            {reverseRoute && reverseRoute.stops.map((stop,i) => (
              <div key={i} style={{display: 'flex', alignItems: 'center', margin: '8px 0'}}>
                <BusSvg style={{width: '20px', height: '20px'}}/>
                <button>{stop.name_of_stop}</button>
              </div> 
            ))}
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
