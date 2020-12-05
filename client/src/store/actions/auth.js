import axios from 'axios';

export const sendGoogleToken = (idToken, role) => async dispatch => {
  try {
    const req = {idToken, role};
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/google_login`, req);
    dispatch({
      type: 'LOGIN_REGISTER_GOOGLE',
      payload: res.data
    });
    return res;
  } catch (error) {
    dispatch({
      type: 'GOOGLE_AUTH_ERROR'
    })
    return false;
  }
}

export const sendFacebookToken = (userId, accessToken, role) => async dispatch => {
  try {
    const req = {userId, accessToken, role}
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/facebook_login`, req);
    dispatch({
      type: 'LOGIN_REGISTER_FACEBOOK',
      payload: res.data
    });
    return res;
  } catch (error) {
    dispatch({
      type: 'FACEBOOK_AUTH_ERROR'
    });
    return false;
  }
}