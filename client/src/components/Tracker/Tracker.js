import React, { useState, useEffect} from 'react';
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
      let newRoutes = [];
      let n;
      sortRoutes.forEach(item => {
        if (n !== item.number) {
          newRoutes.push(item);
          n  = item.number
        }
      })
      setRoutes(newRoutes);
      setLoading(props.loading);
    } else {setLoading(false)}
  },[props.routes]);
  
  console.log(props)
  
  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
       <div className="container" >
        <h3>THE TRACKER</h3>
         <Share top={10}/>
        <div className="landing__buttons">
          {isAuth() && isAuth()._id ? null : <Link to="/register_driver" style={{backgroundColor: 'lightGrey'}}>Drivers Login/Register Now</Link>}
        </div>
        {loading ? <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader /></div> : 
        <div className="tracker__routes--links">
          {routes.map(route => {
            let link;
            if  (n !== route.number) {
            link = (
              <span key={route._id}>
                <hr/>
                <Link to={`/route_detail/${route._id}`} >#{route.number} {route.name}</Link>
              </span>)
            n = route.number;
            } else link = (
              <span key={route._id}><Link to={`/route_detail/${route._id}`}>#{route.number} {route.name}</Link></span>)
            return link;
            })
          }
        </div>}
        <h3 style={{color: 'red'}}>TESTING, TESTING … MORE COMING SOON!</h3>
        <p style={{textAlign: 'center', fontSize: '20px'}}>We are currently testing services on some transportation routes. <br/>More routes will be added soon. </p>
        <p style={{textAlign: 'center', fontSize: '20px'}}>Comments and feedback encouraged. Let us know what you think!
          <br/><span style={{color: 'blue'}}> MoveXYZinfo@gmail.com</span>
        </p>
       </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  routes: state.routes.routes,
  loading: state.routes.loading
})


export default connect(mapStateToProps)(Tracker)
