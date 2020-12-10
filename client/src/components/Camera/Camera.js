import React, { useState, useEffect} from 'react';
import './Camera.css';

export default function Camera(props) {

  const [track, setTrack] = useState(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      let config = {
        facingMode: props.mode,
        width: { min: 640, ideal: 1920, max: 2560 },
        height: { min: 480, ideal: 1080, max: 1440 },
        frameRate: { ideal: 10, max: 15 },
      };

      navigator.mediaDevices.getUserMedia({ video: config })
          .then( (stream) => {
            let video = document.querySelector('#video');
            video.srcObject = stream;
            setTrack(stream.getVideoTracks()[0]);
          } ).catch(error => console.log(error));
    }
  },[]);

  useEffect(() => {
    window.addEventListener('popstate', (e) => {
      e.preventDefault();
      e.stopPropagation();
      props.toggleCamera();
    })
    return () => {
      window.removeEventListener('popstate', e => {
        e.preventDefault();
        e.stopPropagation();
        props.toggleCamera();
      })
    }
  },[]);

  const snapShot = () => {
    const canvas = document.createElement('canvas');
    const video = document.querySelector('#video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    track.enabled = false;
    props.addImage(canvas.toDataURL('image/jpeg', 1), props.destination);
    props.toggleCamera();
  };

  return (
    <div className="camera__container">
      <video
        id="video"
        autoPlay
        muted
      />
      <div className="push__icon" onClick={snapShot}>
          <svg viewBox="0 0 100 100" >
            <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="4" fill="transparent"/>
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="white"/>
          </svg>
      </div>
    </div>
  )
}
