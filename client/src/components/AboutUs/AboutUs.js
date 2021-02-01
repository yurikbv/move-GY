import React from 'react';

const AboutUs = () => {
  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <section className="container">
        <h3 style={{textAlign: 'left'}}>ABOUT US</h3>
        <p style={{fontSize: '18px'}}>Information is important. Real time relevant information is priceless.</p>
        <p style={{fontSize: '18px'}}>moveXYZ.com is an information portal that provides real time transportation information for commuters.</p>
  
        <p style={{fontSize: '18px'}}>moveXYZ.com is managed by ABNA Inc. a Georgetown, Guyana registered company.</p>
  
        <p style={{fontSize: '18px'}}>ABNA INC. Is a new startup that builds technology solution products for everyday use.</p>
  
        <p style={{fontSize: '18px'}}>
          Contact Us <br/>
          <span style={{color: 'blue'}}>MoveXYZinfo@gmail.com</span>
        </p>
        
      </section>
    </div>
  );
};

export default AboutUs;
