import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import GoBackButton from '../UI/GoBackButton';

const BusStop = (props) => {
  
  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="container" >
        <GoBackButton />
        {route && <h3>{route.number} {route.name}</h3>}
        <h4 style={{fontSize: '20px', color: 'lightcoral'}}>{stop && stop.name_of_stop}</h4>
        No bus detected at this time.
      </div>
    </div>
  );
};


export default connect(mapStateToProps)(BusStop);
