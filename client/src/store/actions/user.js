import axios from 'axios';
import { toast } from 'react-toastify';
import { isAuth, } from '../../helpers/auth';
import {REACT_APP_API_URL} from '../../helpers/misc';
import {updateUser} from '../../helpers/auth';


export const updateProfile = profile => async dispatch => {
  try {
    const res = await axios.put(`${REACT_APP_API_URL}/user/${isAuth()._id}`, profile);
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data
    });
    updateUser(res, () => {
      toast.success('Profile was updated.')
    });
    
  } catch (error) {
    dispatch({type: 'UPDATE_PROFILE_ERROR'});
    toast.error('Error Profile updated')
  }
}

export const  loadUser = () => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/user/${isAuth()._id}`);
    dispatch({
      type: 'LOAD_USER',
      payload: res.data
    })
    return res;
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'LOAD_USER_ERROR'
    })
    return false;
  }
}

export const setUserLocation = (position) => async dispatch => {
  const body = { latitude: position.latitude, longitude: position.longitude}
  try {
    const res = await axios.put(`${REACT_APP_API_URL}/user/location/${isAuth()._id}`, body);
    dispatch({
      type: 'SET_USER_LOCATION',
      payload: res.data
    });
    toast.success('Your position for the bus stop was setting successfully');
  } catch (error) {
    dispatch({
      type: 'SET_USER_LOCATION_ERROR'
    });
    toast.error('Error set your position in DB');
  }
}

export const logoutUser = () => async dispatch => {
  let id = isAuth()._id;
  localStorage.clear();
  try {
    await axios.put(`${REACT_APP_API_URL}/user/logout/${id}`);
    dispatch({type: 'LOGOUT_USER'});
  } catch (error) {
    console.log(error);
    dispatch({type: 'LOGOUT_USER_ERROR'})
  }
}

export const activeUser = () => async dispatch => {
  try {
    await axios.put(`${REACT_APP_API_URL}/user/active/${isAuth()._id}`);
    dispatch({type: 'ACTIVE_USER'});
  } catch (error) {
    dispatch({type: 'ACTIVE_USER_ERROR'});
  }
}