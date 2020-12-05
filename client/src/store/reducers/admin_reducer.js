const initialState = {
  users: [],
  vehicles: [],
  routes: [],
  advertisment: [],
  faq: [],
  loading: false,
  error: ''
}

const adminReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'ADMIN_GET_USERS': 
     return {
       ...state,
       users: payload,
       error: '',
       loading: false
     };
    case 'ADMIN_GET_VEHICLES':
      return {
        ...state,
        vehicles: payload,
        error: '',
        loading: false
      }
    case 'UPDATE_USER_BY_ADMIN':
    case 'UPDATE_VEHICLE_BY_ADMIN':
      return {
        ...state,
        error: '',
        loading: false
      }
    case 'ADMIN_GET_USERS_ERROR':
      return {
        ...state,
        users: [],
        loading: false
      }
      case 'ADMIN_GET_VEHICLES_ERROR':
        return {
          ...state,
          vehicles: [],
          loading: false
        }
      case 'UPDATE_VEHICLE_BY_ADMIN_ERROR':
      case 'UPDATE_USER_BY_ADMIN_ERROR':
        return {...state};
    default: return state;
  }
}

export default adminReducer;

