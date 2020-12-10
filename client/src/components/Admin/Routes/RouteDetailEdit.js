import React, { useState, useEffect } from 'react';
import {getCurrentRouteAction, updateRoute} from '../../../store/actions/admin';
import {ReactComponent as CameraSvg} from '../../../assets/img/camera.svg';
import {ReactComponent as FolderSvg} from '../../../assets/img/folder.svg';
import { toast } from 'react-toastify';
import MoonLoader from "react-spinners/MoonLoader";
import { connect } from 'react-redux'
import GoBackButton from '../../UI/GoBackButton';
import './RouteDetailEdit.css';
import Camera from '../../Camera/Camera';

const RouteDetailEdit = (props) => {

  const [ details, setDetails] = useState({fare: '', average_travel_time: '', rush_hour: '', image_first_stop: '', image_last_stop: '', about: ''})
  const [showCamera, setShowCamera ] = useState(false);
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.dispatch(getCurrentRouteAction(props.match.params.id))
  },[]);

  useEffect(() => {
    if (props.currentRoute) {
      const {fare, average_travel_time, rush_hour, image_first_stop, image_last_stop,about} = 
      props.currentRoute;
      setDetails({fare, average_travel_time, rush_hour, image_first_stop, image_last_stop,about});
      setLoading(props.loading)
    }
  },[props.currentRoute])

  const addImage = (src, destination) => {
    destination === 'first_stop' ? setDetails({...details, image_first_stop: src}) 
    : setDetails({...details, image_last_stop: src}) 
  }

  const handleChange = e => {
    setDetails({...details, [e.target.name]: e.target.value});
  }

  const handleImage = (event, type) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.addEventListener('load',() => {
        type  === 'first_stop' ? setDetails({...details, image_first_stop: reader.result}) 
        : setDetails({...details, image_last_stop: reader.result}) 
      })
    }
  }

  const toggleCamera = (destination) => {
    destination && setDestination(destination);
    setShowCamera(!showCamera)
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.dispatch(updateRoute(props.currentRoute._id, details)).then(() => {
      toast.success('Route was updated');
      props.history.push('/admin/routes');
    }).catch(error => (
      toast.error("Something went wrong")
    ));
  }

  return (
    <div style={{flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      {showCamera && <Camera addImage={addImage} toggleCamera={toggleCamera} destination={destination}
        mode="environment"
      />}
      <div className="container">
        <GoBackButton />
        {loading ? <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader />
        </div> : 
        <form className="details__edit--form" onSubmit={handleSubmit}>
          <h4 style={{fontSize: '20px'}}>{props.currentRoute.name}</h4>
          <hr />
          <label>
            <span className="details__form--title">Fare</span>
            <input type="text" name="fare" value={details.fare} onChange={handleChange}/>
          </label>
          <hr/>
          <label>
            <span className="details__form--title">Average travel time</span>
            <input type="text" name="average_travel_time" value={details.average_travel_time} 
              onChange={handleChange}/>
          </label>
          <hr/>
          <label>
            <span className="details__form--title">Ruch hour</span>
            <input type="text" name="rush_hour" value={details.rush_hour} 
              onChange={handleChange}/>
          </label>
          <hr/>
          <div>
            <span className="details__form--title">Browse/Image of First stop</span>
            <div className="details__images--btns">
              <span onClick={() => toggleCamera('first_stop')}>
                <CameraSvg />
              </span>
              <label>
                <FolderSvg />
                <input type="file" onChange={(e) => handleImage(e, 'first_stop')}/>
              </label>
            </div>
            {details.image_first_stop 
              &&  <div className="add__vahicle--image--container">
                    <img src={details.image_first_stop} alt="first stop"/>
                    <button onClick={() => setDetails({...details, image_first_stop: ''})} className="add-vehicle--button">X</button>
                  </div>}
            <span>{props.currentRoute.stops && props.currentRoute.stops[0].name_of_stop}</span>
          </div>
          <hr />
          <div>
            <span className="details__form--title">Browse/Image of Last stop</span>
            <div className="details__images--btns">
              <span onClick={() => toggleCamera('last_stop')}>
                <CameraSvg />
              </span>
              <label>
                <FolderSvg />
                <input type="file" onChange={(e) => handleImage(e, 'last_stop')}/>
              </label>
            </div>
            {details.image_last_stop 
              &&  <div className="add__vahicle--image--container">
                    <img src={details.image_last_stop} alt="last stop"/>
                    <button onClick={() => setDetails({...details, image_last_stop: ''})} className="add-vehicle--button">X</button>
                  </div>}
            <span>
              {props.currentRoute.stops && props.currentRoute.stops[props.currentRoute.stops.length -1].name_of_stop}
            </span>
          </div>
          <hr />
          <textarea rows="6" value={details.about} onChange={handleChange} name="about"/>
          <button type="submit" className="route-add-edit__submit" style={{display: 'block'}} >Save</button>
        </form>}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentRoute: state.admin.currentRoute,
  loading: state.admin.loading
})

export default connect(mapStateToProps)(RouteDetailEdit)
