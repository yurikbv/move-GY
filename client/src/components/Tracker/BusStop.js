import React, {useEffect, useState, Fragment} from 'react';
import { connect } from 'react-redux';
import moment from "moment";

const BusStop = ({route, stop, stops,toggleBusStop, idx}) => {
  
  const [distancesToStop, setDistancesToStop] = useState([]);
  
  useEffect(() => {
    let newStops = stops.slice(0, idx);
    // console.log(newStops)
    let distances = [];
    newStops.forEach((stop,i) => {
      if (stop.vehicles.length > 0) {
        stop.vehicles.forEach(vehicle => {
          let distance = 0;
          
          let average = vehicle.average_speed.length > 1
            ? (vehicle.average_speed.reduce((total,num) => +total + +num)).toFixed(3) / vehicle.average_speed.length
            : vehicle.average_speed[0];
          average = average.trim() === "" ? 0 : average;
          if(vehicle.text === 'approaching' || vehicle.text === 'just left' || vehicle.text === 'at stop') {
            let newStopsArr = newStops.slice(i);
            newStopsArr = newStopsArr.filter(stop => stop.name_of_stop === 'between');
            if (newStopsArr.length > 1) {
              distance = newStopsArr.reduce((sum,num) => +sum + +num.distance, +distance);
            } else distance = newStopsArr[0].distance;
            let sec = (((distance / average) * 60) * 60)
            let time = moment.unix(sec).utc().format('H [hours,] m [minutes and] s [seconds]')
            distances = [...distances, {distance, time}]
          } else {
            let newStopsArr = newStops.slice(i + 1);
            newStopsArr = newStopsArr.filter(stop => stop.name_of_stop === 'between');
            if (newStopsArr.length > 1) {
              distance = newStopsArr.reduce((sum,num) => sum + +num.distance, +vehicle.distance);
            } else if (newStopsArr.length === 1) {
              distance = +newStopsArr[0].distance + +vehicle.distance
            } else distance = +vehicle.distance;
            let sec = (((distance / average) * 60) * 60)
            let time = moment.unix(sec).utc().format('H [hours,] m [minutes and] s [seconds]')
            distances = [...distances, {distance, time}]
          }
        })
      }
    })
    if (stops[idx].vehicles.length > 0) {
      stops[idx].vehicles.filter(vehicle => vehicle.text !== 'just left').forEach(vehicle => {
        distances = [...distances, {distance: 0, time: vehicle.text}]
      })
    }
    distances = distances.sort((a, b) => a.distance < b.distance ? - 1 : Number(a.distance > b.distance));
    setDistancesToStop(distances);
  },[])
  
  return (
    <div className="alert__modal--container">
      <div className="alert__modal" >
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
          <h3>#{route.number} {route.name}</h3>
          <h4 style={{fontSize: '20px', color: 'lightcoral', marginTop: '-10px'}}>{stop.name_of_stop}</h4>
          {distancesToStop.length > 0
            ? <ol>
              {distancesToStop.map((vehicle,i) => (
                <li key={i}>{
                  vehicle.distance === 0 ? <span>{vehicle.time}</span>
                    : <span>{(vehicle.distance).toFixed(2)} km away. Estimated time: {vehicle.time}</span>
                }
                </li>
              ))}
            </ol>
            : <span>No bus detected at this time.</span>}
          
          <button type="button" className="close__button--cross" onClick={toggleBusStop}>X</button>
        </div>
      </div>
    </div>
  );
};


export default connect()(BusStop);
