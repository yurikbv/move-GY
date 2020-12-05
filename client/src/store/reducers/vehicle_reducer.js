const initialState = {
  vehicles: [],
  error: '',
  loading: true
};

const vehicleReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'ADD_VEHICLE_SUCCESS':
      return {
        ...state,
        error: '',
        loading: false
      };
    case 'GET_VEHICLES_FOR_DRIVER':
      return {
        ...state,
        vehicles: payload.vehicles,
        error: '',
        loading: false
      };
    case 'SET_VEHICLE_POSITION':
    case 'CLEAR_VEHICLE_POSITION':
      return {
        ...state,
        error: '',
        loading: false
      }
    case 'ADD_VEHICLE_ERROR':
    case 'GET_VEHICLES_FOR_DRIVER_ERROR':
    case 'SET_VEHICLE_POSITION_ERROR':
      return {
        ...state,
        error:  "Something went wrong",
        loading: false
      }
    default: return state;
  }
}

export default vehicleReducer;

