import React, {useState, Fragment, useEffect} from 'react';

const CityItem = ({city, saveCity, deleteCity}) => {
  
  const [isEdit, setIsEdit] = useState(false);
  const [currentCity, setCurrentCity] = useState();
  
  useEffect(() => {
    setCurrentCity(city.city);
  },[city]);
  
  const handleSave = () => {
    setIsEdit(false);
    saveCity(currentCity);
  }
  
  const changeEdit = e => {
    e.preventDefault();
    setIsEdit(true);
  }
  
  const cancelEdit = e => {
    e.preventDefault();
    setIsEdit(false);
    setCurrentCity(city.city);
  };
  
  return (
    <Fragment>
      <td colSpan={4}>
        {isEdit
          ? <input type="text" value={city.city} name="city" placeholder="City"
             style={{padding: '5px', border: '1px solid black', borderRadius: '5px', width: '100%', boxSizing: 'border-box'}}
          />
          : <span>{city.city}</span> }
      </td>
      <td>
        <div className="users__form--btns">
          {isEdit
            ? <Fragment>
              <button type="button" onClick={handleSave}>Save</button>
              <button type="button" onClick={cancelEdit}>Cancel</button>
            </Fragment>
            : <Fragment>
              <button type="button" onClick={changeEdit}>Edit</button>
              <button type="button" onClick={() => deleteCity(city._id)}>Delete</button>
            </Fragment>
          }
        </div>
      </td>
    </Fragment>
  );
};

export default CityItem;
