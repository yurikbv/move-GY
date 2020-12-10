import axios from 'axios';
import {REACT_APP_API_URL} from '../../helpers/misc';
import { toast } from 'react-toastify';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/admin/users`);
    dispatch({
      type: 'ADMIN_GET_USERS',
      payload: res.data
    });
  } catch (error) {
    console.log(error)
    dispatch({type: 'ADMIN_GET_USERS_ERROR'})
  }
};

export const updateUserByAdmin = (user,id) => async dispatch => {
  try {
    const res = await axios.put(`${REACT_APP_API_URL}/admin/users/${id}`, user, config);
    dispatch({
      type: 'UPDATE_USER_BY_ADMIN',
      payload: res.data
    })
    return res.data;
  } catch (error) {
    console.log(error);
    dispatch({type: 'UPDATE_USER_BY_ADMIN_ERROR'})
  }
}

export const deleteUserByAdmin = (id) => async dispatch => {
  try {
    const res = await axios.delete(`${REACT_APP_API_URL}/admin/users/${id}`);
    dispatch({
      type: 'DELETE_USER_BY_ADMIN',
      payload: res.data
    })
  } catch (error) {
    console.log(error);
    dispatch({type: 'DELETE_USER_BY_ADMIN_ERROR'});
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
    dispatch({type: 'ADMIN_GET_VEHICLES_ERROR'})
  }
}

export const updateVerhicleByAdmin = (vehicle, id) => async dispatch => {
  try {
    const res = await axios.put(`${REACT_APP_API_URL}/admin/vehicles/${id}`, vehicle, config);
    dispatch({
      type: 'UPDATE_VEHICLE_BY_ADMIN',
      payload: res.data
    });
  } catch (error) {
      console.log(error);
      dispatch({
        type: 'UPDATE_VEHICLE_BY_ADMIN_ERROR',
        payload: error.error
      })
  }
}

export const deleteVehicleByAdmin = (id) => async dispatch => {
  try {
    const res = await axios.delete(`${REACT_APP_API_URL}/admin/vehicles/${id}`);
    dispatch({
      type: 'DELETE_VEHICLE_BY_ADMIN',
      payload: res.data
    })
  } catch (error) {
    console.log(error);
    dispatch({type: 'DELETE_VEHILE_BY_ADMIN_ERROR'});
  }
}

export const addRouteAction = (route) => async dispatch => {
  try {
    const res = await axios.post(`${REACT_APP_API_URL}/admin/route`, route, config);
    dispatch({
      type: 'ADD_ROUTE',
      payload: res.data
    })
  } catch (error) {
    console.log(error);
    dispatch({type: 'ADD_ROUTE_ERROR'})
    return error;
  }
}

export const getRoutesAction = () => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/admin/routes`);
    dispatch({
      type: 'GET_ROUTES',
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({type: 'GET_ROUTES_ERROR'});
    return error;
  }
}

export const getCurrentRouteAction = (id) => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/admin/route/${id}`);
    dispatch({
      type: 'GET_CURRENT_ROUTE',
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({type: 'GET_CURRENT_ROUTE_ERROR'})
  }
}

export const updateRoute = (id, route) => async dispatch => {
  try {
    const res = await axios.put(`${REACT_APP_API_URL}/admin/route/${id}`, route, config);
    dispatch({
      type: 'UPDATE_ROUTE',
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({type: 'UPDATE_ROUTE_ERROR'})
  }
};

export const deleteRouteAction = (id) => async dispatch => {
  try {
    const res = await axios.delete(`${REACT_APP_API_URL}/admin/route/${id}`);
    dispatch({
      type: 'DELETE_ROUTE',
      payload: res.data
  });
    toast.success("Route was deleted");
  } catch (error) {
    console.log(error);
    dispatch({type: 'DELETE_ROUTE_ERROR'})
  }
}