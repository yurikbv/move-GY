import React, {useState, useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import {getCitiesAction} from "../../../store/actions/city_action";
import NavBar from "../NavBar/NavBar";
import CityItem from "./CityItem";

const Cities = (props) => {
  
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    props.dispatch(getCitiesAction())
  },[])
  
  useEffect(() => {
    if (props.cities) {
      setCities(props.cities);
      setLoading(props.loading);
    }
  },[props.cities])
  
  const addCity = e => {
    e.preventDefault();
    setCities([...cities, {city: ''}]);
  }
  
  const saveCity = city => {
  
  }
  
  const deleteCity = e => {
  
  }
  
  return (
    <div style={{flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="container">
        <h3>ADMIN</h3>
        <NavBar />
        <table className="admin__table" style={{marginTop: '15px'}}>
          <thead>
          <tr>
            <th colSpan="4" style={{width: '70%'}}>City</th>
            <th style={{width: '30%'}}>Status</th>
          </tr>
          </thead>
          <tbody>
              {cities.length > 0 && cities.map((city, i) => (
                <tr key={i}>
                  <CityItem city={city.city} saveCity={saveCity} deleteCity={deleteCity} index={i}/>
                </tr>
              ))}
            
          </tbody>
        </table>
        <button className="add_stop" onClick={addCity}>Add Stop</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cities: state.cities.cities,
  loading: state.cities.loading
})

export default connect(mapStateToProps)(Cities);
