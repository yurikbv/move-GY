import React, {Fragment} from 'react';

const CityItem = ({city, editCity, deleteCity}) => {
  
  return (
    <Fragment>
      <td colSpan={4}>
        <span>{city.city}</span>
      </td>
      <td>
        <div className="users__form--btns">
          <button type="button" onClick={() => editCity(city)}>Edit</button>
          <button type="button" onClick={() => deleteCity(city._id)}>Delete</button>
        </div>
      </td>
    </Fragment>
  );
};

export default CityItem;
