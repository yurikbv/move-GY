import React from 'react';
import { NavLink } from 'react-router-dom';
import { isAuth } from '../../helpers/auth';
import './MyAccountNavBar.css';

export default function MyAccountNavBar() {

  const style={
    textDecoration: 'underline',
    textShadow: '3px 3px 10px rgb(15,15,15)'
  }

  return (
    <div style={{textAlign: 'left'}}>
      <NavLink to="/profile" className="account_link" activeStyle={style}>Profile</NavLink>
      {isAuth().role === 'User'&& 
        <> | 
          <NavLink to="/bus_tracker" className="account_link" activeStyle={style}>Bus Tracker</NavLink>
        </>
      }
      {isAuth().role === 'Driver'&& 
        <> | 
          <NavLink to="/vehicles" className="account_link" activeStyle={style}>Vehicles</NavLink> | 
          <NavLink to="/service/new/new" className="account_link" activeStyle={style}>Service</NavLink>
        </>
      }
      {isAuth().role === 'Admin'&& 
        <> | 
          <NavLink to="/admin/users" className="account_link" activeStyle={style}>Admin</NavLink> | 
        </>
      }
    </div>
  )
}
