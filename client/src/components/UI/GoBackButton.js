import React from 'react';
import {withRouter} from 'react-router-dom';
import {ReactComponent as ArrowBackSvg} from '../../assets/img/back-arrow.svg';

function GoBackButton(props) {

  return (
    <div style={{display: 'inline-block'}} onClick={() => props.history.goBack()}>
      <span style={{display: 'flex', alignSelf: 'center', margin: '10px 0 0', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', border: '2px solid black'}}>
        <ArrowBackSvg style={{height: '24px', width: 'auto'}}/>
        <b style={{marginLeft: '10px'}}>Go Back</b>
      </span>
    </div>
  )
}

export default withRouter(GoBackButton);