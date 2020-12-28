const initialState = {
  routes: [],
  routesByNumber: [],
  loading: true
}

const routeReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_TRACKER_ROUTES':
      return {
        ...state,
        routes: payload.routes,
        loading: false
      }
    case 'GET_ROUTES_BY_NUMBER':
      return {
        ...state,
        routesByNumber: payload.routesByNumber,
        loading: false
      }
    case 'ADD_ALERT':
    case 'SET_STATE_ALERT':
    case 'DELETE_ALERT':
      const newRoutes = state.routesByNumber.map(route => route._id === payload.route._id ? payload.route : route);
      return {
        ...state,
        routesByNumber: newRoutes,
        loading: false
      }
    default: return {...state};
  }
}

export default routeReducer;