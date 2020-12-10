import axios from 'axios';
import {REACT_APP_API_URL} from '../../helpers/misc';
import { toast } from 'react-toastify';


export const getFaqs = () => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/faqs`);
    dispatch({
      type: 'GET_FAQS',
      payload: res.data
    })
  } catch (error) {
    console.log();
    dispatch({type: 'GET_FAQS_ERROR'});
  }
}

export const getCurrentFaq = (id) => async dispatch => {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/faq/${id}`);
    dispatch({
      type: 'GET_CURRENT_FAQ',
      payload: res.data
    })
  } catch (error) {
    console.log(error);
    dispatch({type: 'GET_CURRENT_FAQ_ERROR'});
    toast.error('Error to get current faq from DB');
  }
}

export const addFaq = (faq) => async dispatch => {
  try {
    const res = await axios.post(`${REACT_APP_API_URL}/faq`, faq);
    dispatch({
      type: "ADD_FAQ",
      payload: res.data
    });
    toast.success('FAQ was added');
  } catch (error) {
    console.log(error);
    dispatch({type: 'ADD_FAQ_ERROR'});
    toast.error('Error to add FAQ to data base. Try again later');
  }
}

export const updateFaq = (id, faq) => async dispatch => {
  const body = {title: faq.title, text: faq.text};
  try {
    const res = await axios.put(`${REACT_APP_API_URL}/faq/${id}`, body);
    dispatch({
      type: 'UPDATE_FAQ',
      payload: res.data
    })
    toast.success('FAQ was updated.')
  } catch (error) {
    console.log(error);
    dispatch({type: 'UPDATE_FAQ_ERROR'});
    toast.error('FAQ updated error. Try again later.')
  }
}

export const deleteFaqAction = (id) => async dispatch => {
  try {
    const res = await axios.delete(`${REACT_APP_API_URL}/faq/${id}`);
    dispatch({
      type: 'DELETE_FAQ',
      payload: res.data
    })
    toast.success('FAQ was deleted')
  } catch (error) {
    console.log(error);
    dispatch({type: 'DELETE_FAQ_ERROR'});
    toast.error('FAQ deleted error. Try again later.')
  }
}