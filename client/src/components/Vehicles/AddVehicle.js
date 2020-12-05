import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from 'react-toastify';

import { addVehicle } from '../../store/actions/vehicle';

import {ReactComponent as ArrowUpSvg} from '../../assets/img/arrow-upe1696007be4eefb81b1a1d39ce48681b.svg';
import {ReactComponent as ArrowDownSvg} from '../../assets/img/arrow-downc5c1d376a8d527e5ba94415e70c9003e.svg';
import {ReactComponent as CameraSvg} from '../../assets/img/camera.svg';
import "./AddVehicle.css";
import Camera from "../Camera/Camera";

const AddVehicle = (props) => {

  const [plate, setPlate] = useState("");
  const [typeVehicle, setTypeVehicle] = useState("Bus");
  const [seats, setSeats] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [showSeats, setShowSeats] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showCamera, setShowCamera ] = useState(false);
  const [destination, setDestination] = useState('');
  const [vehicleImageFront, setVehicleImageFront] = useState('');
  const [vehicleImageLeft, setVehicleImageLeft] = useState('');

  const changeTypeVehicle = (e) => {
    setTypeVehicle(e.target.value);
  };

  const addImage = (src, destination) => {
    destination === 'front side' ? setVehicleImageFront(src) : setVehicleImageLeft(src)
  }

  const toggleCamera = (destination) => {
    destination && setDestination(destination);
    setShowCamera(!showCamera)
  };

  const showError = text => toast.error(`${text} field is required`)

  const handleSubmit = e => {
    e.preventDefault();
    if (plate.trim() === "") {showError('Vehicle tag / License Plate'); return false};
    if (seats.trim() === "") {showError('Passenger seats'); return false};
    if (model.trim() === "") {showError('Make / Model'); return false};
    if (color.trim() === "") {showError('Color'); return false};
    const vehicle = {
      plate,
      type_of_vehicle: typeVehicle,
      seats,
      model,
      color,
      vehicle_image_front: vehicleImageFront,
      vehicle_image_left: vehicleImageLeft
    };
    props.dispatch(addVehicle(vehicle)).then((res) => {
      toast.success('Vehicle was added');
      props.history.push('/vehicles');
    }).catch(error => {
      console.error(error);
      toast.error('Something went wrong. Try again later');
    }
   )
  }

  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
       {showCamera && <Camera addImage={addImage} toggleCamera={toggleCamera} destination={destination}/>}
      <div className="container add_vehicle" style={{ width: "100%"}}>
        <h4>Add Vehicle</h4>
        <hr />
        <form className="form_add_vehicle" onSubmit={handleSubmit}>
          <label style={{ marginBottom: "10px", display: "block" }}>
            <span style={{ display: "block" }}>
              Vehicle tag / License Plate
            </span>
            <input type="text" value={plate} onChange={(e) => setPlate(e.target.value)} />
          </label>
          <div className="add_vehicle_container">
            <div className="add_vehicle--item">
              <input  type="radio"  name="typeVehicle"  value="Bus"  id="Bus"  onChange={changeTypeVehicle}
                checked={typeVehicle === "Bus"} />
              <label htmlFor="Bus">Bus / Van</label>
            </div>
            <div className="add_vehicle--item">
              <input  type="radio"  name="typeVehicle"  value="Car"  id="Car"  onChange={changeTypeVehicle}  checked={typeVehicle === "Car"} />
              <label htmlFor="Car">Car</label>
            </div>
            <div className="add_vehicle--item">
              <input type="radio" name="typeVehicle" value="SUV" id="SUV" onChange={changeTypeVehicle}
                checked={typeVehicle === "SUV"} />
              <label htmlFor="SUV">SUV</label>
            </div>
          </div>

          <label style={{ marginBottom: "10px", display: "block" }}>
            <span style={{cursor: 'pointer', display: "flex", alignItems: 'center'}} onClick={() => setShowSeats(!showSeats)}>
              <span>Passenger seats</span> {showSeats ? <ArrowUpSvg/> : <ArrowDownSvg/>}
            </span>
            {showSeats && <input type="text" value={seats} onChange={(e) => setSeats(e.target.value)} 
            />}
          </label>

          <label style={{ marginBottom: "10px", display: "block" }}>
            <span style={{cursor: 'pointer', display: "flex", alignItems: 'center'}} onClick={() => setShowModel(!showModel)}>
             <span>Make / Model</span>{showModel ? <ArrowUpSvg/> : <ArrowDownSvg/>}
            </span>
            {showModel && <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />}
          </label>

          <label style={{ marginBottom: "10px", display: "block" }}>
            <span style={{cursor: 'pointer', display: "flex", alignItems: 'center' }} onClick={() => setShowColor(!showColor)}>
             Color {showColor ? <ArrowUpSvg/> : <ArrowDownSvg/>}
            </span>
            {showColor && <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />}
          </label>

          <span style={{marginBottom: '10px', display: 'flex', cursor: 'pointer'}}
            onClick={() => toggleCamera('front side')} className="take-photo">
            <span>Upload image of vehicle front side</span>
            <CameraSvg style={{height: '24px', maxWidth: '24px', marginLeft: '10px'}}/>
          </span>
          {vehicleImageFront 
          &&  <div className="add__vahicle--image--container">
                <img src={vehicleImageFront} alt="vehicle front"/>
                <button onClick={() => setVehicleImageFront('')} className="add-vehicle--button">X</button>
              </div>}
          <div style={{marginBottom: '10px', display: 'flex', cursor: 'pointer'}}
            onClick={() => toggleCamera('left side')} className="take-photo">
            <span>Upload image of vehicle left side</span>
            <CameraSvg style={{height: '24px', maxWidth: '24px', marginLeft: '10px'}}/>
          </div>
          {vehicleImageLeft && 
          <div className="add__vahicle--image--container">
            <img src={vehicleImageLeft} alt="vehicle left"/>
            <button onClick={() => setVehicleImageLeft('')} className="add-vehicle--button">X</button>
          </div>}

          <button type="submit" className="profile__button">Save</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(AddVehicle);
