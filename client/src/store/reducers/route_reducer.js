const initialState = {
  routes: [],
  routesByNumber: [],
  loading: false
}

const routeReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_TRACKER_ROUTES':
      return {
        ...state,
        routes: payload.routes
      }
    case 'GET_ROUTES_BY_NUMBER':
      return {
        ...state,
        routesByNumber: payload.routesByNumber,
        loading: false
      }
    default: return state;
  }
}

export default routeReducer;