const initialState = {
  user: {
    name: '',
    email: '',
    role: '',
    latitude: '',
    longitude: '',
    isActive: '',
    mobileNumber: '',
    images: [],
    date: ''
  },
  isAuthenticated: null,
  loading: true
}

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'LOGIN_REGISTER_FACEBOOK':
    case 'LOGIN_REGISTER_GOOGLE':
    case 'LOAD_USER':
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        error: '',
        loading: false
      }
      case 'GOOGLE_AUTH_ERROR':
      case 'FACEBOOK_AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      }
      case 'LOAD_USER_ERROR':
        return {
          ...state,
          isAuthenticated: false,
          loading: false
        }
    default: 
      return {...state,loading: false};
  }
}

export default authReducer;