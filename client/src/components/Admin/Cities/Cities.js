import React, {useState, useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import {getCitiesAction, addCityAction, updateCityAction, deleteCityAction} from "../../../store/actions/city_action";
import NavBar from "../NavBar/NavBar";
import CityItem from "./CityItem";
import CityModal from "./CityModal";

const Cities = (props) => {
  
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityForEdit, setCityForEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    props.dispatch(getCitiesAction())
  },[])
  
  useEffect(() => {
    if (props.cities) {
      setCities(props.cities);
      setLoading(props.loading);
    }
  },[props.cities])
  
  const addCity = city => {
    props.dispatch(addCityAction({city}));
    toggleModal();
  }
  
  const updateCity = city => {
    props.dispatch(updateCityAction(cityForEdit._id, {city}));
    setCityForEdit(null);
    toggleModal();
  }
  
  const toggleModal = () => setShowModal(!showModal);
  
  const deleteCity = id => {
    // let newCities = cities.filter(item => item._id !== id);
    // setCities(newCities);
    props.dispatch(deleteCityAction(id))
  }
  
  const editCity = city => {
    setShowModal(true);
    setCityForEdit(city);
  }
  
  const handleAdd = () => {
    setShowModal(true);
    setCityForEdit(null);
  }
  
  return (
    <div style={{flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="container">
        
        {showModal && <CityModal updateCity={updateCity} addCity={addCity} cityForEdit={cityForEdit && cityForEdit.city} toggleModal={toggleModal}/>}
        
        <h3>ADMIN</h3>
        <NavBar />
        <button
          className="add_route--link"
          onClick={handleAdd}
          style={{backgroundColor: 'white', cursor: 'pointer', marginBottom: '10px', fontSize: '16px',fontFamily:'\'Abril Fatface\', cursive'}}>
          Add City
        </button>
        <hr/>
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
                  <CityItem city={city} editCity={editCity} deleteCity={deleteCity} index={i}/>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cities: state.cities.cities,
  loading: state.cities.loading
})

export default connect(mapStateToProps)(Cities);
