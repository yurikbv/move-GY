import React from 'react';
import { NavLink } from 'react-router-dom';


export default function NavBar() {

  const style={
    textDecoration: 'underline',
    textShadow: '3px 3px 10px rgb(15,15,15)'
  }

  return (
    <div style={{marginBottom: '15px'}}>
      <NavLink to="/admin/cities" className="account_link" activeStyle={style}>Cities</NavLink> |
      <NavLink to="/admin/users" className="account_link" activeStyle={style}>Users</NavLink> |
      <NavLink to="/admin/vehicles" className="account_link" activeStyle={style}>Vehicles</NavLink> |
      <NavLink to="/admin/routes" className="account_link" activeStyle={style}>Routes</NavLink> | 
      <NavLink to="/admin/advertisement" className="account_link" activeStyle={style}>Advertisement</NavLink> |
      <NavLink to="/admin/faq" className="account_link" activeStyle={style}>FAQ</NavLink>
      <hr/>
    </div>
  )
}
