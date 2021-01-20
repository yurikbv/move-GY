const initialState = {
  routes: [],
  currentRoute: {},
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
        currentRoute: payload.route,
        loading: false
      }
    case 'ADD_ALERT':
    case 'SET_STATE_ALERT':
    case 'DELETE_ALERT':
      return {
        ...state,
        currentRoute: payload.route,
        loading: false
      }
    case 'CLEAR_CURRENT_ROUTE':
      return {
        ...state,
        currentRoute: {},
        loading: true
      }
    default: return {...state};
  }
}

export default routeReducer;