import React, { useState, useEffect }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MoonLoader from "react-spinners/MoonLoader";
import {getRoutesAction, deleteRouteAction, activatingRouteByAdmin} from '../../../store/actions/admin'
import NavBar from '../NavBar/NavBar';
import './AdminRoutes.css';
import AdminRoutesItem from './AdminRoutesItem';

const AdminRoutes = (props) => {

  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    props.dispatch(getRoutesAction())
  },[])

  useEffect(() => {
    if (props.routes) {
      setRoutes(props.routes);
      setLoading(props.loading);
    }
  }, [props.routes]);

  const deleteRoute = id => {
    props.dispatch(deleteRouteAction(id))
  }
  
  const activatingRoute = route => {
    props.dispatch(activatingRouteByAdmin(route._id, {activation: !route.activation}))
  }

  return (
    <div style={{flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="container">
        <h3>ADMIN</h3>
        <NavBar />
        <Link to="/admin/route_add_edit/new" className="add_route--link">Add Route</Link>
        <hr style={{marginTop: '15px'}}/>
        {loading ?
        <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader />
        </div> :
        <table className="admin__table" style={{marginTop: '20px'}}>
          <thead>
            <tr>
              <th>City</th>
              <th colSpan="2">Route Name</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route._id} >
              <AdminRoutesItem route={route} deleteRoute={deleteRoute} activatingRoute={activatingRoute}/>
            </tr>
          ))}
        </tbody>
        </table>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  routes: state.admin.routes
})

export default connect(mapStateToProps)(AdminRoutes)
