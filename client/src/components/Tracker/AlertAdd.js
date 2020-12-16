import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AlertAdd = ({route, toggleAddModal}) => {
  
  const [startDate, setStartDate] = useState(new Date());
  
  const [eventAlert, setEventAlert] = useState();
  
  const handleSelect = e => {
    setEventAlert(e.target.value);
  }
  
  return (
    <div className="alert__modal--container">
      <div className="alert__modal">
        <h4>New Alert on {route.number} {route.name}</h4>
        <hr/>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          isClearable
          minDate={new Date()}
          showTimeSelect
          className="date__picker"
          dateFormat="yyyy/MM/dd h:mm aa"
        />
        <form style={{marginTop: '15px'}}>
          <label className="alert__add--label">
            <input type="radio" name="event_alert" value="accident" onChange={handleSelect}/>
            <span>Accident</span>
          </label><br/>
          <label className="alert__add--label">
            <input type="radio" name="event_alert" value="bridge_opening" onChange={handleSelect}/>
            <span>Bridge opening</span>
          </label><br/>
          <label className="alert__add--label">
            <input type="radio" name="event_alert" value="protest" onChange={handleSelect}/>
            <span>Protest</span>
          </label><br/>
          <label className="alert__add--label">
            <input type="radio" name="event_alert" value="fire" onChange={handleSelect}/>
            <span>Fire</span>
          </label><br/>
          <label className="alert__add--label">
            <input type="radio" name="event_alert" value="police_activity" onChange={handleSelect}/>
            <span>Police activity</span>
          </label><br/>
          <label className="alert__add--label">
            <input type="radio" name="event_alert" value="traffic" onChange={handleSelect}/>
            <span>Traffic</span>
          </label><br/>
          <label className="alert__add--label">
            <input type="radio" name="event_alert" value="other" onChange={handleSelect}/>
            <span>Other</span>
          </label>
          <button type="submit" style={{marginBottom: '15px', display: 'block'}} className="route-add-edit__submit">Submit</button>
        </form>
        <button className="alert__close" onClick={toggleAddModal}>X</button>
      </div>
    </div>
  );
};

export default AlertAdd;
