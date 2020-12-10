import React from 'react';
import ButtonsGoogleFacebook from '../ButtonsSocial/ButtonsGoogleFacebook';

export const RegisterDriver = (props) => {

  return (
    <div style={{flexGrow: '1', display: 'flex', alignItems: 'center'}}>
      
      <div className="container" style={{textAlign: 'center'}}>
        <h4>Sign Up / Sign In Driver</h4>
        <h3>Bus Tracker</h3>
        <ButtonsGoogleFacebook role="Driver" action="Sign Up" />
      </div>
    </div>
  )
}

export default RegisterDriver;
