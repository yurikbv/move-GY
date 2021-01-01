import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getCitiesAction} from "../../store/actions/city_action";
import MoonLoader from "react-spinners/MoonLoader";
import {getRoutes} from "../../store/actions/route_acton";

const City = (props) => {
  
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(true);
  
  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem('city', city);
    let cityId = cities.filter(item => item.city === city)[0]._id;
    localStorage.setItem('cityId', cityId);
    props.toggleCityModal();
    if(props.location.pathname === '/track_bus') {
      props.dispatch(getRoutes());
    }
  }
  
  useEffect(() => {
    props.dispatch(getCitiesAction());
  },[])
  
  useEffect(() => {
    if (props.cities) {
      setCities(props.cities)
      setLoading(props.loading)
    }
  }, [props.cities])
  
  useEffect(() => {
    localStorage.city && setCity(localStorage.city);
  },[])
  
  return (
    <div className="alert__modal--container" style={{zIndex: '100'}}>
      <div className="alert__modal">
        {loading ? <div style={{position: 'absolute', left: '50%', top: '50%',
            transform:'translate(-50%,-50%)'}}><MoonLoader /></div> :
          <form onSubmit={handleSubmit}>
          <label>
            <select
              className="choose__city--select"
              size={cities.length > 20 ? 20 : cities.length}
              value={city ? city : cities[0].name}
              onChange={(e) => setCity(e.target.value)}
            >
              {cities.length > 0 && cities.map(item => (
                <option key={item._id}>{item.city}</option>
              ))}
            </select>
          </label>
          <button type="submit" style={{margin: '15px 0 0' ,display: 'block'}} className="route-add-edit__submit">Submit</button>
        </form>}
        <button type="button" className="close__button--cross" onClick={props.toggleCityModal}>X</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cities: state.cities.cities,
  loading: state.cities.loading
})

export default connect(mapStateToProps)(withRouter(City));
