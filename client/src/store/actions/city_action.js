import axios from 'axios';
import {REACT_APP_API_URL} from '../../helpers/misc';
import { toast } from 'react-toastify';

export const getCitiesAction = () => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/cities`);
    dispatch({
      type: 'GET_CITIES',
      payload: res.data
    })
  } catch (e) {
    console.log(e);
    dispatch({type: 'GET_CITIES_ERROR'});
  }
}

export const addCityAction = (city) => async dispatch => {
  try {
    const res = await axios.post(`${REACT_APP_API_URL}/city`, city);
    dispatch({
      type: 'ADD_CITY',
      payload: res.data
    });
    toast.success('City was added.')
  } catch (e) {
    console.log(e);
    dispatch({type: 'ADD_CITY_ERROR'});
    toast.error('Something went wrong to add City to DB')
  }
}

export const updateCityAction = (id,city) => async dispatch => {
  try {
    const res = await axios.put(`${REACT_APP_API_URL}/city/${id}`, city);
    dispatch({
      type: 'UPDATE_CITY',
      payload: res.data
    });
    toast.success('City was updated.')
  } catch (e) {
    console.log(e);
    dispatch({type: 'UPDATE_CITY_ERROR'});
    toast.error('Something went wrong to update City in DB')
  }
}

export const deleteCityAction = id => async dispatch => {
  try {
    const res = await axios.delete(`${REACT_APP_API_URL}/city/${id}`);
    dispatch({
      type: 'DELETE_CITY',
      payload: res.data
    });
    toast.success('City was deleted.')
  } catch (e) {
    console.log(e);
    dispatch({type: 'DELETE_CITY_ERROR'});
    toast.error('Something went wrong to delete City in DB')
  }
}