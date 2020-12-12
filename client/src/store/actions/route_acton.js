import axios from 'axios';
import { toast } from 'react-toastify';
import {REACT_APP_API_URL} from '../../helpers/misc';

export const getRoutes = () => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/admin/routes`);
    dispatch({
      type: 'GET_TRACKER_ROUTES',
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({type: 'GET_TRACKER_ROUTES_ERROR'});
  }
}

export const getRoutesByNumberAction = (number) => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/routes/${number}`);
    dispatch({
      type: 'GET_ROUTES_BY_NUMBER',
      payload: res.data
    })
  } catch (error) {
    console.log(error);
    dispatch({type: 'GET_ROUTES_BY_NUMBER_ERROR'})
    toast.error('Error. Can\'t find current route in DB')
  }
}