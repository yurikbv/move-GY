import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import {addFaq, updateFaq, getCurrentFaq} from '../../../store/actions/faq_action';
import GoBackButton from '../../UI/GoBackButton';


const FAQ_edit = (props) => {

  const [faq, setFaq] = useState({title: '', text: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.match.params.id !== 'new') {
      props.dispatch(getCurrentFaq(props.match.params.id));
    }
  },[]);

  useEffect(() => {
    if (props.currentFaq._id) {
      setFaq(props.currentFaq);
      setLoading(props.loading);
    } else {
      setLoading(false)
    }
  },[props.currentFaq])

  const handleChange = (e) => setFaq({...faq, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.match.params.id !== 'new') {
      props.dispatch(updateFaq(faq._id, faq))
    } else props.dispatch(addFaq(faq));
  }

  return (
    <div style={{flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="container">
        <GoBackButton />
        <h4>New/Edit FAQ</h4>
        <hr/>
        { loading ? <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader />
        </div> 
        : <form className="route-add-edit__form" onSubmit={handleSubmit}>
        <label>
          <span style={{fontWeight: '700'}}>Title</span>
          <input type="text" name="title" value={faq.title} onChange={handleChange} required 
          style={{minWidth: '50%'}}/>
        </label>
        <hr/>
        <label>
          <span style={{fontWeight: '700'}}>Description</span>
          <textarea rows="6" name="text" value={faq.text} onChange={handleChange} required 
            style={{minWidth: '50%', display: 'block'}}/>
        </label>
        <button type="submit" className="route-add-edit__submit">Save</button>
      </form>}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentFaq: state.faqs.currentFaq,
  loading: state.faqs.loading
})

export default connect(mapStateToProps)(FAQ_edit)
