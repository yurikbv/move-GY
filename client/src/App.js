import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Landing from './components/Landing/Landing';
import BottomNavBar from './components/NavBar/BottomNavBar';
import TopNavBar from './components/NavBar/TopNavBar';
import RegisterUser from './components/RegisterLogin/RegisterUser';
import RegisterDriver from './components/RegisterLogin/RegisterDriver';
import PrivateRoute from './routes/PrivateRoute';
import Profile from './components/Profile/Profile';
import DriverRoute from './routes/DriverRoute';
import AdminRoute from './routes/AdminRoute';
import Vehicles from './components/Vehicles/Vehicles';
import AddVehicle from './components/Vehicles/AddVehicle';
import { isAuth } from './helpers/auth';
import Users from './components/Admin/Users/Users';
import AdminVehicles from './components/Admin/Vehicles/Vehicles';
import {activeUser} from './store/actions/user';
import AdminRoutes from './components/Admin/Routes/AdminRoutes';
import AdminRouteAddEdit from './components/Admin/Routes/AdminRouteAddEdit';

function App(props) {

  useEffect(() => {
    setupBeforeUnloadListener();
  })

  useEffect(() => {
    if(localStorage.user && JSON.parse(localStorage.user).isActive === false) {
      console.log(true);
      props.dispatch(activeUser());
    }
  },[])

  const doSomethingBeforeUnload = () => {
    let newUser = JSON.parse(localStorage.user);
    newUser.isActive = false;
    localStorage.user = JSON.stringify(newUser);
    navigator.sendBeacon(`${process.env.REACT_APP_API_URL}/vehicles/dis_active`,
    JSON.stringify({id: isAuth()._id}) ,{
        keepalive: true
      });
  }

// Setup the 'beforeunload' event listener
  const setupBeforeUnloadListener = () => {
      window.addEventListener("unload", (ev) => {
          ev.preventDefault();
          return doSomethingBeforeUnload();
      });
  };
  
  return (
    <Router>
      <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <TopNavBar/>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register_user" component={RegisterUser} />
          <Route exact path="/register_driver" component={RegisterDriver} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <DriverRoute exact path="/vehicles" component={Vehicles}/>
          <DriverRoute exact path="/add_vehicle" component={AddVehicle}/>
          <AdminRoute exact path="/admin/users" component={Users} />
          <AdminRoute exact path="/admin/vehicles" component={AdminVehicles} />
          <AdminRoute exact path="/admin/routes" component={AdminRoutes} />
          <AdminRoute exact path="/admin/route_add_edit/:id" component={AdminRouteAddEdit} />
        </Switch>
        <BottomNavBar/>
      </div>
    </Router>
  );
}

export default connect()(App);