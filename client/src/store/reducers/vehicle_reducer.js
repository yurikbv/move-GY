const initialState = {
  vehicles: [],
  vehiclesByRoute: [],
  error: '',
  loading: true
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
    case 'ACTIVE_VEHICLE':
      return {
        ...state,
        vehicles: payload.vehicles,
        error: '',
        loading: false
      };
    case 'GET_VEHICLES_BY_NUMBER':
      return {
        ...state,
        vehiclesByRoute: payload.vehicles,
        loading: false
      }
    case 'CLEAR_VEHICLES_BY_NUMBER':
      return {
        ...state,
        vehiclesByRoute: []
      }
    case 'SET_VEHICLE_POSITION':
    case 'CLEAR_VEHICLE_POSITION':
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
    default: return {...state,loading: false};
  }
}

export default vehicleReducer;

