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
    toast.error('Something went wrong to get Cities data')
  }
}