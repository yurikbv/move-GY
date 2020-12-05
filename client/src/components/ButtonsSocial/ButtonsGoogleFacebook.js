import React from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { authenticate, isAuth } from '../../helpers/auth';
import { sendGoogleToken, sendFacebookToken } from '../../store/actions/auth';
import './ButtonsGoogleFacebook.css';


function ButtonsGoogleFacebook(props) {

  //If success we need to authenticate user and redirect
  const informParent = response => {
    authenticate(response, () => {
      if (isAuth() && isAuth().role === "Admin") {
        props.history.push('/admin/users');
      } else {
        props.history.push('/profile');
      }
    });
  }

  //Get response from google
  const responseGoogle = response => {
    props.dispatch(sendGoogleToken(response.tokenId, props.role)).then(res => {
      toast.success(`Google ${props.action} success`);
      informParent(res);
    }).catch(error => {
      toast.error(`Google ${props.action} error. Try again.`);
    });
  }

  //Get response from facebook
  const responseFacebook = response => {
    props.dispatch(sendFacebookToken(response.userID, response.accessToken, props.role)).then(res => {
      toast.success(`Facebook ${props.action} success`);
      informParent(res);
    }).catch(error => {
      toast.error(`Facebook ${props.action} error. Try again.`);
    });
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      
      <GoogleLogin 
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      >{`${props.action} with Google`}
      </GoogleLogin>

      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_CLIENT}
        autoLoad={false}
        callback={responseFacebook}
        textButton={`${props.action} with Facebook`}
        cssClass="facebook__button"
        icon="fa-facebook"
      />
    </div>
  )
}

export default connect()(withRouter(ButtonsGoogleFacebook));
