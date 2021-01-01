import React, {Fragment} from 'react';
import ToggleButton from 'react-toggle-button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const borderRadiusStyle = { borderRadius: 2 };

const VehicleItem = (props) => {
  
  return (
    <Fragment>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span style={{margin: '0 3px'}}>{props.vehicle.type_of_vehicle}</span> /
        <span style={{margin: '0 3px'}}>{props.vehicle.plate}</span> /
        {props.vehicle.has_route
          ? <Link to={`/service/${props.vehicle._id}/${props.vehicle.has_route}`} style={{margin: '0 3px'}}>{props.vehicle.has_route}</Link>
          : <Link to={`/service/${props.vehicle._id}/new`} style={{margin: '0 3px'}}>Add Service</Link>} /
        <span style={{margin: '0 3px'}}> Tracker</span>
        <div style={{marginLeft: '3px'}}>
          <ToggleButton style={{display: 'inline'}}
            value={props.vehicle.isActive}
            thumbStyle={borderRadiusStyle}
            trackStyle={borderRadiusStyle}
            onToggle={(value) => {
              props.handleTracker(props.vehicle, !value)
            }}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default connect()(VehicleItem);
