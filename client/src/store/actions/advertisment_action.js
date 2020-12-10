import axios from 'axios';
import {REACT_APP_API_URL} from '../../helpers/misc';
import { toast } from 'react-toastify';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const getAdverts = () => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/commer`);
    dispatch({
      type: 'GET_ADVERTS',
      payload: res.data
    })
  } catch (error) {
    console.log(error);
    dispatch({type: 'GET_ADVERTS_ERROR'});
  }
}

export const addAdverts = (commer) => async dispatch => {
  console.log(commer);
  try {
    const res = await axios.post(`${REACT_APP_API_URL}/commer`, commer, config);
    dispatch({
      type: 'ADD_ADVERTS',
      payload: res.data
    })
    toast.success('Advertisments were added');
  } catch (error) {
    console.log(error);
    dispatch({type: 'ADD_ADVERTS_ERROR'})
    toast.error("Advertisments were not added to BD. Try again.")
  }
}

export const updateAdverts = (id, commer) => async dispatch => {
  try {
    const res = await axios.put(`${REACT_APP_API_URL}/commer/${id}`, commer);
    dispatch({
      type: 'UPDATE_ADVERTS',
      payload: res.data
    });
    console.log('response', res);
    toast.success('Advertisments were updated')
  } catch (error) {
    console.error(error);
    dispatch({type: 'UPDATE_ADVERTS_ERROR'})
    toast.error("Advertisments were not updated in BD.Try again");
  }
}