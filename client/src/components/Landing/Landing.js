import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';
import example from '../../assets/img/example.jpg';
import { isAuth } from '../../helpers/auth';

export default function Landing() {

  const [reviews, setReviews] = useState([{
    user: 'B. Persuad',
    from: 'Canal # 2, WBD',
    text: 'Definitely genius'
  },{
    user: 'M. Brown ',
    from: 'Georgetown',
    text: 'Free! In GT, we need to support good things'
  },{
    user: 'A. Nagamooto',
    from: 'New Amsterdam',
    text: 'Now I can save myself from standing in the hot sun and the rain.'
  }])

  const [questions, setQuestions] = useState([{
    id: 1,
    title: 'Question 1',
    answer: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi suscipit, incidunt beatae dolor officia numquam doloremque commodi dignissimos a sapiente sit fugiat debitis ea animi, dolorem architecto excepturi. Voluptas, laborum.',
    shown: false
  },{
    id: 2,
    title: 'Question 2',
    answer: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi suscipit, incidunt beatae dolor officia numquam doloremque commodi dignissimos a sapiente sit fugiat debitis ea animi, dolorem architecto excepturi. Voluptas, laborum.',
    shown: false
  }])

  const toggleShownQuestion = id => {
    let newQuestions = questions.map(question => id === question.id ? {...question, shown: !question.shown} : question);
    setQuestions(newQuestions);
  }

  return (
    <div>
      <section className="container">
        <h3>Bus Tracker!</h3>
        <div className="landing__buttons">
          <Link to="/track_bus" style={{backgroundColor: 'rgb(245, 248, 41)', marginRight: '10px'}}>Track Bus</Link>
          {isAuth() && isAuth()._id ? null : <Link to="/register_driver" style={{backgroundColor: 'lightGrey', marginLeft: '10px'}}>Drivers Login/Register Now</Link>}
        </div>
        <h3>WHY A BUS TRACKER?</h3>

        <strong>For Passengers</strong> <br></br>
        Improve ways to travel and reduce frustrating wait time<br></br>
        Receive updates delays notification (coming soon)<br></br>
        Piece of mind, Priceless!<br></br>

        <strong style={{display: 'block', marginTop: '20px'}}>For Bus Drivers/Operators</strong>
        Improve customer experience riding public transportation <br></br>
        Potential to save time and money<br></br>
        Data to improve your business <br></br>

      </section>
      <div style={{backgroundColor: 'black', color: 'white', paddingBottom: '20px'}}>
        <section className="container how-it-works">
          <h3>HOW IT WORKS?</h3>
          <strong style={{display: 'block', textAlign: 'center', marginTop: '-20px 0 15px'}}>3 Easy Steps</strong>
          <span><strong>1.</strong>Drivers/conductors register and link vehicles to a route.</span>
          <span><strong>2.</strong>Drivers turn on the tracker on Website. Note, internet data service is required. No worries. 12 hours use (2 MB) =  1 minute of a facebook video (2 MB)</span>
          <span><strong>3.</strong> Passengers click the 
            <Link to="/track_bus">track bus</Link> 
            link to see where their bus is. 
          </span>
          <div style={{textAlign: 'center'}}>
            <img src={example} alt="example map"/>
          </div>
        </section>
      </div>

      <section className="container" style={{marginBottom: '20px'}}>
        <h3>WHAT ARE PEOPLE SAYING?</h3>
        {reviews.map(review => (
          <div style={{marginBottom: '15px'}} key={review.user}>
            <i style={{display: 'block', fontWeight: '700', fontSize: '20px'}}>"{review.text}"</i>
            <span>-{review.user} - {review.from}</span>
          </div>
        ))}
      </section>

      <div style={{backgroundColor: 'black', color: 'white', paddingBottom: '20px'}}>
          <section className="container">
            <h3>FAQ</h3>
            <div style={{marginTop: '-20px'}}>
              {questions.map(question => (
                <div key={question.id}>    
                  <span style={{cursor: 'pointer', display: 'block'}} onClick={() => toggleShownQuestion(question.id)}>
                    <strong style={{fontSize: '20px'}}>{question.title}</strong>{question.shown ? '-' : '+'}
                  </span>
                  {question.shown && <p>{question.answer}</p>}
                </div>
              ))}
            </div>
          </section>
      </div>
    </div>
  )
}