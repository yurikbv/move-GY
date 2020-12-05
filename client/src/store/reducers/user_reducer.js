const initialState = {
  user: {
    name: '',
    email: '',
    role: '',
    latitude: '',
    longitude: '',
    isActive: false,
    mobileNumber: '',
    images: [],
    date: ''
  },
  isAuthenticated: null,
  loading: true,
  error: '',
  success: ''
}

const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'LOAD_USER':
    case 'UPDATE_PROFILE':
    case 'SET_USER_LOCATION':
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        loading: false,
        error: ''
      }
    case 'ACTIVE_USER':
      let newUser = JSON.parse(localStorage.user);
      newUser.isActive = true;
      localStorage.user = JSON.stringify(newUser);
      return {...state}
    case 'SET_USER_LOCATION_ERROR':
      return {
        ...state,
        error: payload.error
      }
    case 'LOAD_USER_ERROR':
    case 'LOGOUT_USER':
      return {
        ...state,
        user: {
          name: '',
          email: '',
          role: '',
          latitude: '',
          longitude: '',
          isActive: false,
          mobileNumber: '',
          images: [],
          date: ''
        },
        isAuthenticated: false,
        loading: false
      }
    default: 
      return state;
  }
}

export default userReducer;