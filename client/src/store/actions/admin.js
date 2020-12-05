import axios from 'axios';
import {REACT_APP_API_URL} from '../../helpers/misc';

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/admin/users`);
    dispatch({
      type: 'ADMIN_GET_USERS',
      payload: res.data
    });
    return res.data;
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'ADMIN_GET_USERS_ERROR'
    })
    return error.error;
  }
};

export const updateUserByAdmin = (user,id) => async dispatch => {
  try {
    const res = await axios.put(`${REACT_APP_API_URL}/admin/users/${id}`, user);
    dispatch({
      type: 'UPDATE_USER_BY_ADMIN',
      payload: res.data
    })
    return res.data;
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'UPDATE_USER_BY_ADMIN_ERROR'
    })
  }
}

export const deleteUserByAdmin = (id) => async dispatch => {
  try {
    const res = await axios.delete(`${REACT_APP_API_URL}/admin/users/${id}`);
    dispatch({
      type: 'DELETE_USER_BY_ADMIN'
    })
    return res.data;
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'DELETE_USER_BY_ADMIN_ERROR'
    });
    return error.error
  }
}

export const getVehicles = () => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/admin/vehicles`);
    dispatch({
      type: 'ADMIN_GET_VEHICLES',
      payload: res.data
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'ADMIN_GET_VEHICLES_ERROR'
    })
  }
}

export const updateVerhicleByAdmin = (vehicle, id) => async dispatch => {
  try {
    const res = await axios.put(`${REACT_APP_API_URL}/admin/vehicles/${id}`, vehicle);
    dispatch({
      type: 'UPDATE_VEHICLE_BY_ADMIN',
      payload: res.data
    });
    return res.data;
  } catch (error) {
      console.log(error);
      dispatch({
        type: 'UPDATE_VEHICLE_BY_ADMIN_ERROR',
        payload: error.error
      })
      return error;
  }
}

export const deleteVehicleByAdmin = (id) => async dispatch => {
  try {
    const res = await axios.delete(`${REACT_APP_API_URL}/admin/vehicles/${id}`);
    dispatch({
      type: 'DELETE_VEHICLE_BY_ADMIN'
    })
    return res.data;
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'DELETE_VEHILE_BY_ADMIN_ERROR'
    });
    return error.error
  }
}