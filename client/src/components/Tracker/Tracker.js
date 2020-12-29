import React, { useState, useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MoonLoader from "react-spinners/MoonLoader";

import {isAuth} from '../../helpers/auth';
import {getRoutes} from '../../store/actions/route_acton';
import './Tracker.css';
import Share from "../NavBar/Share";

const Tracker = (props) => {

  let n;

  const [routes, setRoutes] = useState([]);
  const [ loading, setLoading] = useState(true);

  useEffect(() => {
    props.dispatch(getRoutes());
  },[]);

  useEffect(() => {
    if(props.routes) {
      let sortRoutes = props.routes.sort((a, b) => a.number < b.number ? - 1 : Number(a.number > b.number));
      setRoutes(sortRoutes);
      setLoading(props.loading);
    } else {setLoading(false)}
  },[props.routes]);

  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
       <div className="container" >
        <h3>Bus Tracker</h3>
         <Share top={10}/>
        <div className="landing__buttons">
          {isAuth() && isAuth()._id ? null : <Link to="/register_driver" style={{backgroundColor: 'lightGrey'}}>Drivers Login/Register Now</Link>}
        </div>
        <p>
          Click route name to see bus location in s in real time. Learn about routes, fares, etc,
             <Link to="#"> here</Link>
        </p>
        {loading ? <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader /></div> : 
        <div className="tracker__routes--links">
          {routes.map(route => {
            let link;
            if  (n !== route.number) {
            link = (
              <span key={route._id}>
                <hr/>
                <Link to={`/route_detail/${route.number}/${route._id}`} >#{route.number} {route.name}</Link>
              </span>)
            n = route.number;
            } else link = (
              <span key={route._id}><Link to={`/route_detail/${route.number}/${route._id}`}>#{route.number} {route.name}</Link></span>)
            return link;
            })
          }
        </div>}
       </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  routes: state.routes.routes,
  loading: state.routes.loading
})


export default connect(mapStateToProps)(Tracker)
