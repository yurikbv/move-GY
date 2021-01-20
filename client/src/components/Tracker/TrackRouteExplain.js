import React, {useState, useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import GoBackButton from "../UI/GoBackButton";

const TrackRouteExplain = (props) => {
  
  const [route, setRoute] = useState();
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMoreRoute] = useState(false);
  const [showMoreRevRoute, setShowMoreRevRoute] = useState(false);
  
  useEffect(() => {
    if (props.currentRoute) {
      setRoute(props.currentRoute);
      setLoading(props.loading)
    }
  },[]);
  
  const renderRoute = (features) => (
    <Fragment>
      <h4 style={{display: 'flex', alignItems: 'center'}}>
        <span style={{ color: 'white', backgroundColor: 'red',
          borderRadius: '50%', width: '35px', height: '35px', display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
          {features.number}
        </span>
        <span style={{marginLeft: '5px', fontSize: '18px'}}>{features.name}</span>
      </h4>
      <div><strong>Fare:</strong> up to {features.fare ? features.fare : ''}</div>
      <div><strong>Average travel time:</strong>{features.average_travel_time && features.average_travel_time}</div>
      <div><strong>Rush hour:</strong>{features.rush_hour && features.rush_hour}</div>
      <strong>About this route:</strong>
    </Fragment>
  )
  
  const renderMore = features => (
    <div>
      <strong style={{display: 'block'}}>Image of last stop:</strong>
      <img src={features.image_last_stop ? features.image_last_stop : ''} alt="image_last_stop" style={{width: '30%'}}/>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <strong style={{marginRight: '5px'}}>Name of last stop:</strong>
        <span style={{margin: '5px 0', color: 'green', fontWeight: '700', fontSize: '18px'}}>
          {features.stops[features.stops.length - 1].name_of_stop}
        </span>
      </div>
      <strong style={{display: 'block'}}>Image of first stop:</strong>
      <img src={features.image_first_stop ? features.image_first_stop : ''} alt="image_first_stop" style={{width: '30%'}}/>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <strong style={{marginRight: '5px'}}>Name of first stop:</strong>
        <span style={{margin: '5px 0', color: 'green', fontWeight: '700', fontSize: '18px'}}>{features.stops[0].name_of_stop}</span>
      </div>
      <div><strong>Fares for route:</strong></div>
    </div>
  )
  
  return (
    <div style={{position: 'relative', flexGrow: '1', boxSizing: 'border-box', width: '100%'}}>
      <div className="container">
        <GoBackButton />
        <hr/>
        <h3>BUS ROUTES/LINES EXPLAINED</h3>
        <hr/>
        {(loading || !route) ? <div className="loading"><MoonLoader /></div> :
          <div>
            <section>
              <span style={{fontWeight: '700'}}>Introduction text about route.</span>
              <p>{route.about}</p>
              <hr/>
            </section>
            <section>
              {renderRoute(route)}
              {showMore ? renderMore(route)
                : <span style={{display: 'block',color: 'blue', cursor: 'pointer'}} onClick={() => setShowMoreRoute(true)}>More</span>
              }
            </section>
          </div>
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  currentRoute: state.routes.currentRoute,
  loading: state.routes.loading
})

export default connect(mapStateToProps)(TrackRouteExplain);
