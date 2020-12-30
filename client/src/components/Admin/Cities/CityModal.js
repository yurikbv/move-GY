import React, {useEffect, useState} from 'react';

const CityModal = ({cityForEdit,updateCity,addCity ,toggleModal}) => {
  
  const [currentCity, setCurrentCity] = useState()
  
  useEffect(() => {
    setCurrentCity(cityForEdit);
  },[])
  
  const handleChange = e => {
    setCurrentCity(e.target.value);
  }
  
  return (
    <div className="alert__modal--container">
      <div className="alert__modal">
        <form>
          <input name="city" value={currentCity} placeholder="City" onChange={handleChange} autoFocus={true}
                 style={{padding: '5px', marginTop: '15px', borderRadius: '8px', border: '1px solid gray', width: '90%'}}/>
          <div style={{display: 'block'}}>
            {cityForEdit
              ? <button type="submit" onClick={() => updateCity(currentCity)} className="route-add-edit__submit"
                        style={{display: 'inline-block', padding: '10px 15px', margin: '10px 0 0'}}>Update</button>
              : <button type="submit" onClick={() => addCity(currentCity)} className="route-add-edit__submit"
                        style={{display: 'inline-block', padding: '10px 15px', margin: '10px 0 0'}}>Save</button>
            }
          </div>
        </form>
        <button className="close__button--cross" onClick={toggleModal}>X</button>
      </div>
    </div>
  );
};

export default CityModal;
