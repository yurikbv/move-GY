const initialState = {
  advertisements: [],
  error: '',
  loading: true
}

const advertsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_ADVERTS':
      return {
        ...state,
        advertisements: payload,
        loading: false
      };
    case 'UPDATE_ADVERTS':
    case 'ADD_ADVERTS':
      return {
        ...state,
        advertisements: [payload.adverts],
        loading: false
      }
    case 'GET_ADVERTS_ERROR':
    case 'ADD_ADVERTS_ERROR':
    case 'UPDATE_ADVERTS_ERROR':
      return {
        ...state,
        loading: false
      };
    default: return {
      ...state,
      loading: false
    };
  }
}

export default advertsReducer;