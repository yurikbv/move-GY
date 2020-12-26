import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { updateVerhicleByAdmin } from '../../../store/actions/admin';
import './VehiclesModal.css';

export const VehiclesModal = (props) => {

  const [data, setData] = useState({
    plate: '',
    type_of_vehicle: '',
    createAt: '',
    model: '',
    seats: '',
    color: ''
  });

  useEffect(() => {
    let vehicle = {...props.vehicle, createdAt: moment(props.vehicle.createdAt).format("YYYY/MM/DD") };
    setData(vehicle);
  }, [props.vehicle])

  const handleChange = e => {
    setData({...data, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(updateVerhicleByAdmin(data, props.vehicle._id));
    props.toggleModal();
  }

  return (
    <div className="vehicles__modal">
      <form className="vehicles__form--modal" onSubmit={handleSubmit} >
        <div style={{textTransform: 'uppercase', fontWeight: '700', color: '#901CE8'}}>Edit Vehicle</div>
        <hr/>
        <label>
          <span>Type</span>
          <input type="text" name="type_of_vehicle" value={data.type_of_vehicle} onChange={handleChange}/>
        </label>
        <label>
          <span>Plate</span>
          <input type="text" name="plate" value={data.plate} onChange={handleChange}/></label>
        <label>
          <span>Model</span>
          <input type="text" name="model" value={data.model} onChange={handleChange}/>
        </label>
        <label>
          <span>Seats</span>
          <input type="number" name="seats" value={data.seats} onChange={handleChange}/>
        </label>
        <label>
          <span>Color</span>
          <input type="text" name="color" value={data.color} onChange={handleChange}/>
        </label>
        <label>
          <span>Reg Date</span>
          <input type="text" name="createAt" value={data.createdAt} disabled/>
        </label>
        <button type="cancel" className="clear__button"
        onClick={(e) => {
          e.preventDefault();
          props.toggleModal();
        }}>Cancel</button>
        <button type="submit" className="route-add-edit__submit">Save</button>
      </form>
    </div>
  )
}

export default connect()(VehiclesModal)
