import axios from 'axios';

// Get from localstorage
export const getLocalStorage = (key) => {
  if (window !== 'undefined') {
      return localStorage.getItem(key);
  }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    if (key === 'user') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
      
  }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
  setLocalStorage('token', response.data.token);
  setLocalStorage('user', response.data.user);
  next();
};

// Access user info from localstorage
export const isAuth = () => {
  if (window !== 'undefined') {
      const authChecked = getLocalStorage('token');
      if (authChecked) {
          if (localStorage.getItem('user')) {
              return JSON.parse(localStorage.getItem('user'));
          } else {
              return false;
          }
      }
  }
};

export const updateUser = (response, next) => {
  console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
  if (typeof window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user'));
    auth = response.data.user;
    localStorage.setItem('user', JSON.stringify(auth));
  }
  next();
};

export const getDistanceAndSpeedFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
};