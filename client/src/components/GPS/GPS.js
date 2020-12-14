import React, {useState} from 'react';


const GPS = (props) => {
  
  let watchId;
  const [coords, setCoords] = useState({});
  
  const handleStart = (e) => {
    e.preventDefault();
    watchId = navigator.geolocation.watchPosition(position => {
      console.log(position)
      setCoords(position.coords);
      console.log(watchId);
    }, error => {
      console.log(error);
    }, {
      timeout: 20000,
      maximumAge: 60000,
      distanceFilter: 1
    })
  }
  
  const handleStop = e => {
    e.preventDefault();
    navigator.geolocation.clearWatch(watchId);
    setCoords({});
  }
  
  return (
    <div>
      <div>
        <span style={{display: 'block'}}>Watch Id: {watchId}</span>
        <span style={{display: 'block'}}>Latitude: {coords.latitude}</span>
        <span style={{display: 'block'}}>Longitude: {coords.longitude}</span>
        <span style={{display: 'block'}}>Speed: {coords.speed}</span>
      </div>
      <div>
        <button type="button" onClick={handleStart} style={{display: 'block'}}>Start</button>
        <button type="button" onClick={handleStop} style={{display: 'block'}}>Finish</button>
      </div>
    </div>
  );
};



export default GPS;
