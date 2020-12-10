const initialState = {
  advertisments: [],
  error: '',
  loading: false
}

const advertsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_ADVERTS':
      return {
        ...state,
        advertisments: payload
      };
    case 'UPDATE_ADVERTS':
    case 'ADD_ADVERTS':
      return {
        ...state,
        advertisments: [payload.adverts]
      }
    case 'GET_ADVERTS_ERROR':
    case 'ADD_ADVERTS_ERROR':
    case 'UPDATE_ADVERTS_ERROR':
      return {
        ...state
      };
    default: return state;
  }
}

export default advertsReducer;