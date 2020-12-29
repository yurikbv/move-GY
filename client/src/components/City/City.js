import React, {useEffect, useState} from 'react';

const City = (props) => {
  
  const [cities, setCities] = useState(['Penza', 'BXX']);
  const [city, setCity] = useState();
  
  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem('city', city);
    props.toggleCityModal();
  }
  
  useEffect(() => {
    localStorage.city && setCity(localStorage.city);
  },[])
  
  return (
    <div className="alert__modal--container" style={{zIndex: '100'}}>
      <div className="alert__modal">
        <form onSubmit={handleSubmit}>
          <label>
            <select
              className="choose__city--select"
              size={cities.length > 20 ? 20 : cities.length}
              value={city ? city : cities[0]}
              onChange={(e) => setCity(e.target.value)}
            >
              {cities.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button type="submit" style={{margin: '15px 0 0' ,display: 'block'}} className="route-add-edit__submit">Submit</button>
        </form>
        <button type="button" className="close__button--cross" onClick={props.toggleCityModal}>X</button>
      </div>
    </div>
  );
};

export default City;
