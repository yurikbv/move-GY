import axios from 'axios';
import { toast } from 'react-toastify';
import {REACT_APP_API_URL} from '../../helpers/misc';

export const getRoutes = () => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/admin/routes/${localStorage.cityId}`);
    dispatch({
      type: 'GET_TRACKER_ROUTES',
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({type: 'GET_TRACKER_ROUTES_ERROR'});
  }
}

export const getRoutesByNumberAction = (id) => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/routes/${id}`);
    dispatch({
      type: 'GET_ROUTES_BY_NUMBER',
      payload: res.data
    })
    return res.data;
  } catch (error) {
    console.log(error);
    dispatch({type: 'GET_ROUTES_BY_NUMBER_ERROR'})
    toast.error('Error. Can\'t find current route in DB')
  }
}

export const addAlertAction = (routeId, alert) => async dispatch => {
  try {
    const res = await axios.put(`${REACT_APP_API_URL}/routes/addAlert`, {routeId, alert});
    dispatch({
      type: "ADD_ALERT",
      payload: res.data
    });
    toast.success('Alert was added');
  } catch (e) {
    console.log(e);
    dispatch({type: 'ADD_ALERT_ERROR'});
    toast.error('Error alert added.')
  }
}

export const setStateAlertAction = (alertId, date) => async dispatch => {
  try {
    const res = await axios.put(`${REACT_APP_API_URL}/routes/setStateAlert`, {alertId, date});
    dispatch({
      type: 'SET_STATE_ALERT',
      payload: res.data
    });
    toast.success('Alert date was updated');
  } catch (error) {
    console.log(error);
    dispatch({type: 'SET_STATE_ALERT_ERROR'})
    toast.error('Error alert changes');
  }
}

export const deleteAlertAction = (alertId) => async dispatch => {
  try {
    const res = await axios.delete(`${REACT_APP_API_URL}/routes/deleteAlert/${alertId}`);
    dispatch({
      type: 'DELETE_ALERT',
      payload: res.data
    })
    toast.success('Alert was deleted')
  } catch (e) {
    console.log(e);
    toast.error('Error alert deletes');
  }
}