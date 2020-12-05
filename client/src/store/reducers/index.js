import { combineReducers } from 'redux';
import auth from './auth_reducer';
import user from './user_reducer';
import vehicles from './vehicle_reducer';
import admin from './admin_reducer';

const rootReducer = combineReducers({
  auth,
  user,
  vehicles,
  admin
});

export default rootReducer;