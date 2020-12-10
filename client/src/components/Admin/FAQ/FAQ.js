import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import { Link } from 'react-router-dom';
import {useHistory} from "react-router";
import NavBar from '../NavBar/NavBar';
import {getFaqs, deleteFaqAction} from '../../../store/actions/faq_action';

const FAQ = (props) => {

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    props.dispatch(getFaqs())
  },[])

  useEffect(() => {
    if (props.faqs) {
      setFaqs(props.faqs);
      setLoading(props.loading);
    } else setLoading(false)
  }, [props.faqs]);

  const deleteFaq = id => {
    props.dispatch(deleteFaqAction(id));
  };

  return (
   <div style={{flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="container">
        <h3>ADMIN</h3>
        <NavBar />
        <Link to="/admin/faq_edit/new" className="add_route--link">Add FAQ</Link>
        <hr style={{marginTop: '15px'}}/>
        {loading ?
        <div style={{position: 'absolute', left: '50%', top: '50%',
          transform:'translate(-50%,-50%)'}}><MoonLoader />
        </div> : 
        <table className="admin__table" style={{marginTop: '20px'}}>
        <thead>
          <tr>
            <th>Title FAQ</th>
            <th colSpan="3">Description FAQ</th>
            <th>Status</th>
          </tr>
        </thead>
      <tbody>
        {faqs.map(faq => (
          <tr key={faq._id}>
            <td>{faq.title}</td>
            <td>{faq.text}</td>
            <td>
              <div className="users__form--btns">
                <button type="button" onClick={() => history.push(`/admin/faq_edit/${faq._id}`)}>
                  Edit
                </button>
                <button type="button" onClick={() => deleteFaq(faq._id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
      }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  faqs: state.faqs.faqs,
  loading: state.faqs.loading
})

export default connect(mapStateToProps)(FAQ)
