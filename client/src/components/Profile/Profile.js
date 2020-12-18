import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import MoonLoader from "react-spinners/MoonLoader";

import { loadUser, updateProfile, setUserLocation } from '../../store/actions/user';
import MyAccountNavBar from '../NavBar/MyAccountNavBar';
import './Profile.css';
import {ReactComponent as CameraSvg} from '../../assets/img/camera.svg';
import Camera from '../Camera/Camera';

const Profile = (props) => {

  const [name, setName] = useState('');
  const [role, setRole] = useState('')
  const [mobileNumber, setMobileNumber] = useState('');
  const [images, setImages ] = useState([{}]);
  const [showCamera, setShowCamera ] = useState(false);
  const [loading, setLoading ] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    props.dispatch(loadUser());
  },[localStorage.user]);

  useEffect(() => {
    if (props.user) {
      setName(props.user.name);
      setMobileNumber(props.user.mobileNumber);
      setImages(props.user.images);
      setLoading(props.loading);
      setRole(props.user.role);
    };
    if (props.user && props.user.isActive) {
      setLatitude(props.user.latitude);
      setLongitude(props.user.longitude);
    };
    return () => {
      setName('');
      setMobileNumber('');
      setImages('');
      setLoading(true);
      setRole('')
    }
  }, [props.user])

  const handleProfile = e => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
    const user = {name, mobileNumber, images};
    props.dispatch(updateProfile(user));
  }

  const addImage = src => {
    let img = { id: uuidv4(), src }
    setImages([...images, img]);
  }

  const toggleCamera = () => setShowCamera(!showCamera);

  const deleteImage = id => {
    let newImages = images.filter(image => image.id !== id );
    setImages(newImages);
  }

  const handleLocation =  () => {
    if(!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        props.dispatch(setUserLocation(position.coords));
      }, () => toast.error('Unable to retrieve your location'));
    }
  }

  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      {showCamera && <Camera addImage={addImage} toggleCamera={toggleCamera} mode="user"/>}
      <div  className="container" >
        <h3>My Account</h3>
        <MyAccountNavBar />
        <hr/>
        {role && role === "User" && 
          <div>
            <b style={{display: 'block'}}>Set Your Bus Stop location</b>
            <button className="set__location" onClick={handleLocation}>Get Your location</button>
            {latitude && longitude && 
              <Fragment>
                <span style={{display: 'block', fontWeight: '700'}}>{`lat: ${latitude}`}</span>
                <span style={{display: 'block', fontWeight: '700'}}>{`lng: ${longitude}`}</span>
              </Fragment>
            }
            <hr/>
          </div>
        }
        {loading ? <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader /></div> : (
          <form onSubmit={handleProfile}>
          <label style={{marginBottom: '10px',display: 'block'}}>
            <span style={{display: 'block'}}>Name</span>
            <input type="text" id="nameField" value={name} onChange={e => setName(e.target.value)}/>
          </label>
          <label style={{marginBottom: '10px',display: 'block'}}>
            <span style={{display: 'block'}}>Mobile number</span>
            <input type="tel" id="mobileField" value={mobileNumber} 
              onChange={e => setMobileNumber(e.target.value)}/>
          </label>
          <div style={{marginBottom: '10px', display: 'flex', cursor: 'pointer'}}
            onClick={toggleCamera}
          >
            <span>Take/Upload selfie</span>
            <CameraSvg style={{maxHeight: '24px', maxWidth: '24px', marginLeft: '10px'}}/>
          </div>
          <div className="selfie__container">
          {images.length > 0 && images.map((image) => (
            <div key={image.id} className="images_selfie">
              <img src={image.src} alt={image.id}/>
              <button onClick={() => deleteImage(image.id)}>X</button>
            </div>
          ))}
          </div>
          
          <button type="submit" className="route-add-edit__submit">Submit</button>
        </form>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading
});

export default connect(mapStateToProps)(Profile);
