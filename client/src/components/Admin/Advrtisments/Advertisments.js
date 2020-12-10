import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import {getAdverts, addAdverts, updateAdverts} from '../../../store/actions/advertisment_action';
import NavBar from '../NavBar/NavBar';
import './Advertisments.css';

const Advertisments = (props) => {

  const [commer, setСommer] = useState({
    header_commer: '',
    bus_tracker: '',
    route_detail: '',
    popup: '',
    bus_route: '',
    bus_route_detail: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.dispatch(getAdverts());
  },[]);

  useEffect(() => {
    if (props.commer && props.commer.length > 0) {
      setСommer(props.commer[0]);
      setLoading(props.loading);
    } else setLoading(false)
  },[props.commer])

  const handleChange = e => {setСommer({...commer, [e.target.name]: e.target.value})};

  const handleSubmit = e => {
    e.preventDefault();
    if (props.commer.length) {
      let newAdverts = {
        header_commer: commer.header_commer,
        bus_tracker: commer.bus_tracker,
        route_detail:commer.route_detail,
        popup: commer.popup,
        bus_route: commer.bus_route,
        bus_route_detail: commer.bus_route_detail
      }
      props.dispatch(updateAdverts(commer._id, newAdverts));
    } else props.dispatch(addAdverts(commer))
  }

  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="admin__users container">
        <h3>Admin</h3>
        <NavBar />
        {loading ?
        <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader />
        </div> : 
        <form onSubmit={handleSubmit}>
          <label>
            <span style={{display: 'block', fontWeight: '700'}}>Advertisment for Header</span>
            <textarea rows="6" style={{minWidth: '50%'}} placeholder="Paste the code here"
              name="header_commer" onChange={handleChange} value={commer.header_commer}
            />
          </label>
          <button type="button" className="clear__button" 
            onClick={() => setСommer({...commer, header_commer: ''})}>Clear</button>
          <hr />
          <label>
            <span style={{display: 'block', fontWeight: '700'}}>Advertisment for Bus tracker page</span>
            <textarea rows="6" style={{minWidth: '50%'}} placeholder="Paste the code here"
              name="bus_tracker" onChange={handleChange} value={commer.bus_tracker}
            />
          </label>
          <button type="button" className="clear__button" 
            onClick={() => setСommer({...commer, bus_tracker: ''})}>Clear</button>
          <hr />
          <label>
            <span style={{display: 'block', fontWeight: '700'}}>Advertisment for Route detail page</span>
            <textarea rows="6" style={{minWidth: '50%'}} placeholder="Paste the code here" 
              name="route_detail" onChange={handleChange} value={commer.route_detail}
            />
          </label>
          <button type="button" className="clear__button" 
            onClick={() => setСommer({...commer, route_detail: ''})}>Clear</button>
          <hr />
          <label>
            <span style={{display: 'block', fontWeight: '700'}}>Advertisment for Popup alert</span>
            <textarea rows="6" style={{minWidth: '50%'}} placeholder="Paste the code here"
              name="popup" onChange={handleChange} value={commer.popup}
            />
          </label>
          <button type="button" className="clear__button" 
            onClick={() => setСommer({...commer, popup: ''})}>Clear</button>
          <hr />
          <label>
            <span style={{display: 'block', fontWeight: '700'}}>Advertisment for Bus route page</span>
            <textarea rows="6" style={{minWidth: '50%'}} placeholder="Paste the code here"
              name="bus_route" onChange={handleChange} value={commer.bus_route}
            />
          </label>
          <button type="button" className="clear__button" 
            onClick={() => setСommer({...commer, bus_route: ''})}>Clear</button>
          <hr />
          <label>
            <span style={{display: 'block', fontWeight: '700'}}>Advertisment for Bus route detail page</span>
            <textarea rows="6" style={{minWidth: '50%'}} placeholder="Paste the code here"
              name="bus_route_detail" onChange={handleChange} value={commer.bus_route_detail}
            />
          </label>
          <button type="button" className="clear__button" 
            onClick={() => setСommer({...commer, bus_route_detail: ''})}>Clear</button>
          <hr />
          <button type="submit" style={{marginBottom: '15px', display: 'block'}} className="route-add-edit__submit">Save</button>
        </form>}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  commer: state.advertisments.advertisments,
  loading: state.advertisments.loading
})

export default connect(mapStateToProps)(Advertisments)
