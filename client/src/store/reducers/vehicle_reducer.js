const initialState = {
  vehicles: [],
  error: '',
  loading: false
};

const vehicleReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'ADD_VEHICLE_SUCCESS':
      return {
        ...state,
        error: '',
        vehicles: [...state.vehicles, payload.vehicle],
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
    case 'ACTIVE_VEHICLE':
    case 'VEHICLE_SERVICE':
      let newVehicles = state.vehicles.map(vehicle => vehicle._id === payload.vehicle._id ? payload.vehicle : vehicle);
      return {
        ...state,
        error: '',
        vehicles: newVehicles,
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

