const initialState = {
  users: [],
  vehicles: [],
  routes: [],
  currentRoute: {},
  loading: true,
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
    case 'UPDATE_USER_BY_ADMIN':
    case 'ACTIVATING_USER':
    let newUsers = state.users.map(user => user._id === payload.user._id ? payload.user : user);
    return {
      ...state,
      error: '',
      loading: false,
      users: newUsers
    }
    case 'DELETE_USER_BY_ADMIN':
      return {
        ...state,
        error: '',
        loading: false,
        users: state.users.filter(user => user._id !== payload.user._id)
      }
    case 'ADMIN_GET_VEHICLES':
      return {
        ...state,
        vehicles: payload,
        error: '',
        loading: false
      }
    case 'UPDATE_VEHICLE_BY_ADMIN':
    case 'ACTIVATING_VEHICLE':
      let newVehicles = state.vehicles.map(vehicle => vehicle._id === payload.vehicle._id ? payload.vehicle : vehicle);
      return {
        ...state,
        error: '',
        vehicles: newVehicles,
        loading: false
      };
    case 'DELETE_VEHICLE_BY_ADMIN':
      let newArrayVehicles = state.vehicles.filter(vehicle => vehicle._id !== payload.vehicle._id)
      return {
        ...state,
        error: '',
        loading: false,
        vehicles: newArrayVehicles
      }
    case 'GET_ROUTES':
      return {
        ...state,
        routes: payload.routes,
        currentRoute: {},
        error: '',
        loading: false
      }
    case 'ADD_ROUTE':
      return {
        ...state,
        error: '',
        loading: false,
        routes: [...state.routes, payload.route],
        currentRoute: {}
      }
    case 'UPDATE_ROUTE':
    case 'ACTIVATING_ROUTE':
      let newRoutes = state.routes.map(route => route._id === payload.route._id ? payload.route : route);
      return {
          ...state,
          error: '',
          loading: false,
          routes: newRoutes,
          currentRoute: {}
      }
    case 'DELETE_ROUTE':
      return {
        ...state,
        currentRoute: {},
        loading: false,
        routes: state.routes.filter(route => route._id !== payload.route._id)
      }
    case 'GET_CURRENT_ROUTE':
      return {
        ...state,
        currentRoute: payload.route,
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
      case 'GET_ROUTES_ERROR': 
        return {
          ...state,
          routes: [],
          loading: false
        };
      case 'UPDATE_VEHICLE_BY_ADMIN_ERROR':
      case 'UPDATE_USER_BY_ADMIN_ERROR':
      case 'ADD_ROUTE_ERROR':
      case 'DELETE_ROUTE_ERROR':
      case 'GET_CURRENT_ROUTE_ERROR':
      case 'UPDATE_ROUTE_ERROR':
      case 'ACTIVATING_USER_ERROR':
      case 'DELETE_VEHICLE_BY_ADMIN_ERROR':
      case 'ACTIVATING_VEHICLE_ERROR':
      case 'ACTIVATING_ROUTE_ERROR':
        return {...state, error: payload.error,loading: false};
    default: return {...state};
  }
}

export default adminReducer;

