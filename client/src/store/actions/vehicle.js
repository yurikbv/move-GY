import axios from 'axios';
import { isAuth } from '../../helpers/auth';
import {REACT_APP_API_URL} from '../../helpers/misc';

export const addVehicle = (vehicle) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`${REACT_APP_API_URL}/vehicle/${isAuth()._id}`, vehicle, config);
    dispatch({
      type: 'ADD_VEHICLE_SUCCESS',
      payload: res.data
    })
    return res;
  } catch (error) {
    dispatch({
      type: 'ADD_VEHICLE_ERROR',
      payload: error
    });
    return error;
  }
}

export const getVehiclesForDriver = () => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/vehicles/${isAuth()._id}`);
    dispatch({
      type: 'GET_VEHICLES_FOR_DRIVER',
      payload: res.data
    })
    return res.data;
  } catch (error) {
    console.error(error);
    dispatch({
      type: 'GET_VEHICLES_FOR_DRIVER_ERROR',
    });
  }
}

export const watchVehiclePosition = (id, position) => async dispatch => {
  const body = {id: id, latitude: position.latitude, longitude: position.longitude};
  try {
    await axios.put(`${REACT_APP_API_URL}/vehicle/location`, body);
    dispatch({
      type: 'SET_VEHICLE_POSITION'
    })
  } catch (error) {
    dispatch({
      type: 'SET_VEHICLE_POSITION_ERROR'
    })
  }
}

export const clearVehiclePosition = (id) => async dispatch => {
  try {
    await axios.put(`${REACT_APP_API_URL}/vehicle/clear_location`, {id});
    dispatch({
      type: 'CLEAR_VEHICLE_POSITION'
    })
  } catch (error) {
    console.log(error);
  }
}
