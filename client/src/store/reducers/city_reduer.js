const initialState = {
  cities: [],
  loading: true,
  error: ''
}

const cityReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_CITIES':
      return {
        cities: payload.cities,
        loading: false
      }
    case 'ADD_CITY':
      return {
        cities: [...state.cities, payload.city],
        loading: false
      }
    case 'UPDATE_CITY':
      let newCities = state.cities.map(city => city._id === payload.city._id ? payload.city : city);
      return {
        cities: newCities,
        loading: false
      }
    case 'DELETE_CITY':
      return {
        cities: state.cities.filter(city => city._id !== payload.city._id),
        loading: false
      }
    case 'GET_CITIES_ERROR':
    case 'ADD_CITY_ERROR':
    case 'UPDATE_CITY_ERROR':
    case 'DELETE_CITY_ERROR':
      return state;
    default: return state;
  }
}

export default cityReducer;