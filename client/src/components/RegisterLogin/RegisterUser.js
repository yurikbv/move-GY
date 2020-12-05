import React from 'react';
import { Link } from 'react-router-dom';
import ButtonsGoogleFacebook from '../ButtonsSocial/ButtonsGoogleFacebook';

export const RegisterUser = (props) => {

  return (
    <div style={{flexGrow: '1', display: 'flex', alignItems: 'center'}}>
      <div className="container" style={{textAlign: 'center'}}>
        <h4>Sign Up / Sign In User</h4>
        <ButtonsGoogleFacebook role="User" action="Sign Up" />
        <Link to="/register_driver" style={{textDecoration: 'none', display: 'block', marginTop: '15px'}}>
            Register as a Driver
          </Link>
      </div>
    </div>
  )
}

export default RegisterUser;
