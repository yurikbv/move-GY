import React, {Fragment, useState, useEffect} from 'react'

export default function AdminRouteAddEditItem({stop, index, feature, handleChangeStop, deleteStop, type, color}) {

  const [currentStop, setCurrentStop] = useState({name_of_stop: '', latitude: '', longitude: ''});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setCurrentStop(stop);
  },[stop]);

  const changeEdit = e => {
    e.preventDefault();
    setIsEdit(true);
  }

  const handleChangeInput = e => {
    setCurrentStop({...currentStop, [e.target.name]: e.target.value});
  }

  const saveStop = e => {
    e.preventDefault();
    handleChangeStop(currentStop, index, type);
    setIsEdit(false);
  }

  const cancelEdit = e => {
    e.preventDefault();
    setIsEdit(false);
    setCurrentStop(stop);
  };

  return (
    <Fragment>
      <td className="users__form-email" colSpan="3" style={{backgroundColor: color ? color : ''}}>
        {isEdit 
        ? <input type="text" value={currentStop.name_of_stop} name="name_of_stop"
            placeholder="Name of Stop" onChange={handleChangeInput} required/>
        : <span>
            {currentStop.name_of_stop ? currentStop.name_of_stop : <i>{feature}</i>}
          </span>
        }
      </td>
      <td>
        {isEdit
        ? <input type="text" value={currentStop.latitude} name="latitude" placeholder="latitude" 
            onChange={handleChangeInput} required/>
        : <span>{currentStop.latitude}</span> 
        }
      </td>
      <td>
        {isEdit 
        ? <input type="text" value={currentStop.longitude} name="longitude" placeholder="longitude" 
            onChange={handleChangeInput} required/>
        : <span>{currentStop.longitude}</span>
        }
      </td>
      <td>
        <div className="users__form--btns">
          {isEdit
          ? <Fragment>
              <button type="button" onClick={saveStop}>Save</button>
              <button type="button" onClick={cancelEdit}>Cancel</button>
            </Fragment>
          : <Fragment>
            <button type="button" onClick={changeEdit}>
              {currentStop.name_of_stop ? "Edit" : "Add"}</button>
            <button type="button">Active</button>
            <button type="button" onClick={() => deleteStop(index, type)}>Delete</button>
          </Fragment>
          }
        </div>
      </td>
    </Fragment>
  )
}
